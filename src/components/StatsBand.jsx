import { getJobs, getCategories, getFdpEvents } from '@/lib/data';

export default function StatsBand() {
  const jobs = getJobs();
  const categories = getCategories();
  const fdps = getFdpEvents();
  const states = new Set(jobs.map((job) => job.state));

  const stats = [
    { value: `${jobs.length}+`, label: 'active academic openings' },
    { value: `${states.size}+`, label: 'states covered' },
    { value: `${categories.length}`, label: 'specialized categories' },
    { value: `${fdps.length}`, label: 'FDPs and events' },
  ];

  return (
    <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm backdrop-blur">
          <p className="text-2xl font-black text-navy-900 md:text-3xl">{stat.value}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gray-500">{stat.label}</p>
        </div>
      ))}
    </section>
  );
}
