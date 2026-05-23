const table = {
  jobs: 'topfaculty_jobs',
  fdpEvents: 'topfaculty_fdp_events',
  subscribers: 'topfaculty_subscribers',
  contactMessages: 'topfaculty_contact_messages',
  candidateProfiles: 'topfaculty_candidate_profiles',
  collegeProfiles: 'topfaculty_college_profiles',
  reviews: 'topfaculty_reviews',
  serviceRequests: 'topfaculty_service_requests',
};

function getConfig() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return null;
  }

  return {
    url: url.replace(/\/$/, ''),
    key,
  };
}

export function isSupabaseConfigured() {
  return process.env.TOPFACULTY_BACKEND === 'supabase' && Boolean(getConfig());
}

async function request(path, options = {}) {
  const config = getConfig();

  if (!config) {
    throw new Error('Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
  }

  const response = await fetch(`${config.url}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    cache: 'no-store',
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(data?.message || data?.hint || 'Supabase request failed.');
  }

  return data;
}

function jobToRow(job) {
  return {
    title: job.title,
    institution: job.institution,
    city: job.city,
    state: job.state,
    category: job.category,
    designation: job.designation,
    type: job.type,
    description: job.description,
    qualifications: job.qualifications,
    salary: job.salary,
    experience: job.experience,
    vacancies: job.vacancies,
    posted_date: job.postedDate,
    deadline: job.deadline,
    featured: Boolean(job.featured),
    status: job.status || 'pending',
    contact_email: job.contactEmail || job.contact?.email,
    contact_phone: job.contactPhone || job.contact?.phone,
    contact_website: job.contactWebsite || job.contact?.website,
    source: job.source || 'submission',
  };
}

function rowToJob(row) {
  if (!row) return null;

  return {
    id: row.id,
    title: row.title,
    institution: row.institution,
    city: row.city,
    state: row.state,
    category: row.category,
    designation: row.designation,
    type: row.type,
    description: row.description,
    qualifications: row.qualifications,
    salary: row.salary,
    experience: row.experience,
    vacancies: row.vacancies,
    postedDate: row.posted_date,
    deadline: row.deadline,
    featured: Boolean(row.featured),
    status: row.status,
    contact: {
      email: row.contact_email,
      phone: row.contact_phone,
      website: row.contact_website,
    },
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function eqFilter(name, value) {
  return value ? `${name}=eq.${encodeURIComponent(value)}` : '';
}

function buildJobQuery(filters = {}, options = {}) {
  const query = new URLSearchParams();
  query.set('select', '*');

  if (!options.includeAllStatuses) {
    query.set('status', `eq.${filters.status || 'published'}`);
  } else if (filters.status) {
    query.set('status', `eq.${filters.status}`);
  }

  [
    ['category', filters.category],
    ['designation', filters.designation],
    ['state', filters.state],
    ['type', filters.type],
  ].forEach(([name, value]) => {
    if (value) query.set(name, `eq.${value}`);
  });

  if (filters.featured) {
    query.set('featured', 'eq.true');
  }

  if (filters.search) {
    const q = String(filters.search).replace(/[(),]/g, ' ');
    query.set('or', `(title.ilike.*${q}*,institution.ilike.*${q}*,city.ilike.*${q}*,state.ilike.*${q}*,description.ilike.*${q}*,designation.ilike.*${q}*)`);
  }

  if (options.sort === 'deadline') {
    query.set('order', 'deadline.asc');
  } else if (options.sort === 'featured') {
    query.set('order', 'featured.desc,posted_date.desc');
  } else {
    query.set('order', 'posted_date.desc,id.desc');
  }

  if (options.limit) {
    query.set('limit', String(options.limit));
  }

  return query.toString();
}

export async function listJobs(filters = {}, options = {}) {
  const rows = await request(`${table.jobs}?${buildJobQuery(filters, options)}`);
  return rows.map(rowToJob);
}

export async function getJobById(id, options = {}) {
  const filters = new URLSearchParams();
  filters.set('select', '*');
  filters.set('id', `eq.${id}`);
  if (!options.includeAllStatuses) filters.set('status', 'eq.published');
  filters.set('limit', '1');

  const rows = await request(`${table.jobs}?${filters.toString()}`);
  return rowToJob(rows[0]);
}

export async function createJobSubmission(data) {
  const rows = await request(table.jobs, {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify({
      ...jobToRow(data),
      posted_date: new Date().toISOString().slice(0, 10),
      status: 'pending',
      source: 'submission',
    }),
  });

  return rowToJob(rows[0]);
}

export async function updateJobStatus(id, status) {
  if (!['pending', 'published', 'archived'].includes(status)) return null;

  const rows = await request(`${table.jobs}?id=eq.${id}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify({ status, updated_at: new Date().toISOString() }),
  });

  return rowToJob(rows[0]);
}

export async function deleteJob(id) {
  await request(`${table.jobs}?id=eq.${id}`, { method: 'DELETE' });
  return true;
}

export async function upsertSubscriber(data) {
  const rows = await request(`${table.subscribers}?on_conflict=email`, {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
    body: JSON.stringify(data),
  });

  return rows[0];
}

export async function createContactMessage(data) {
  const rows = await request(table.contactMessages, {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(data),
  });

  return rows[0];
}

export async function createCandidateProfile(data) {
  const rows = await request(`${table.candidateProfiles}?on_conflict=email`, {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone,
      preferred_location: data.preferredLocation,
      education: data.education,
      experience: data.experience,
      research_area: data.researchArea,
      certifications: data.certifications,
      scopus_id: data.scopusId,
      google_scholar_id: data.googleScholarId,
      social_links: data.socialLinks,
      visibility: data.visibility,
    }),
  });

  return rows[0];
}

export async function createCollegeProfile(data) {
  const rows = await request(`${table.collegeProfiles}?on_conflict=email`, {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
    body: JSON.stringify({
      college_name: data.collegeName,
      email: data.email,
      website: data.website,
      authorized_person: data.authorizedPerson,
      mobile: data.mobile,
      established: data.established,
      affiliation: data.affiliation,
      accreditation: data.accreditation,
      state: data.state,
      address: data.address,
      courses: data.courses,
      departments: data.departments,
      strength: data.strength,
      placements: data.placements,
      average_package: data.package,
      hiring_category: data.hiringCategory,
    }),
  });

  return rows[0];
}

export async function createReview(data) {
  const rows = await request(table.reviews, {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify({
      institution: data.institution,
      relation: data.relation,
      teaching_quality: data.teachingQuality,
      salary_range: data.salaryRange,
      working_environment: data.workingEnvironment,
      benefits: data.benefits,
      placements: data.placements,
      career_growth: data.careerGrowth,
      overall_rating: data.overallRating,
      anonymous: data.anonymous,
      pros: data.pros,
      cons: data.cons,
    }),
  });

  return rows[0];
}

export async function createServiceRequest(data) {
  const rows = await request(table.serviceRequests, {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify({
      service_type: data.serviceType,
      institution: data.institution,
      contact: data.contact,
      email: data.email,
      mobile: data.mobile,
      requirement: data.requirement,
      assets: data.assets,
    }),
  });

  return rows[0];
}

async function countRows(tableName, filters = '') {
  const rows = await request(`${tableName}?select=id${filters}`);
  return rows.length;
}

export async function getAdminSummary() {
  const [
    jobs,
    recentCandidates,
    recentColleges,
    recentReviews,
    recentServiceRequests,
    totalJobs,
    publishedJobs,
    pendingJobs,
    candidates,
    colleges,
    reviews,
    serviceRequests,
    subscribers,
    messages,
  ] = await Promise.all([
    listJobs({}, { includeAllStatuses: true, limit: 25 }),
    request(`${table.candidateProfiles}?select=id,name,email,phone,preferred_location,status,created_at&order=id.desc&limit=8`),
    request(`${table.collegeProfiles}?select=id,college_name,email,authorized_person,state,status,created_at&order=id.desc&limit=8`),
    request(`${table.reviews}?select=id,institution,relation,overall_rating,status,created_at&order=id.desc&limit=8`),
    request(`${table.serviceRequests}?select=id,service_type,institution,contact,status,created_at&order=id.desc&limit=8`),
    countRows(table.jobs),
    countRows(table.jobs, '&status=eq.published'),
    countRows(table.jobs, '&status=eq.pending'),
    countRows(table.candidateProfiles),
    countRows(table.collegeProfiles),
    countRows(table.reviews),
    countRows(table.serviceRequests),
    countRows(table.subscribers),
    countRows(table.contactMessages),
  ]);

  return {
    stats: { totalJobs, publishedJobs, pendingJobs, candidates, colleges, reviews, serviceRequests, subscribers, messages },
    jobs,
    recentCandidates,
    recentColleges,
    recentReviews,
    recentServiceRequests,
  };
}
