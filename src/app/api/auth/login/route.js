import { NextResponse } from 'next/server';
import {
  ADMIN_COOKIE_NAME,
  checkAdminPassword,
  createSessionToken,
  isAdminAuthConfigured,
} from '@/lib/adminAuth';

export const runtime = 'nodejs';

export async function POST(request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { error: 'Admin auth is not configured on the server.' },
      { status: 503 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Slow the bruteforce path a touch; constant ~250ms cost per attempt.
  await new Promise((r) => setTimeout(r, 250));

  if (!checkAdminPassword(body?.password)) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  const token = await createSessionToken();
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return response;
}
