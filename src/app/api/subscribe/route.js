import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    // In production, this would save to a database or email service
    console.log(`New subscriber: ${email}`);

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to TopFaculty job alerts!'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
