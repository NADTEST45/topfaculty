import Link from 'next/link';
import { getDeadlineStatus, getPostedLabel, normalizeJobType } from '@/lib/jobUtils';

const deadlineTone = {
  danger: 'bg-red-50 text-red-700 ring-red-100',
  urgent: 'bg-amber-50 text-amber-700 ring-amber-100',
  default: 'bg-navy-50 text-navy-700 ring-navy-100',
};

export default function JobCard({ job, compact = false }) {
  const deadline = getDeadlineStatus(job.deadline);

  return (
    <article className={`group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-navy-100 hover:shadow-xl ${job.type === 'walk-in' ? 'border-l-4 border-l-accent-500' : 'border-l-4 border-l-navy-500'} ${compact ? 'p-4' : 'p-5'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            {job.type === 'walk-in' && <span className="bg-accent-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">Walk-in</span>}
            {job.featured && <span className="bg-navy-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">Featured</span>}
            <span className="text-gray-400 text-xs">{getPostedLabel(job.postedDate)}</span>
          </div>
          <Link href={`/jobs/${job.id}`} className="block text-base font-bold leading-snug text-navy-900 hover:text-navy-600">{job.title}</Link>
          {!compact && (
            <>
              <p className="text-gray-600 text-sm mt-1">{job.institution} — {job.city}, {job.state}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">{job.designation}</span>
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">{normalizeJobType(job.type)}</span>
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">{job.experience}</span>
                {job.vacancies && <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">{job.vacancies} opening{job.vacancies > 1 ? 's' : ''}</span>}
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${deadlineTone[deadline.tone]}`}>
                  {deadline.label}
                </span>
              </div>
              <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">{job.description}</p>
            </>
          )}
        </div>
        {!compact && (
          <Link href={`/jobs/${job.id}`} className="hidden whitespace-nowrap rounded-full bg-navy-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-navy-700 sm:block">
            View Details
          </Link>
        )}
      </div>
    </article>
  );
}
