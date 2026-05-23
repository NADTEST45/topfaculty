import Link from 'next/link';
import NewsletterForm from './NewsletterForm';
import { getDesignations, getJobs, getStates } from '@/lib/data';
export default function Sidebar() {
  const designations = getDesignations();
  const states = getStates();
  const jobs = getJobs();
  const urgentJobs = jobs.filter((job) => {
    const days = Math.ceil((new Date(job.deadline) - new Date()) / 86400000);
    return days >= 0 && days <= 7;
  });

  return (
    <aside className="space-y-6">
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
        <h3 className="font-bold text-navy-800 mb-3 text-sm uppercase tracking-wide border-b pb-2">Hiring Intelligence</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-navy-50 p-3">
            <p className="text-2xl font-black text-navy-900">{jobs.length}</p>
            <p className="text-xs font-medium text-gray-500">Active jobs</p>
          </div>
          <div className="rounded-xl bg-amber-50 p-3">
            <p className="text-2xl font-black text-amber-700">{urgentJobs.length}</p>
            <p className="text-xs font-medium text-gray-500">Closing soon</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
        <h3 className="font-bold text-navy-800 mb-3 text-sm uppercase tracking-wide border-b pb-2">Jobs By Designation</h3>
        {designations.map(d => (
          <Link key={d} href={`/search?designation=${encodeURIComponent(d)}`} className="block py-1.5 text-sm text-gray-700 hover:text-navy-600 hover:pl-1 transition-all border-b border-gray-50">{d} Jobs</Link>
        ))}
      </div>
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
        <h3 className="font-bold text-navy-800 mb-3 text-sm uppercase tracking-wide border-b pb-2">Jobs By State</h3>
        {states.slice(0,10).map(s => (
          <Link key={s} href={`/search?state=${encodeURIComponent(s)}`} className="block py-1.5 text-sm text-gray-700 hover:text-navy-600 hover:pl-1 transition-all border-b border-gray-50">{s}</Link>
        ))}
      </div>
      <div className="rounded-2xl bg-gradient-to-br from-accent-500 to-orange-600 p-5 text-center text-white shadow-lg">
        <h3 className="font-bold mb-2">Subscribe to Alerts</h3>
        <p className="text-sm mb-3 opacity-90">Get latest faculty jobs delivered to your inbox</p>
        <NewsletterForm />
      </div>
    </aside>
  );
}
