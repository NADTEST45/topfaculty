import { NextResponse } from 'next/server';
import { getAdminSummary } from '@/lib/backend';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json(await getAdminSummary());
}
