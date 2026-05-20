import Link from 'next/link';
export default function JobCard({ job, compact = false }) {
  const daysAgo = Math.floor((Date.now() - new Date(job.postedDate)) / 86400000);
  return (
    <div className={`bg-white rounded-lg shadow hover:shadow-md transition-shadow border-l-4 ${job.type === 'walk-in' ? 'border-accent-500' : 'border-navy-500'} ${compact ? 'p-3' : 'p-5'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            {job.type === 'walk-in' && <span className="bg-accent-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">Walk-in</span>}
            {job.featured && <span className="bg-navy-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">Featured</span>}
            <span className="text-gray-400 text-xs">{daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : `${daysAgo} days ago`}</span>
          </div>
          <Link href={`/jobs/${job.id}`} className="text-navy-800 font-semibold hover:text-navy-600 text-base leading-snug block">{job.title}</Link>
          {!compact && (
            <>
              <p className="text-gray-600 text-sm mt-1">{job.institution} — {job.city}, {job.state}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">{job.designation}</span>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">{job.experience}</span>
                {job.vacancies && <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">{job.vacancies} opening{job.vacancies > 1 ? 's' : ''}</span>}
              </div>
            </>
          )}
        </div>
        {!compact && <Link href={`/jobs/${job.id}`} className="bg-navy-800 text-white px-4 py-2 rounded text-xs font-semibold hover:bg-navy-700 whitespace-nowrap hidden sm:block">View Details</Link>}
      </div>
    </div>
  );
}
