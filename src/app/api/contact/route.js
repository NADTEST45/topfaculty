import { NextResponse } from 'next/server';
import { validateContactMessage } from '@/lib/validation';
import { createContactMessage } from '@/lib/backend';
import { notifyContactMessage } from '@/lib/email';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const body = await request.json();
    const validation = validateContactMessage(body);

    if (!validation.ok) {
      return NextResponse.json({ errors: validation.errors }, { status: 400 });
    }

    const message = await createContactMessage(validation.data);
    await notifyContactMessage(validation.data);

    return NextResponse.json({
      success: true,
      messageId: message.id,
      message: 'Thanks for reaching out. We will respond within 1-2 business days.',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
