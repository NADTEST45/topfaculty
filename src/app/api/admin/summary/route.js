import { NextResponse } from 'next/server';
import { getAdminSummary } from '@/lib/backend';

export async function GET() {
  return NextResponse.json(await getAdminSummary());
}
