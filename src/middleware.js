import { NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, verifySessionToken } from '@/lib/adminAuth';

// ---------------------------------------------------------------------------
// Edge middleware: admin auth + CSRF (origin check) + per-IP rate limiting.
// Runs on every request matching `config.matcher` below.
// ---------------------------------------------------------------------------

const MUTATING_METHODS = new Set(['POST', 'PATCH', 'PUT', 'DELETE']);

// Routes that REQUIRE an admin session. Public POSTs (contact, subscribe,
// candidate/college signups, reviews, services, job submissions) are NOT in
// this set on purpose.
function isAdminRoute(pathname, method) {
  if (pathname === '/admin/login') return false;
  if (pathname === '/api/auth/login' || pathname === '/api/auth/logout') return false;
  if (pathname.startsWith('/admin')) return true;
  if (pathname.startsWith('/api/admin')) return true;
  // Mutating job ops are admin-only (PATCH publish/archive, DELETE).
  if (pathname.startsWith('/api/jobs') && (method === 'PATCH' || method === 'DELETE')) return true;
  return false;
}

// ---------------------------------------------------------------------------
// In-memory token-bucket rate limiter, keyed by IP + bucket.
// Caveat: this lives in the per-instance JS heap. On Vercel, different
// regions/instances each have their own bucket, so a determined attacker
// hitting multiple regions gets multiplied budget. Good enough to deter
// drive-by spam; upgrade to Upstash/Vercel KV if abuse becomes real.
// ---------------------------------------------------------------------------

const RATE_BUCKETS = new Map();

function consumeRateBudget(key, limit, windowMs) {
  const now = Date.now();
  const entry = RATE_BUCKETS.get(key);
  if (!entry || now - entry.start > windowMs) {
    RATE_BUCKETS.set(key, { count: 1, start: now });
    return { ok: true, remaining: limit - 1, resetMs: windowMs };
  }
  entry.count += 1;
  if (entry.count > limit) {
    return { ok: false, remaining: 0, resetMs: Math.max(0, windowMs - (now - entry.start)) };
  }
  return { ok: true, remaining: Math.max(0, limit - entry.count), resetMs: Math.max(0, windowMs - (now - entry.start)) };
}

// Periodic GC so the Map can't grow without bound on a hot instance.
function gcRateBuckets() {
  if (RATE_BUCKETS.size < 5000) return;
  const cutoff = Date.now() - 1000 * 60 * 60;
  for (const [key, entry] of RATE_BUCKETS) {
    if (entry.start < cutoff) RATE_BUCKETS.delete(key);
  }
}

function getClientIp(request) {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return request.ip || 'unknown';
}

function ratePolicyFor(pathname, method) {
  if (method !== 'POST') return null;

  // Login: protect against credential stuffing — strict.
  if (pathname === '/api/auth/login') return { limit: 5, windowMs: 60_000, bucket: 'login' };

  // Public submission endpoints — generous but not unlimited.
  if (
    pathname === '/api/contact' ||
    pathname === '/api/subscribe' ||
    pathname === '/api/reviews' ||
    pathname === '/api/services' ||
    pathname === '/api/candidates' ||
    pathname === '/api/colleges' ||
    pathname === '/api/jobs'
  ) {
    return { limit: 10, windowMs: 60_000, bucket: 'submit' };
  }

  return null;
}

// ---------------------------------------------------------------------------
// CSRF: require the Origin header on mutating requests to match the request
// host. Browsers attach Origin automatically for fetch/form POSTs; a CSRF
// attacker on another origin cannot forge it.
// ---------------------------------------------------------------------------

function isSameOrigin(request) {
  const method = request.method;
  if (!MUTATING_METHODS.has(method)) return true;

  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (!origin || !host) {
    // No Origin on a mutating request from a browser is suspicious. Allow
    // only if it's a same-site referer (covers some old browsers / API tools
    // would already be blocked elsewhere).
    const referer = request.headers.get('referer');
    if (!referer) return false;
    try {
      const refUrl = new URL(referer);
      return refUrl.host === host;
    } catch {
      return false;
    }
  }
  try {
    const originUrl = new URL(origin);
    return originUrl.host === host;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // --- CSRF origin check on every mutating request ---
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: 'Cross-origin request blocked.' }, { status: 403 });
  }

  // --- Rate limiting on selected POST endpoints ---
  gcRateBuckets();
  const policy = ratePolicyFor(pathname, method);
  if (policy) {
    const ip = getClientIp(request);
    const result = consumeRateBudget(`${policy.bucket}:${ip}`, policy.limit, policy.windowMs);
    if (!result.ok) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment and try again.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil(result.resetMs / 1000)),
            'X-RateLimit-Limit': String(policy.limit),
            'X-RateLimit-Remaining': '0',
          },
        },
      );
    }
  }

  // --- Admin auth on protected routes ---
  if (isAdminRoute(pathname, method)) {
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const ok = await verifySessionToken(token);
    if (!ok) {
      // For browser navigation, redirect to the login page with a return URL.
      // For API requests, return a clean 401.
      const accept = request.headers.get('accept') || '';
      if (accept.includes('text/html')) {
        const url = request.nextUrl.clone();
        url.pathname = '/admin/login';
        url.search = `?next=${encodeURIComponent(pathname + request.nextUrl.search)}`;
        return NextResponse.redirect(url);
      }
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  // Run on everything except Next internals and static assets.
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|txt|xml)$).*)'],
};
