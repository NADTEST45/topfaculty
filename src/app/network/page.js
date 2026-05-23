import Link from 'next/link';
import JobCard from '@/components/JobCard';
import { getFeaturedJobs } from '@/lib/data';

const networkActions = [
  'Connections',
  'Friend requests',
  'Member chat',
  'Groups',
  'Institution posts',
  'Endorsements',
  'Reports',
  'College subscriptions',
];

const feed = [
  {
    author: 'Dr. Meera Krishnan',
    role: 'Associate Professor, Computer Science',
    type: 'Workshop',
    title: 'Posting a 3-day FDP on applied AI for engineering faculty.',
    meta: 'General post - 42 interested members',
  },
  {
    author: 'Raman Research Forum',
    role: 'Institution group',
    type: 'Event',
    title: 'Inviting scholars for a July research methods roundtable.',
    meta: 'Group update - Open to subscribed colleges',
  },
  {
    author: 'TopFaculty Admin',
    role: 'Portal operations',
    type: 'Network',
    title: 'Verified institutions can now request candidate search access.',
    meta: 'Announcement - Recruitment desk',
  },
];

const reviewStats = [
  { label: 'Teaching quality', value: '4.4' },
  { label: 'Working environment', value: '4.1' },
  { label: 'Career growth', value: '3.9' },
];

export default function NetworkPage() {
  const featuredJobs = getFeaturedJobs().slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-navy-600">Home</Link>
        <span>/</span>
        <span className="text-navy-800 font-medium">Scholar Network</span>
      </nav>

      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-wide text-accent-600">Academic professional network</p>
        <h1 className="text-2xl font-bold text-navy-800 mt-1">Scholar network dashboard</h1>
        <p className="text-sm text-gray-600 mt-2 max-w-3xl">
          A first-pass dashboard joining LinkedIn-style profiles, Naukri-style jobs, Glassdoor-style reviews, and TopFaculty services.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="space-y-4">
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-sm font-bold uppercase tracking-wide text-navy-800 border-b pb-2 mb-4">Profile actions</h2>
            <div className="space-y-2">
              {networkActions.map((action) => (
                <div key={action} className="flex items-center justify-between text-sm border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                  <span className="text-gray-700">{action}</span>
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-navy-800 rounded-lg shadow p-5 text-white">
            <h2 className="font-bold">Join as candidate</h2>
            <p className="text-sm text-navy-100 mt-2">Create a profile with education, experience, scholar IDs, resume, and social links.</p>
            <Link href="/register/candidate" className="inline-block mt-4 bg-white text-navy-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-navy-50">Create profile</Link>
          </div>
        </aside>

        <section className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-5 py-4 bg-gray-50 border-b flex items-center justify-between">
              <h2 className="font-semibold text-gray-800">LinkedIn-style scholar feed</h2>
              <Link href="/register/candidate" className="text-xs font-semibold text-accent-600 hover:underline">Post update</Link>
            </div>
            <div className="divide-y divide-gray-100">
              {feed.map((post) => (
                <article key={post.title} className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-navy-800">{post.author}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{post.role}</p>
                    </div>
                    <span className="bg-navy-50 text-navy-700 text-xs px-2 py-1 rounded font-semibold">{post.type}</span>
                  </div>
                  <p className="text-sm text-gray-700 mt-4">{post.title}</p>
                  <p className="text-xs text-gray-500 mt-3">{post.meta}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/reviews" className="bg-white rounded-lg shadow p-5 hover:shadow-md transition">
              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Glassdoor-style</span>
              <h2 className="font-semibold text-navy-800 mt-1">Institution reviews</h2>
              <p className="text-sm text-gray-600 mt-2">Teaching quality, salary range, environment, benefits, placements, and pros or cons.</p>
            </Link>
            <Link href="/services" className="bg-white rounded-lg shadow p-5 hover:shadow-md transition">
              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Faculty services</span>
              <h2 className="font-semibold text-navy-800 mt-1">Premium requests</h2>
              <p className="text-sm text-gray-600 mt-2">Quality improvement, branding, recruitment consultancy, and online video programs.</p>
            </Link>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center justify-between border-b pb-2 mb-4">
              <h2 className="text-sm font-bold uppercase tracking-wide text-navy-800">Naukri-style jobs</h2>
              <Link href="/jobs" className="text-xs text-navy-600 hover:underline">All</Link>
            </div>
            <div className="space-y-3">
              {featuredJobs.map((job) => <JobCard key={job.id} job={job} compact />)}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center justify-between border-b pb-2 mb-4">
              <h2 className="text-sm font-bold uppercase tracking-wide text-navy-800">Review snapshot</h2>
              <Link href="/reviews" className="text-xs text-navy-600 hover:underline">Open</Link>
            </div>
            <div className="space-y-3">
              {reviewStats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{stat.label}</span>
                  <span className="font-bold text-navy-800">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
