import { NextResponse } from 'next/server';
import { validateJobSubmission } from '@/lib/validation';
import { createJobSubmission, deleteJob, getJobById, listJobs, updateJobStatus } from '@/lib/backend';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const job = await getJobById(id, { includeAllStatuses: searchParams.get('include') === 'all' });
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
  if (searchParams.get('status')) filters.status = searchParams.get('status');

  const jobs = await listJobs(filters, {
    includeAllStatuses: searchParams.get('include') === 'all',
    sort: searchParams.get('sort') || 'newest',
  });
  return NextResponse.json({ jobs, total: jobs.length });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const validation = validateJobSubmission(body);

    if (!validation.ok) {
      return NextResponse.json({ errors: validation.errors }, { status: 400 });
    }

    const job = await createJobSubmission(validation.data);

    return NextResponse.json({
      success: true,
      message: 'Job submitted for review. Our team will verify and publish it shortly.',
      job,
    }, { status: 202 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function PATCH(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Job id is required' }, { status: 400 });
    }

    const job = await updateJobStatus(id, body.status);

    if (!job) {
      return NextResponse.json({ error: 'Unable to update job' }, { status: 400 });
    }

    return NextResponse.json({ success: true, job });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Job id is required' }, { status: 400 });
  }

  if (!(await deleteJob(id))) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
