import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { getFdpEvents, getJobs } from './data';

// Guardrail: SQLite on Vercel is ephemeral (/tmp is per-instance and gets
// wiped on every cold start). If we ever fall back to SQLite in production
// it silently loses every submission, so fail loudly instead.
if (process.env.VERCEL && process.env.TOPFACULTY_BACKEND !== 'supabase') {
  throw new Error(
    'TopFaculty refuses to boot on Vercel without Supabase. ' +
      'Set TOPFACULTY_BACKEND=supabase, SUPABASE_URL, and ' +
      'SUPABASE_SERVICE_ROLE_KEY in the Vercel project settings.',
  );
}

const dataDir = path.join(process.cwd(), 'data');
const dbPath = process.env.TOPFACULTY_DB_PATH || path.join(dataDir, 'topfaculty.sqlite');

let db;

function toBoolean(value) {
  return value ? 1 : 0;
}

function fromJobRow(row) {
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

function createSchema(database) {
  database.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      institution TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      category TEXT NOT NULL,
      designation TEXT NOT NULL,
      type TEXT NOT NULL DEFAULT 'regular',
      description TEXT NOT NULL,
      qualifications TEXT NOT NULL,
      salary TEXT,
      experience TEXT,
      vacancies INTEGER NOT NULL DEFAULT 1,
      posted_date TEXT NOT NULL,
      deadline TEXT NOT NULL,
      featured INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'pending',
      contact_email TEXT NOT NULL,
      contact_phone TEXT,
      contact_website TEXT,
      source TEXT NOT NULL DEFAULT 'submission',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
    CREATE INDEX IF NOT EXISTS idx_jobs_filters ON jobs(category, designation, state, type);

    CREATE TABLE IF NOT EXISTS fdp_events (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      organizer TEXT NOT NULL,
      date TEXT NOT NULL,
      type TEXT NOT NULL,
      mode TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'published',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS candidate_profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT NOT NULL,
      preferred_location TEXT,
      education TEXT,
      experience TEXT,
      research_area TEXT,
      certifications TEXT,
      scopus_id TEXT,
      google_scholar_id TEXT,
      social_links TEXT,
      visibility TEXT NOT NULL DEFAULT 'standard',
      status TEXT NOT NULL DEFAULT 'pending_verification',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS college_profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      college_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      website TEXT,
      authorized_person TEXT NOT NULL,
      mobile TEXT NOT NULL,
      established TEXT,
      affiliation TEXT,
      accreditation TEXT,
      state TEXT,
      address TEXT,
      courses TEXT,
      departments TEXT,
      strength TEXT,
      placements TEXT,
      average_package TEXT,
      hiring_category TEXT,
      status TEXT NOT NULL DEFAULT 'pending_verification',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      institution TEXT NOT NULL,
      relation TEXT NOT NULL,
      teaching_quality INTEGER NOT NULL,
      salary_range INTEGER NOT NULL,
      working_environment INTEGER NOT NULL,
      benefits INTEGER NOT NULL,
      placements INTEGER NOT NULL,
      career_growth INTEGER NOT NULL,
      overall_rating INTEGER NOT NULL,
      anonymous INTEGER NOT NULL DEFAULT 1,
      pros TEXT,
      cons TEXT,
      status TEXT NOT NULL DEFAULT 'pending_moderation',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS service_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      service_type TEXT NOT NULL,
      institution TEXT NOT NULL,
      contact TEXT NOT NULL,
      email TEXT NOT NULL,
      mobile TEXT NOT NULL,
      requirement TEXT NOT NULL,
      assets TEXT,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

function seed(database) {
  const seededJobs = database.prepare('SELECT COUNT(*) AS count FROM jobs WHERE source = ?').get('seed').count;

  if (seededJobs === 0) {
    const insertJob = database.prepare(`
      INSERT INTO jobs (
        id, title, institution, city, state, category, designation, type, description,
        qualifications, salary, experience, vacancies, posted_date, deadline, featured,
        status, contact_email, contact_phone, contact_website, source
      )
      VALUES (
        @id, @title, @institution, @city, @state, @category, @designation, @type, @description,
        @qualifications, @salary, @experience, @vacancies, @postedDate, @deadline, @featured,
        'published', @contactEmail, @contactPhone, @contactWebsite, 'seed'
      )
    `);

    const insertMany = database.transaction((jobs) => {
      jobs.forEach((job) => {
        insertJob.run({
          ...job,
          featured: toBoolean(job.featured),
          contactEmail: job.contact.email,
          contactPhone: job.contact.phone,
          contactWebsite: job.contact.website,
        });
      });
    });

    insertMany(getJobs());
  }

  const seededEvents = database.prepare('SELECT COUNT(*) AS count FROM fdp_events').get().count;

  if (seededEvents === 0) {
    const insertEvent = database.prepare(`
      INSERT INTO fdp_events (id, title, organizer, date, type, mode)
      VALUES (@id, @title, @organizer, @date, @type, @mode)
    `);

    const insertMany = database.transaction((events) => {
      events.forEach((event) => insertEvent.run(event));
    });

    insertMany(getFdpEvents());
  }
}

export function getDb() {
  if (!db) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    db = new Database(dbPath);
    createSchema(db);
    seed(db);
  }

  return db;
}

export function mapJobRow(row) {
  return fromJobRow(row);
}

export function mapJobRows(rows) {
  return rows.map(fromJobRow);
}
