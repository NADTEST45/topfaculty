import Link from 'next/link';
import JobCard from '@/components/JobCard';
import Sidebar from '@/components/Sidebar';
import { getFeaturedJobs, getRecentJobs, getCategories, getFdpEvents } from '@/lib/data';

export default function HomePage() {
  const featured = getFeaturedJobs();
  const recent = getRecentJobs(10);
  const categories = getCategories();
  const fdps = getFdpEvents().slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Hero */}
      <div className="bg-gradient-to-r from-navy-800 to-navy-600 rounded-xl p-8 mb-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Find Your Next Academic Position</h2>
        <p className="text-navy-100 mb-6">Browse {recent.length}+ faculty jobs across India's top colleges and universities</p>
        <form action="/search" className="flex flex-col sm:flex-row gap-2 max-w-2xl">
          <input name="q" placeholder="Job title, institution, or keyword..." className="flex-1 px-4 py-3 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" />
          <select name="state" className="px-4 py-3 rounded-lg text-gray-800 text-sm focus:outline-none">
            <option value="">All States</option>
            {['Tamil Nadu','Karnataka','Andhra Pradesh','Telangana','Maharashtra','Kerala','Delhi'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button type="submit" className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-semibold text-sm transition-colors">Search</button>
        </form>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8">
        {categories.map(c => (
          <Link key={c.slug} href={`/category/${c.slug}`} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4 text-center group">
            <span className="text-2xl block mb-1">{c.icon}</span>
            <span className="text-sm font-semibold text-navy-800 group-hover:text-navy-600">{c.name}</span>
            <span className="text-xs text-gray-500 block">{c.count} jobs</span>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Featured / Walk-in */}
          {featured.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-navy-800 border-l-4 border-accent-500 pl-3">Featured & Walk-in Jobs</h2>
              </div>
              <div className="space-y-3">
                {featured.map(job => <JobCard key={job.id} job={job} />)}
              </div>
            </section>
          )}

          {/* Latest Jobs */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-navy-800 border-l-4 border-navy-500 pl-3">Latest Faculty Jobs</h2>
              <Link href="/jobs" className="text-navy-600 text-sm hover:underline font-medium">View All →</Link>
            </div>
            <div className="space-y-3">
              {recent.map(job => <JobCard key={job.id} job={job} />)}
            </div>
          </section>

          {/* FDPs */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-navy-800 border-l-4 border-green-500 pl-3">FDPs & Conferences</h2>
              <Link href="/fdp" className="text-navy-600 text-sm hover:underline font-medium">View All →</Link>
            </div>
            <div className="bg-white rounded-lg shadow divide-y">
              {fdps.map(e => (
                <div key={e.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-navy-800">{e.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{e.organizer}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${e.mode === 'Online' ? 'bg-green-100 text-green-700' : e.mode === 'Hybrid' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>{e.mode}</span>
                      <p className="text-xs text-gray-500 mt-1">{new Date(e.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
}
