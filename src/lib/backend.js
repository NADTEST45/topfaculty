import * as local from './repositories';
import * as supabase from './supabaseRepository';

function source() {
  return supabase.isSupabaseConfigured() ? supabase : local;
}

export function getBackendName() {
  return supabase.isSupabaseConfigured() ? 'supabase' : 'sqlite';
}

export async function listJobs(filters = {}, options = {}) {
  return source().listJobs(filters, options);
}

export async function getJobById(id, options = {}) {
  return source().getJobById(id, options);
}

export async function createJobSubmission(data) {
  return source().createJobSubmission(data);
}

export async function updateJobStatus(id, status) {
  return source().updateJobStatus(id, status);
}

export async function deleteJob(id) {
  return source().deleteJob(id);
}

export async function upsertSubscriber(data) {
  return source().upsertSubscriber(data);
}

export async function createContactMessage(data) {
  return source().createContactMessage(data);
}

export async function createCandidateProfile(data) {
  return source().createCandidateProfile(data);
}

export async function createCollegeProfile(data) {
  return source().createCollegeProfile(data);
}

export async function createReview(data) {
  return source().createReview(data);
}

export async function createServiceRequest(data) {
  return source().createServiceRequest(data);
}

export async function getAdminSummary() {
  const summary = await source().getAdminSummary();
  return {
    ...summary,
    backend: getBackendName(),
  };
}
