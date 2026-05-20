'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import JobCard from '@/components/JobCard';
import Sidebar from '@/components/Sidebar';
import { getJobs, getCategories, getDesignations, getStates } from '@/lib/data';

export default function JobsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get('category') || '';
  const designation = searchParams.get('designation') || '';
  const state = searchParams.get('state') || '';
  const type = searchParams.get('type') || '';

  const filters = {};
  if (category) filters.category = category;
  if (designation) filters.designation = designation;
  if (state) filters.state = state;
  if (type) filters.type = type;

  const jobs = getJobs(filters);
  const categories = getCategories();
  const designations = getDesignations();
  const states = getStates();

  const hasFilters = category || designation || state || type;

  function handleFilterChange(key, value) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/jobs?${params.toString()}`);
  }

  function clearFilters() {
    router.push('/jobs');
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-navy-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-navy-800 font-medium">Jobs</span>
      </nav>

      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-800">All Faculty Jobs</h1>
        <p className="text-gray-500 text-sm mt-1">
          Browse the latest teaching and academic positions across India
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-start sm:items-end">
          {/* Category */}
          <div className="w-full sm:w-auto sm:flex-1 sm:min-w-[160px]">
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
          <div className="w-full sm:w-auto sm:flex-1 sm:min-w-[160px]">
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
          <div className="w-full sm:w-auto sm:flex-1 sm:min-w-[160px]">
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
          <div className="w-full sm:w-auto sm:flex-1 sm:min-w-[140px]">
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

          {/* Clear Filters */}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-red-500 hover:text-red-700 font-medium whitespace-nowrap py-2 sm:pb-2"
            >
              Clear Filters
            </button>
          )}
        </div>
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

          {jobs.length > 0 ? (
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
