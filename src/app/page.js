import Link from 'next/link';
import JobCard from '@/components/JobCard';
import Sidebar from '@/components/Sidebar';
import StatsBand from '@/components/StatsBand';
import { getFeaturedJobs, getRecentJobs, getCategories, getFdpEvents } from '@/lib/data';
import { employerPackages } from '@/lib/site';

export default function HomePage() {
  const featured = getFeaturedJobs();
  const recent = getRecentJobs(10);
  const categories = getCategories();
  const fdps = getFdpEvents().slice(0, 6);
  const topStates = ['Tamil Nadu', 'Karnataka', 'Andhra Pradesh', 'Telangana', 'Maharashtra', 'Kerala', 'Delhi'];
  const portalModules = [
    { title: 'Candidate Profiles', href: '/register/candidate', description: 'Education, experience, scholar IDs, resume, preferred location, and social links.' },
    { title: 'College Portal', href: '/register/college', description: 'Institution registration for vacancies, candidate search, and premium access.' },
    { title: 'Scholar Network', href: '/network', description: 'Connections, groups, posts, endorsements, reporting, and college subscriptions.' },
    { title: 'Reviews', href: '/reviews', description: 'Anonymous institution reviews for quality, salary, environment, benefits, and growth.' },
    { title: 'Premium Services', href: '/services', description: 'Branding, publicity, recruitment consultancy, and quality improvement requests.' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <section className="relative mb-8 overflow-hidden rounded-[2rem] bg-[#071f2f] p-6 text-white shadow-2xl md:p-10">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent-500/25 blur-3xl" />
        <div className="absolute -bottom-28 left-10 h-80 w-80 rounded-full bg-sky-400/15 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-accent-500 ring-1 ring-white/15">
              Verified academic hiring across India
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
              Academic hiring, scholar profiles, reviews, and recruitment services.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-navy-100 md:text-lg">
              Search teaching, research, leadership, and FDP opportunities while colleges manage profiles, vacancies, candidate discovery, branding, and support requests.
            </p>
            <form action="/search" className="mt-7 grid gap-2 rounded-2xl bg-white p-2 shadow-xl sm:grid-cols-[1fr_180px_auto]">
              <label className="sr-only" htmlFor="home-search">Search jobs</label>
              <input id="home-search" name="q" placeholder="Assistant Professor, CSE, IIT, nursing..." className="min-h-12 rounded-xl px-4 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-accent-500" />
              <label className="sr-only" htmlFor="home-state">State</label>
              <select id="home-state" name="state" className="min-h-12 rounded-xl px-4 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-accent-500">
                <option value="">All States</option>
                {topStates.map((state) => <option key={state} value={state}>{state}</option>)}
              </select>
              <button type="submit" className="min-h-12 rounded-xl bg-accent-500 px-8 text-sm font-black text-white transition hover:bg-accent-600">Search Jobs</button>
            </form>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link href="/register/candidate" className="rounded-xl bg-white px-5 py-3 text-center text-sm font-black text-navy-900 transition hover:bg-navy-50">Create Candidate Profile</Link>
              <Link href="/register/college" className="rounded-xl bg-white/10 px-5 py-3 text-center text-sm font-black text-white ring-1 ring-white/20 transition hover:bg-white/15">Register College</Link>
              <Link href="/services" className="rounded-xl bg-white/10 px-5 py-3 text-center text-sm font-black text-white ring-1 ring-white/20 transition hover:bg-white/15">Premium Services</Link>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 text-xs text-navy-100">
              {['Walk-in interviews', 'Scholar network', 'Institution reviews', 'FDP alerts'].map((item) => (
                <span key={item} className="rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/10">{item}</span>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-500">For institutions</p>
            <h2 className="mt-3 text-2xl font-black">Hire faculty faster with featured listings.</h2>
            <p className="mt-3 text-sm leading-6 text-navy-100">
              Publish verified roles, receive direct applications, and promote urgent openings to active academic candidates.
            </p>
            <div className="mt-5 space-y-3">
              {employerPackages.map((pkg) => (
                <div key={pkg.name} className={`rounded-2xl p-4 ${pkg.highlighted ? 'bg-accent-500 text-white' : 'bg-white/10 text-white'}`}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-bold">{pkg.name}</p>
                    <p className="text-sm font-black">{pkg.price}</p>
                  </div>
                  <p className="mt-1 text-xs opacity-90">{pkg.description}</p>
                </div>
              ))}
            </div>
            <Link href="/admin/jobs/new" className="mt-5 inline-flex w-full justify-center rounded-xl bg-white px-5 py-3 text-sm font-black text-navy-900 transition hover:bg-navy-50">
              Post a Recruitment
            </Link>
          </div>
        </div>
      </section>

      <div className="mb-8">
        <StatsBand />
      </div>

      <section className="mb-8 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-navy-900">Portal modules</h2>
            <p className="text-sm text-gray-500">The first product surfaces from the recruitment portal roadmap.</p>
          </div>
          <Link href="/network" className="hidden rounded-full bg-navy-900 px-4 py-2 text-xs font-bold text-white hover:bg-navy-700 sm:inline-flex">Open network</Link>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
          {portalModules.map((module) => (
            <Link key={module.title} href={module.href} className="rounded-2xl border border-gray-100 bg-gray-50 p-4 transition hover:-translate-y-0.5 hover:border-accent-500 hover:bg-white hover:shadow-lg">
              <h3 className="text-sm font-black text-navy-900">{module.title}</h3>
              <p className="mt-2 text-xs leading-5 text-gray-600">{module.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-8 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-navy-900">Browse by academic stream</h2>
            <p className="text-sm text-gray-500">Jump straight into roles that match your discipline.</p>
          </div>
          <Link href="/jobs" className="hidden rounded-full bg-navy-900 px-4 py-2 text-xs font-bold text-white hover:bg-navy-700 sm:inline-flex">View all jobs</Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`} className="group rounded-2xl border border-gray-100 bg-gray-50 p-4 text-center transition hover:-translate-y-0.5 hover:border-navy-100 hover:bg-white hover:shadow-lg">
              <span className="block text-3xl">{category.icon}</span>
              <span className="mt-2 block text-sm font-black text-navy-900 group-hover:text-navy-600">{category.name}</span>
              <span className="block text-xs text-gray-500">{category.count} jobs</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          {featured.length > 0 && (
            <section>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="border-l-4 border-accent-500 pl-3 text-lg font-black text-navy-900">Featured & Walk-in Jobs</h2>
                  <p className="mt-1 text-sm text-gray-500">Urgent and promoted openings from institutions.</p>
                </div>
                <Link href="/jobs?sort=featured" className="text-sm font-bold text-navy-600 hover:underline">See featured</Link>
              </div>
              <div className="space-y-3">
                {featured.map((job) => <JobCard key={job.id} job={job} />)}
              </div>
            </section>
          )}

          <section>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="border-l-4 border-navy-500 pl-3 text-lg font-black text-navy-900">Latest Faculty Jobs</h2>
                <p className="mt-1 text-sm text-gray-500">Fresh roles sorted by posting date.</p>
              </div>
              <Link href="/jobs" className="text-sm font-bold text-navy-600 hover:underline">View All</Link>
            </div>
            <div className="space-y-3">
              {recent.map((job) => <JobCard key={job.id} job={job} />)}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="border-l-4 border-green-500 pl-3 text-lg font-black text-navy-900">FDPs & Conferences</h2>
                <p className="mt-1 text-sm text-gray-500">Professional development opportunities for academics.</p>
              </div>
              <Link href="/fdp" className="text-sm font-bold text-navy-600 hover:underline">View All</Link>
            </div>
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
              {fdps.map((event) => (
                <div key={event.id} className="p-4 transition-colors hover:bg-gray-50">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-navy-900">{event.title}</h3>
                      <p className="mt-1 text-xs text-gray-500">{event.organizer}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${event.mode === 'Online' ? 'bg-green-100 text-green-700' : event.mode === 'Hybrid' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>{event.mode}</span>
                      <p className="mt-1 text-xs text-gray-500">{new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <Sidebar />
      </div>
    </div>
  );
}
