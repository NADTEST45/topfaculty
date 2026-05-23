import { NextResponse } from 'next/server';
import { validateSubscriber } from '@/lib/validation';
import { upsertSubscriber } from '@/lib/backend';
import { welcomeSubscriber } from '@/lib/email';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const body = await request.json();
    const validation = validateSubscriber(body);

    if (!validation.ok) {
      return NextResponse.json({ error: validation.errors.email }, { status: 400 });
    }

    const subscriber = await upsertSubscriber(validation.data);
    await welcomeSubscriber(validation.data.email);

    return NextResponse.json({
      success: true,
      subscriber,
      message: 'Successfully subscribed to TopFaculty job alerts!',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
