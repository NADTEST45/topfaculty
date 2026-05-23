import { getDb, mapJobRow, mapJobRows } from './db';

function nowDate() {
  return new Date().toISOString().slice(0, 10);
}

export function listJobs(filters = {}, options = {}) {
  const where = [];
  const params = {};

  if (!options.includeAllStatuses) {
    where.push('status = @status');
    params.status = filters.status || 'published';
  } else if (filters.status) {
    where.push('status = @status');
    params.status = filters.status;
  }

  ['category', 'designation', 'state', 'type'].forEach((field) => {
    if (filters[field]) {
      where.push(`${field} = @${field}`);
      params[field] = filters[field];
    }
  });

  if (filters.featured) {
    where.push('featured = 1');
  }

  if (filters.search) {
    where.push(`(
      title LIKE @search OR institution LIKE @search OR city LIKE @search OR
      state LIKE @search OR description LIKE @search OR designation LIKE @search
    )`);
    params.search = `%${filters.search}%`;
  }

  const orderBy = options.sort === 'deadline'
    ? 'date(deadline) ASC'
    : options.sort === 'featured'
      ? 'featured DESC, date(posted_date) DESC'
      : 'date(posted_date) DESC, id DESC';

  const sql = `
    SELECT * FROM jobs
    ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
    ORDER BY ${orderBy}
    ${options.limit ? 'LIMIT @limit' : ''}
  `;

  if (options.limit) params.limit = options.limit;

  return mapJobRows(getDb().prepare(sql).all(params));
}

export function getJobById(id, options = {}) {
  const sql = options.includeAllStatuses
    ? 'SELECT * FROM jobs WHERE id = ?'
    : "SELECT * FROM jobs WHERE id = ? AND status = 'published'";

  return mapJobRow(getDb().prepare(sql).get(id));
}

export function createJobSubmission(data) {
  const result = getDb().prepare(`
    INSERT INTO jobs (
      title, institution, city, state, category, designation, type, description,
      qualifications, salary, experience, vacancies, posted_date, deadline, featured,
      status, contact_email, contact_phone, contact_website, source
    )
    VALUES (
      @title, @institution, @city, @state, @category, @designation, @type, @description,
      @qualifications, @salary, @experience, @vacancies, @postedDate, @deadline, @featured,
      'pending', @contactEmail, @contactPhone, @contactWebsite, 'submission'
    )
  `).run({
    ...data,
    postedDate: nowDate(),
    featured: data.featured ? 1 : 0,
  });

  return getJobById(result.lastInsertRowid, { includeAllStatuses: true });
}

export function updateJobStatus(id, status) {
  const allowed = new Set(['pending', 'published', 'archived']);
  if (!allowed.has(status)) return null;

  const result = getDb().prepare(`
    UPDATE jobs
    SET status = @status, updated_at = CURRENT_TIMESTAMP
    WHERE id = @id
  `).run({ id, status });

  if (!result.changes) return null;
  return getJobById(id, { includeAllStatuses: true });
}

export function deleteJob(id) {
  return getDb().prepare('DELETE FROM jobs WHERE id = ?').run(id).changes > 0;
}

export function upsertSubscriber({ email }) {
  getDb().prepare(`
    INSERT INTO subscribers (email)
    VALUES (@email)
    ON CONFLICT(email) DO NOTHING
  `).run({ email });

  return getDb().prepare('SELECT * FROM subscribers WHERE email = ?').get(email);
}

export function createContactMessage(data) {
  const result = getDb().prepare(`
    INSERT INTO contact_messages (name, email, subject, message)
    VALUES (@name, @email, @subject, @message)
  `).run(data);

  return getDb().prepare('SELECT * FROM contact_messages WHERE id = ?').get(result.lastInsertRowid);
}

export function createCandidateProfile(data) {
  const result = getDb().prepare(`
    INSERT INTO candidate_profiles (
      name, email, phone, preferred_location, education, experience, research_area,
      certifications, scopus_id, google_scholar_id, social_links, visibility
    )
    VALUES (
      @name, @email, @phone, @preferredLocation, @education, @experience, @researchArea,
      @certifications, @scopusId, @googleScholarId, @socialLinks, @visibility
    )
    ON CONFLICT(email) DO UPDATE SET
      phone = excluded.phone,
      preferred_location = excluded.preferred_location,
      education = excluded.education,
      experience = excluded.experience,
      research_area = excluded.research_area,
      certifications = excluded.certifications,
      scopus_id = excluded.scopus_id,
      google_scholar_id = excluded.google_scholar_id,
      social_links = excluded.social_links,
      visibility = excluded.visibility,
      updated_at = CURRENT_TIMESTAMP
  `).run(data);

  const id = result.lastInsertRowid || getDb().prepare('SELECT id FROM candidate_profiles WHERE email = ?').get(data.email).id;
  return getDb().prepare('SELECT * FROM candidate_profiles WHERE id = ?').get(id);
}

export function createCollegeProfile(data) {
  const result = getDb().prepare(`
    INSERT INTO college_profiles (
      college_name, email, website, authorized_person, mobile, established, affiliation,
      accreditation, state, address, courses, departments, strength, placements,
      average_package, hiring_category
    )
    VALUES (
      @collegeName, @email, @website, @authorizedPerson, @mobile, @established, @affiliation,
      @accreditation, @state, @address, @courses, @departments, @strength, @placements,
      @package, @hiringCategory
    )
    ON CONFLICT(email) DO UPDATE SET
      website = excluded.website,
      authorized_person = excluded.authorized_person,
      mobile = excluded.mobile,
      established = excluded.established,
      affiliation = excluded.affiliation,
      accreditation = excluded.accreditation,
      state = excluded.state,
      address = excluded.address,
      courses = excluded.courses,
      departments = excluded.departments,
      strength = excluded.strength,
      placements = excluded.placements,
      average_package = excluded.average_package,
      hiring_category = excluded.hiring_category,
      updated_at = CURRENT_TIMESTAMP
  `).run(data);

  const id = result.lastInsertRowid || getDb().prepare('SELECT id FROM college_profiles WHERE email = ?').get(data.email).id;
  return getDb().prepare('SELECT * FROM college_profiles WHERE id = ?').get(id);
}

export function createReview(data) {
  const result = getDb().prepare(`
    INSERT INTO reviews (
      institution, relation, teaching_quality, salary_range, working_environment,
      benefits, placements, career_growth, overall_rating, anonymous, pros, cons
    )
    VALUES (
      @institution, @relation, @teachingQuality, @salaryRange, @workingEnvironment,
      @benefits, @placements, @careerGrowth, @overallRating, @anonymous, @pros, @cons
    )
  `).run({
    ...data,
    anonymous: data.anonymous ? 1 : 0,
  });

  return getDb().prepare('SELECT * FROM reviews WHERE id = ?').get(result.lastInsertRowid);
}

export function createServiceRequest(data) {
  const result = getDb().prepare(`
    INSERT INTO service_requests (service_type, institution, contact, email, mobile, requirement, assets)
    VALUES (@serviceType, @institution, @contact, @email, @mobile, @requirement, @assets)
  `).run(data);

  return getDb().prepare('SELECT * FROM service_requests WHERE id = ?').get(result.lastInsertRowid);
}

export function getAdminSummary() {
  const database = getDb();
  const scalar = (sql, params = {}) => database.prepare(sql).get(params).count;

  return {
    stats: {
      totalJobs: scalar('SELECT COUNT(*) AS count FROM jobs'),
      publishedJobs: scalar("SELECT COUNT(*) AS count FROM jobs WHERE status = 'published'"),
      pendingJobs: scalar("SELECT COUNT(*) AS count FROM jobs WHERE status = 'pending'"),
      candidates: scalar('SELECT COUNT(*) AS count FROM candidate_profiles'),
      colleges: scalar('SELECT COUNT(*) AS count FROM college_profiles'),
      reviews: scalar('SELECT COUNT(*) AS count FROM reviews'),
      serviceRequests: scalar('SELECT COUNT(*) AS count FROM service_requests'),
      subscribers: scalar('SELECT COUNT(*) AS count FROM subscribers'),
      messages: scalar('SELECT COUNT(*) AS count FROM contact_messages'),
    },
    jobs: listJobs({}, { includeAllStatuses: true, limit: 25 }),
    recentCandidates: database.prepare('SELECT id, name, email, phone, preferred_location, status, created_at FROM candidate_profiles ORDER BY id DESC LIMIT 8').all(),
    recentColleges: database.prepare('SELECT id, college_name, email, authorized_person, state, status, created_at FROM college_profiles ORDER BY id DESC LIMIT 8').all(),
    recentReviews: database.prepare('SELECT id, institution, relation, overall_rating, status, created_at FROM reviews ORDER BY id DESC LIMIT 8').all(),
    recentServiceRequests: database.prepare('SELECT id, service_type, institution, contact, status, created_at FROM service_requests ORDER BY id DESC LIMIT 8').all(),
  };
}
