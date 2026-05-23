'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const statCards = [
  ['totalJobs', 'Total Jobs', 'bg-navy-700'],
  ['pendingJobs', 'Pending Jobs', 'bg-accent-500'],
  ['candidates', 'Candidates', 'bg-navy-500'],
  ['colleges', 'Colleges', 'bg-navy-600'],
  ['serviceRequests', 'Service Leads', 'bg-accent-600'],
  ['reviews', 'Reviews', 'bg-navy-800'],
  ['subscribers', 'Subscribers', 'bg-green-600'],
  ['messages', 'Messages', 'bg-slate-700'],
];

export default function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadSummary() {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/summary', { cache: 'no-store' });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Unable to load dashboard.');
      }

      setSummary(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateJob(id, status) {
    try {
      const response = await fetch(`/api/jobs?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Unable to update job.');
      }

      await loadSummary();
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadSummary();
  }, []);

  const jobs = summary?.jobs || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-navy-700 text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-navy-100">SQLite test backend control panel</p>
          </div>
          <Link href="/" className="rounded-lg bg-white/10 px-4 py-2 text-sm transition hover:bg-white/20">
            View Site
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {loading && (
          <div className="rounded-xl bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
            Loading backend data...
          </div>
        )}

        {summary && (
          <>
            <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
              {statCards.map(([key, label, bg]) => (
                <div key={key} className={`${bg} rounded-xl p-4 text-white shadow-md`}>
                  <p className="text-3xl font-black">{summary.stats[key] ?? 0}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide opacity-90">{label}</p>
                </div>
              ))}
            </div>

            <div className="mb-8 flex flex-wrap gap-3">
              <Link href="/admin/jobs/new" className="rounded-lg bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-accent-600">
                + Post New Job
              </Link>
              <Link href="/register/college" className="rounded-lg bg-navy-700 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-navy-800">
                Register College
              </Link>
              <Link href="/register/candidate" className="rounded-lg border border-navy-700 px-5 py-2.5 text-sm font-semibold text-navy-700 transition hover:bg-navy-700 hover:text-white">
                Add Candidate
              </Link>
            </div>

            <section className="mb-8 overflow-hidden rounded-xl bg-white shadow-md">
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Jobs Queue</h2>
                  <p className="text-xs text-gray-500">Pending submissions can be published for the public site.</p>
                </div>
                <button onClick={loadSummary} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-50">
                  Refresh
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-600">
                      <th className="px-6 py-3">ID</th>
                      <th className="px-6 py-3">Title</th>
                      <th className="px-6 py-3">Institution</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Deadline</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {jobs.map((job) => (
                      <tr key={job.id} className="transition hover:bg-gray-50">
                        <td className="px-6 py-3 font-mono text-gray-500">#{job.id}</td>
                        <td className="max-w-xs truncate px-6 py-3 font-medium text-gray-800">
                          {job.title}
                          {job.featured && <span className="ml-2 rounded bg-accent-500 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">Featured</span>}
                        </td>
                        <td className="px-6 py-3 text-gray-600">{job.institution}</td>
                        <td className="px-6 py-3">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${job.status === 'published' ? 'bg-green-100 text-green-700' : job.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-gray-600">{job.deadline}</td>
                        <td className="px-6 py-3">
                          <div className="flex gap-2">
                            {job.status !== 'published' && (
                              <button onClick={() => updateJob(job.id, 'published')} className="font-medium text-green-600 hover:text-green-700">
                                Publish
                              </button>
                            )}
                            {job.status !== 'archived' && (
                              <button onClick={() => updateJob(job.id, 'archived')} className="font-medium text-red-500 hover:text-red-600">
                                Archive
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <SummaryList title="Recent Candidates" rows={summary.recentCandidates} columns={['name', 'email', 'status']} />
              <SummaryList title="Recent Colleges" rows={summary.recentColleges} columns={['college_name', 'email', 'status']} />
              <SummaryList title="Recent Reviews" rows={summary.recentReviews} columns={['institution', 'relation', 'status']} />
              <SummaryList title="Service Requests" rows={summary.recentServiceRequests} columns={['service_type', 'institution', 'status']} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function SummaryList({ title, rows, columns }) {
  return (
    <section className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="border-b border-gray-100 px-5 py-4">
        <h2 className="font-bold text-navy-900">{title}</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {rows.length === 0 ? (
          <p className="px-5 py-5 text-sm text-gray-500">No records yet.</p>
        ) : rows.map((row) => (
          <div key={row.id} className="grid grid-cols-3 gap-3 px-5 py-3 text-sm">
            {columns.map((column) => (
              <span key={column} className="truncate text-gray-700">
                {row[column] || '-'}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
