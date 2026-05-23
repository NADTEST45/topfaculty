import { NextResponse } from 'next/server';
import { createServiceRequest, getAdminSummary } from '@/lib/backend';
import { validateServiceRequest } from '@/lib/validation';
import { notifyServiceRequest } from '@/lib/email';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({ serviceRequests: (await getAdminSummary()).recentServiceRequests });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const validation = validateServiceRequest(body);

    if (!validation.ok) {
      return NextResponse.json({ errors: validation.errors }, { status: 400 });
    }

    const serviceRequest = await createServiceRequest(validation.data);
    await notifyServiceRequest(validation.data);

    return NextResponse.json({
      success: true,
      serviceRequest,
      message: 'Service request saved. The admin team can follow up from the dashboard.',
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
