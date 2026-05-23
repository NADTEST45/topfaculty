// HMAC-signed admin session token using Web Crypto (Edge + Node compatible).
//
// Token format: base64url(payloadJSON) + "." + base64url(signature)
// Payload:      { sub: "admin", exp: <unix-ms> }
//
// Verified in middleware on every request to a protected route. The signing
// secret (ADMIN_AUTH_SECRET) must NEVER leave the server. If the secret or
// admin password are unset the auth helpers fail closed and middleware will
// deny all admin access.

export const ADMIN_COOKIE_NAME = 'tf_admin_session';
const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function base64UrlEncode(bytes) {
  let str = '';
  for (let i = 0; i < bytes.length; i += 1) str += String.fromCharCode(bytes[i]);
  return btoa(str).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function base64UrlDecode(str) {
  const pad = str.length % 4 === 0 ? '' : '='.repeat(4 - (str.length % 4));
  const b64 = (str + pad).replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

function utf8Encode(str) {
  return new TextEncoder().encode(str);
}

function utf8Decode(bytes) {
  return new TextDecoder().decode(bytes);
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function getKey(secret) {
  return crypto.subtle.importKey(
    'raw',
    utf8Encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

async function sign(payloadB64, secret) {
  const key = await getKey(secret);
  const sigBuf = await crypto.subtle.sign('HMAC', key, utf8Encode(payloadB64));
  return base64UrlEncode(new Uint8Array(sigBuf));
}

function getSecret() {
  const secret = process.env.ADMIN_AUTH_SECRET;
  if (!secret || secret.length < 32) return null;
  return secret;
}

export function isAdminAuthConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && getSecret());
}

export async function createSessionToken() {
  const secret = getSecret();
  if (!secret) throw new Error('ADMIN_AUTH_SECRET is not configured');

  const payload = { sub: 'admin', exp: Date.now() + TOKEN_TTL_MS };
  const payloadB64 = base64UrlEncode(utf8Encode(JSON.stringify(payload)));
  const sig = await sign(payloadB64, secret);
  return `${payloadB64}.${sig}`;
}

export async function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return false;
  const secret = getSecret();
  if (!secret) return false;

  const dot = token.indexOf('.');
  if (dot < 1) return false;

  const payloadB64 = token.slice(0, dot);
  const sigB64 = token.slice(dot + 1);

  let expected;
  try {
    expected = await sign(payloadB64, secret);
  } catch {
    return false;
  }

  if (!timingSafeEqual(utf8Encode(sigB64), utf8Encode(expected))) return false;

  let payload;
  try {
    payload = JSON.parse(utf8Decode(base64UrlDecode(payloadB64)));
  } catch {
    return false;
  }

  if (payload.sub !== 'admin') return false;
  if (typeof payload.exp !== 'number' || payload.exp < Date.now()) return false;

  return true;
}

export function checkAdminPassword(input) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || typeof input !== 'string') return false;
  // Constant-time compare to defeat timing attacks against the password.
  const a = utf8Encode(input);
  const b = utf8Encode(expected);
  if (a.length !== b.length) {
    // Still spend the work to keep timing similar.
    let diff = 1;
    const max = Math.max(a.length, b.length);
    for (let i = 0; i < max; i += 1) diff |= (a[i] || 0) ^ (b[i] || 0);
    return false;
  }
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a[i] ^ b[i];
  return diff === 0;
}
