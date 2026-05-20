import { getJobs, getJob } from '@/lib/data';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const job = getJob(id);
    if (!job) return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    return NextResponse.json(job);
  }

  const filters = {};
  if (searchParams.get('category')) filters.category = searchParams.get('category');
  if (searchParams.get('designation')) filters.designation = searchParams.get('designation');
  if (searchParams.get('state')) filters.state = searchParams.get('state');
  if (searchParams.get('type')) filters.type = searchParams.get('type');
  if (searchParams.get('search')) filters.search = searchParams.get('search');
  if (searchParams.get('featured')) filters.featured = true;

  const jobs = getJobs(filters);
  return NextResponse.json({ jobs, total: jobs.length });
}
