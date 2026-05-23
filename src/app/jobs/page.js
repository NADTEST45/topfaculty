'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import JobCard from '@/components/JobCard';
import Sidebar from '@/components/Sidebar';
import { getCategories, getDesignations, getStates } from '@/lib/data';
import { getJobFilterSummary } from '@/lib/jobUtils';

export default function JobsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-12 text-center text-gray-500">Loading jobs...</div>}>
      <JobsContent />
    </Suspense>
  );
}

function JobsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get('category') || '';
  const designation = searchParams.get('designation') || '';
  const state = searchParams.get('state') || '';
  const type = searchParams.get('type') || '';
  const q = searchParams.get('q') || '';
  const sort = searchParams.get('sort') || 'newest';

  const filters = {};
  if (category) filters.category = category;
  if (designation) filters.designation = designation;
  if (state) filters.state = state;
  if (type) filters.type = type;
  if (q) filters.search = q;

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const categories = getCategories();
  const designations = getDesignations();
  const states = getStates();

  const hasFilters = category || designation || state || type || q || sort !== 'newest';

  function handleFilterChange(key, value) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(params.toString() ? `/jobs?${params.toString()}` : '/jobs');
  }

  function clearFilters() {
    router.push('/jobs');
  }

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (designation) params.set('designation', designation);
    if (state) params.set('state', state);
    if (type) params.set('type', type);
    if (q) params.set('search', q);
    if (sort) params.set('sort', sort);

    async function loadJobs() {
      setLoading(true);
      setLoadError('');

      try {
        const response = await fetch(`/api/jobs?${params.toString()}`, {
          signal: controller.signal,
          cache: 'no-store',
        });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Unable to load jobs.');
        }

        setJobs(result.jobs);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setLoadError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadJobs();

    return () => controller.abort();
  }, [category, designation, state, type, q, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-navy-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-navy-800 font-medium">Jobs</span>
      </nav>

      {/* Page Title */}
      <div className="mb-6 rounded-3xl bg-gradient-to-r from-navy-900 to-navy-700 p-6 text-white">
        <h1 className="text-3xl font-black">All Faculty Jobs</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-navy-100">
          Browse verified teaching, research, leadership, and walk-in opportunities across India.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Keyword</label>
            <input
              value={q}
              onChange={(e) => handleFilterChange('q', e.target.value)}
              placeholder="Title, institution, city..."
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
            />
          </div>
          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name} ({c.count})
                </option>
              ))}
            </select>
          </div>

          {/* Designation */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Designation</label>
            <select
              value={designation}
              onChange={(e) => handleFilterChange('designation', e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
            >
              <option value="">All Designations</option>
              {designations.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* State */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">State</label>
            <select
              value={state}
              onChange={(e) => handleFilterChange('state', e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
            >
              <option value="">All States</option>
              {states.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Type</label>
            <select
              value={type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="walk-in">Walk-in</option>
              <option value="regular">Regular</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Sort</label>
            <select
              value={sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
            >
              <option value="newest">Newest first</option>
              <option value="deadline">Deadline soon</option>
              <option value="featured">Featured first</option>
            </select>
          </div>
        </div>
        {hasFilters && (
          <div className="mt-4 flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2">
            <p className="text-xs font-medium text-gray-500">Filtered by {getJobFilterSummary(filters)}</p>
            <button
              onClick={clearFilters}
              className="text-sm font-bold text-red-500 hover:text-red-700"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Job Listings */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-navy-800">{jobs.length}</span> job{jobs.length !== 1 ? 's' : ''}
              {hasFilters && (
                <span className="text-gray-400"> (filtered)</span>
              )}
            </p>
          </div>

          {loadError && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {loadError}
            </div>
          )}

          {loading ? (
            <div className="rounded-lg bg-white p-12 text-center text-sm text-gray-500 shadow">
              Loading jobs from test backend...
            </div>
          ) : jobs.length > 0 ? (
            <div className="space-y-3">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No jobs found</h3>
              <p className="text-sm text-gray-500 mb-4">
                Try adjusting your filters or browse all available positions.
              </p>
              <button
                onClick={clearFilters}
                className="bg-navy-700 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-navy-600 transition-colors"
              >
                View All Jobs
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
}
