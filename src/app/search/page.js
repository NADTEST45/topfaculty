'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import JobCard from '@/components/JobCard';
import Sidebar from '@/components/Sidebar';
import { getStates, getCategories, getDesignations } from '@/lib/data';

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
  const categoryParam = searchParams.get('category') || '';
  const designationParam = searchParams.get('designation') || '';
  const typeParam = searchParams.get('type') || '';
  const sortParam = searchParams.get('sort') || 'newest';

  const [keyword, setKeyword] = useState(q);
  const [selectedState, setSelectedState] = useState(stateParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedDesignation, setSelectedDesignation] = useState(designationParam);
  const [selectedType, setSelectedType] = useState(typeParam);
  const [selectedSort, setSelectedSort] = useState(sortParam);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');

  const states = getStates();
  const categories = getCategories();
  const designations = getDesignations();

  const filters = {};
  if (q) filters.search = q;
  if (stateParam) filters.state = stateParam;
  if (categoryParam) filters.category = categoryParam;
  if (designationParam) filters.designation = designationParam;
  if (typeParam) filters.type = typeParam;

  useEffect(() => {
    setKeyword(q);
    setSelectedState(stateParam);
    setSelectedCategory(categoryParam);
    setSelectedDesignation(designationParam);
    setSelectedType(typeParam);
    setSelectedSort(sortParam);
  }, [q, stateParam, categoryParam, designationParam, typeParam, sortParam]);

  useEffect(() => {
    if (!q && !stateParam && !categoryParam && !designationParam && !typeParam && sortParam === 'newest') {
      setJobs([]);
      return;
    }

    const controller = new AbortController();
    const params = new URLSearchParams();
    if (q) params.set('search', q);
    if (stateParam) params.set('state', stateParam);
    if (categoryParam) params.set('category', categoryParam);
    if (designationParam) params.set('designation', designationParam);
    if (typeParam) params.set('type', typeParam);
    if (sortParam) params.set('sort', sortParam);

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
          throw new Error(result.error || 'Unable to load search results.');
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
  }, [q, stateParam, categoryParam, designationParam, typeParam, sortParam]);

  function handleSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set('q', keyword.trim());
    if (selectedState) params.set('state', selectedState);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedDesignation) params.set('designation', selectedDesignation);
    if (selectedType) params.set('type', selectedType);
    if (selectedSort !== 'newest') params.set('sort', selectedSort);
    router.push(`/search?${params.toString()}`);
  }

  const hasQuery = q || stateParam || categoryParam || designationParam || typeParam || sortParam !== 'newest';

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-navy-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-navy-800 font-medium">Search Results</span>
      </nav>

      {/* Search Form */}
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-5 mb-6">
        <form onSubmit={handleSearch} className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
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

          <div>
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

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>{category.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Designation
            </label>
            <select
              value={selectedDesignation}
              onChange={(e) => setSelectedDesignation(e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
            >
              <option value="">All Designations</option>
              {designations.map((designation) => (
                <option key={designation} value={designation}>{designation}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="regular">Regular</option>
              <option value="walk-in">Walk-in</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Sort
            </label>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
            >
              <option value="newest">Newest</option>
              <option value="deadline">Deadline soon</option>
              <option value="featured">Featured</option>
            </select>
          </div>

          <div className="flex items-end lg:col-span-6">
            <button
              type="submit"
              className="w-full bg-navy-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-600 transition-colors"
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
          {loadError && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {loadError}
            </div>
          )}

          {!hasQuery ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <div className="text-4xl mb-3">🔎</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Search for Faculty Jobs</h3>
              <p className="text-sm text-gray-500">
                Enter a keyword or select a state to find relevant positions.
              </p>
            </div>
          ) : loading ? (
            <div className="bg-white rounded-lg shadow p-12 text-center text-sm text-gray-500">
              Loading search results from test backend...
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
