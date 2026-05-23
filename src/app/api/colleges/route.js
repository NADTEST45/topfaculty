import { NextResponse } from 'next/server';
import { createCollegeProfile, getAdminSummary } from '@/lib/backend';
import { validateCollegeProfile } from '@/lib/validation';
import { notifyCollegeSignup } from '@/lib/email';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({ colleges: (await getAdminSummary()).recentColleges });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const validation = validateCollegeProfile(body);

    if (!validation.ok) {
      return NextResponse.json({ errors: validation.errors }, { status: 400 });
    }

    const college = await createCollegeProfile(validation.data);
    await notifyCollegeSignup(college);

    return NextResponse.json({
      success: true,
      college,
      message: 'Institution profile saved. Verification can be added in the next phase.',
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
