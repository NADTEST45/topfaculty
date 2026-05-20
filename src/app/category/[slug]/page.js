import Link from 'next/link';
import JobCard from '@/components/JobCard';
import Sidebar from '@/components/Sidebar';
import { getJobs, getCategories } from '@/lib/data';

export default function CategoryPage({ params }) {
  const { slug } = params;
  const categories = getCategories();
  const category = categories.find((c) => c.slug === slug);
  const jobs = getJobs({ category: slug });

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">🚫</div>
        <h1 className="text-2xl font-bold text-gray-700 mb-2">Category Not Found</h1>
        <p className="text-gray-500 mb-6">The category you are looking for does not exist.</p>
        <Link
          href="/jobs"
          className="inline-block bg-navy-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-600 transition-colors"
        >
          Browse All Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-navy-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/jobs" className="hover:text-navy-600 transition-colors">Categories</Link>
        <span>/</span>
        <span className="text-navy-800 font-medium">{category.name}</span>
      </nav>

      {/* Category Header */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-navy-700/10 rounded-xl flex items-center justify-center text-2xl">
            {category.icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy-800">{category.name}</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              <span className="font-semibold text-accent-500">{jobs.length}</span>{' '}
              {jobs.length === 1 ? 'position' : 'positions'} available
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Job Listings */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-navy-800">{jobs.length}</span> job{jobs.length !== 1 ? 's' : ''} in{' '}
              <span className="font-semibold text-navy-800">{category.name}</span>
            </p>
            <Link
              href="/jobs"
              className="text-sm text-navy-600 hover:text-navy-700 font-medium transition-colors"
            >
              View All Jobs
            </Link>
          </div>

          {jobs.length > 0 ? (
            <div className="space-y-3">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <div className="text-4xl mb-3">📭</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No jobs in this category</h3>
              <p className="text-sm text-gray-500 mb-4">
                There are currently no open positions in {category.name}. Check back soon or browse other categories.
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
