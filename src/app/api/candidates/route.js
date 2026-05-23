import { NextResponse } from 'next/server';
import { createCandidateProfile, getAdminSummary } from '@/lib/backend';
import { validateCandidateProfile } from '@/lib/validation';
import { notifyCandidateSignup } from '@/lib/email';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({ candidates: (await getAdminSummary()).recentCandidates });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const validation = validateCandidateProfile(body);

    if (!validation.ok) {
      return NextResponse.json({ errors: validation.errors }, { status: 400 });
    }

    const candidate = await createCandidateProfile(validation.data);
    await notifyCandidateSignup(candidate);

    return NextResponse.json({
      success: true,
      candidate,
      message: 'Candidate profile saved. OTP verification can be added in the next phase.',
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
