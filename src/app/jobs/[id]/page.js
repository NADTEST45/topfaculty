import Link from 'next/link';
import { notFound } from 'next/navigation';
import JobCard from '@/components/JobCard';
import { getJob, getJobs } from '@/lib/data';

export default function JobDetailPage({ params }) {
  const job = getJob(params.id);

  if (!job) {
    notFound();
  }

  const relatedJobs = getJobs({ category: job.category })
    .filter((j) => j.id !== job.id)
    .slice(0, 3);

  const postedDate = new Date(job.postedDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const deadlineDate = new Date(job.deadline).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const isDeadlineSoon =
    (new Date(job.deadline) - new Date()) / 86400000 < 7 &&
    new Date(job.deadline) > new Date();

  const isExpired = new Date(job.deadline) < new Date();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-navy-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/jobs" className="hover:text-navy-600 transition-colors">Jobs</Link>
        <span>/</span>
        <span className="text-navy-800 font-medium truncate max-w-xs">{job.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="bg-white rounded-lg shadow p-6">
            {/* Badges */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              {job.type === 'walk-in' && (
                <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                  Walk-in
                </span>
              )}
              {job.featured && (
                <span className="bg-navy-700 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                  Featured
                </span>
              )}
              <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                {job.category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </span>
              <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                {job.designation}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-navy-800 leading-tight mb-2">
              {job.title}
            </h1>

            {/* Institution & Location */}
            <p className="text-gray-600 text-base mb-4">
              <span className="font-medium text-gray-800">{job.institution}</span>
              <span className="mx-2 text-gray-300">|</span>
              {job.city}, {job.state}
            </p>

            {/* Key Info Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Experience</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">{job.experience}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Vacancies</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">{job.vacancies} opening{job.vacancies > 1 ? 's' : ''}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Salary</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">{job.salary}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Type</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5 capitalize">{job.type}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-navy-800 mb-3 border-l-4 border-navy-500 pl-3">
              Job Description
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Qualifications */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-navy-800 mb-3 border-l-4 border-accent-500 pl-3">
              Qualifications & Requirements
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {job.qualifications}
            </p>
          </div>

          {/* Dates */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-navy-800 mb-3 border-l-4 border-navy-500 pl-3">
              Important Dates
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center text-navy-700 shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Posted On</p>
                  <p className="text-sm font-medium text-gray-800">{postedDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isExpired ? 'bg-red-50 text-red-600' : isDeadlineSoon ? 'bg-accent-50 text-accent-600' : 'bg-navy-50 text-navy-700'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Application Deadline</p>
                  <p className={`text-sm font-medium ${isExpired ? 'text-red-600' : isDeadlineSoon ? 'text-accent-600' : 'text-gray-800'}`}>
                    {deadlineDate}
                    {isExpired && <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">Expired</span>}
                    {isDeadlineSoon && !isExpired && <span className="ml-2 text-xs bg-accent-100 text-accent-600 px-2 py-0.5 rounded-full font-bold">Closing Soon</span>}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Back Link (mobile) */}
          <div className="lg:hidden">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 text-sm text-navy-600 hover:text-navy-800 font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to All Jobs
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Apply Card */}
          <div className="bg-white rounded-lg shadow p-6 sticky top-6">
            <h3 className="font-bold text-navy-800 text-base mb-4">Apply for this Position</h3>

            {!isExpired ? (
              <a
                href={`mailto:${job.contact.email}?subject=Application for ${encodeURIComponent(job.title)}`}
                className="block w-full bg-accent-500 hover:bg-accent-600 text-white text-center py-3 rounded-lg font-semibold text-sm transition-colors mb-4"
              >
                Apply Now
              </a>
            ) : (
              <div className="w-full bg-gray-300 text-gray-600 text-center py-3 rounded-lg font-semibold text-sm mb-4 cursor-not-allowed">
                Deadline Passed
              </div>
            )}

            {/* Contact Info */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Contact Information</h4>

              {job.contact.email && (
                <div className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${job.contact.email}`} className="text-sm text-navy-600 hover:underline break-all">
                    {job.contact.email}
                  </a>
                </div>
              )}

              {job.contact.phone && (
                <div className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${job.contact.phone}`} className="text-sm text-gray-700 hover:text-navy-600">
                    {job.contact.phone}
                  </a>
                </div>
              )}

              {job.contact.website && (
                <div className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <a
                    href={job.contact.website.startsWith('http') ? job.contact.website : `https://${job.contact.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-navy-600 hover:underline break-all"
                  >
                    {job.contact.website}
                  </a>
                </div>
              )}
            </div>

            {/* Back Link */}
            <div className="pt-4 mt-4 border-t border-gray-100 hidden lg:block">
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 text-sm text-navy-600 hover:text-navy-800 font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to All Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related Jobs */}
      {relatedJobs.length > 0 && (
        <section className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-navy-800 border-l-4 border-accent-500 pl-3">
              Related Jobs
            </h2>
            <Link href={`/jobs?category=${job.category}`} className="text-navy-600 text-sm hover:underline font-medium">
              View All in Category
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedJobs.map((rJob) => (
              <JobCard key={rJob.id} job={rJob} compact />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
