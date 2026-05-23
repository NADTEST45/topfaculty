import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center">
      <div className="rounded-full bg-navy-50 px-4 py-2 text-sm font-bold text-navy-700">404</div>
      <h1 className="mt-5 text-4xl font-black text-navy-900">This page wandered off campus.</h1>
      <p className="mt-3 max-w-xl text-gray-600">
        The page you are looking for does not exist, but the latest academic jobs and FDP listings are still ready for you.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/jobs" className="rounded-full bg-navy-900 px-6 py-3 text-sm font-bold text-white hover:bg-navy-700">
          Browse Jobs
        </Link>
        <Link href="/" className="rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-navy-900 hover:bg-gray-50">
          Back Home
        </Link>
      </div>
    </div>
  );
}
