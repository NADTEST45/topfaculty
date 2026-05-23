import { NextResponse } from 'next/server';
import { createReview, getAdminSummary } from '@/lib/backend';
import { validateReview } from '@/lib/validation';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({ reviews: (await getAdminSummary()).recentReviews });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const validation = validateReview(body);

    if (!validation.ok) {
      return NextResponse.json({ errors: validation.errors }, { status: 400 });
    }

    const review = await createReview(validation.data);

    return NextResponse.json({
      success: true,
      review,
      message: 'Review saved for moderation.',
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
