import Link from 'next/link';
import { getFdpEvents } from '@/lib/data';

const typeBadgeColors = {
  FDP: 'bg-blue-100 text-blue-700',
  Conference: 'bg-purple-100 text-purple-700',
  Workshop: 'bg-accent-500/15 text-accent-600',
  Seminar: 'bg-teal-100 text-teal-700',
  Webinar: 'bg-indigo-100 text-indigo-700',
};

const modeBadgeColors = {
  Online: 'bg-green-100 text-green-700',
  Offline: 'bg-blue-100 text-blue-700',
  Hybrid: 'bg-purple-100 text-purple-700',
};

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function FdpPage() {
  const events = getFdpEvents();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-navy-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-navy-800 font-medium">FDPs &amp; Conferences</span>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-navy-700 to-navy-600 rounded-xl p-8 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">FDPs &amp; Conferences</h1>
        <p className="text-navy-100 max-w-2xl text-sm leading-relaxed">
          Discover Faculty Development Programs, conferences, workshops, and seminars
          to enhance your academic skills and expand your professional network.
        </p>
      </div>

      {/* Events Count */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold text-navy-800">{events.length}</span>{' '}
          upcoming {events.length === 1 ? 'event' : 'events'}
        </p>
      </div>

      {/* Events Grid */}
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200 border border-gray-100 overflow-hidden group"
            >
              {/* Card Top Accent */}
              <div className="h-1 bg-gradient-to-r from-navy-700 to-accent-500" />

              <div className="p-5">
                {/* Badges */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      typeBadgeColors[event.type] || 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {event.type}
                  </span>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      modeBadgeColors[event.mode] || 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {event.mode}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-navy-800 mb-2 leading-snug group-hover:text-navy-600 transition-colors line-clamp-2">
                  {event.title}
                </h3>

                {/* Organizer */}
                <p className="text-sm text-gray-500 mb-3 line-clamp-1">
                  {event.organizer}
                </p>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg
                    className="w-4 h-4 text-accent-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-medium">{formatDate(event.date)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-4xl mb-3">📅</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No upcoming events</h3>
          <p className="text-sm text-gray-500 mb-4">
            There are no FDPs or conferences listed at the moment. Check back soon for new events.
          </p>
          <Link
            href="/"
            className="inline-block bg-navy-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-600 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      )}
    </div>
  );
}
