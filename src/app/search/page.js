'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import JobCard from '@/components/JobCard';
import Sidebar from '@/components/Sidebar';
import { getJobs, getStates } from '@/lib/data';

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-12 text-center text-gray-500">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const q = searchParams.get('q') || '';
  const stateParam = searchParams.get('state') || '';

  const [keyword, setKeyword] = useState(q);
  const [selectedState, setSelectedState] = useState(stateParam);

  const states = getStates();

  const filters = {};
  if (q) filters.search = q;
  if (stateParam) filters.state = stateParam;

  const jobs = getJobs(filters);

  useEffect(() => {
    setKeyword(q);
    setSelectedState(stateParam);
  }, [q, stateParam]);

  function handleSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set('q', keyword.trim());
    if (selectedState) params.set('state', selectedState);
    router.push(`/search?${params.toString()}`);
  }

  const hasQuery = q || stateParam;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-navy-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-navy-800 font-medium">Search Results</span>
      </nav>

      {/* Search Form */}
      <div className="bg-white rounded-lg shadow p-5 mb-6">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Keyword
            </label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search by title, college, or keyword..."
              className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
            />
          </div>

          <div className="sm:w-48">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              State
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
            >
              <option value="">All States</option>
              {states.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full sm:w-auto bg-navy-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-600 transition-colors"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Results Header */}
      {hasQuery && (
        <div className="mb-4">
          <h1 className="text-xl font-bold text-navy-800">
            {q ? (
              <>Results for &lsquo;{q}&rsquo;</>
            ) : (
              <>Jobs in {stateParam}</>
            )}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            <span className="font-semibold text-accent-500">{jobs.length}</span>{' '}
            {jobs.length === 1 ? 'result' : 'results'} found
          </p>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Job Listings */}
        <div className="lg:col-span-2">
          {!hasQuery ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <div className="text-4xl mb-3">🔎</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Search for Faculty Jobs</h3>
              <p className="text-sm text-gray-500">
                Enter a keyword or select a state to find relevant positions.
              </p>
            </div>
          ) : jobs.length > 0 ? (
            <div className="space-y-3">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <div className="text-4xl mb-3">😕</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No results found</h3>
              <p className="text-sm text-gray-500 mb-4">
                No jobs matched your search. Try different keywords or broaden your filters.
              </p>
              <Link
                href="/jobs"
                className="inline-block bg-navy-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-600 transition-colors"
              >
                Browse All Jobs
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
}
