import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export const metadata = {
  title: 'Disclaimer',
  description:
    'Limits of representations and warranties regarding job listings, reviews, and content on TopFaculty.',
  alternates: { canonical: '/disclaimer' },
};

const LAST_UPDATED = 'May 23, 2026';

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-navy-600">Home</Link>
        <span>/</span>
        <span className="text-navy-800 font-medium">Disclaimer</span>
      </nav>

      <article className="prose-tf rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
        <header className="mb-6 border-b border-gray-100 pb-4">
          <h1 className="text-3xl font-black text-navy-900">Disclaimer</h1>
          <p className="mt-2 text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>
        </header>

        <h2 className="text-xl font-bold text-navy-900">Job listings</h2>
        <p>
          Job opportunities published on {siteConfig.name} are either submitted by hiring institutions
          or aggregated from publicly available sources such as institutional websites and recruitment
          notices. We make reasonable efforts to verify the authenticity of the listings we display, but
          {' '}{siteConfig.name} is not the employer for any role and does not guarantee any of the
          following:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>that a listing is currently open;</li>
          <li>that salary, deadline, qualification, or vacancy information is accurate or up-to-date;</li>
          <li>that an application submitted through or referenced from {siteConfig.name} will be considered or will result in employment;</li>
          <li>that any third party representing themselves as a recruiter, consultant, or employer is authorised to do so.</li>
        </ul>
        <p>
          Candidates should independently verify a listing with the hiring institution&rsquo;s official
          channels before making any commitment, financial or otherwise.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy-900">No application fees</h2>
        <p>
          {siteConfig.name} does not charge candidates any fee to view, search, or apply for jobs listed
          on the Platform. If anyone requests payment from you in connection with a listing seen on
          {' '}{siteConfig.name}, treat it as suspicious and write to <a href={`mailto:${siteConfig.email}`} className="text-navy-600 hover:underline">{siteConfig.email}</a> so
          we can investigate and remove the listing if needed.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy-900">Reviews</h2>
        <p>
          Institution reviews displayed on {siteConfig.name} are the personal opinions of the contributors
          and do not represent the views of {siteConfig.name}. We moderate reviews for clear policy
          violations (personal attacks, identifying information about staff or students, demonstrably false
          claims, spam), but we do not independently verify every claim. Treat reviews as one input among
          many in your decision-making, not as a substitute for direct due diligence.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy-900">FDPs, conferences, and external links</h2>
        <p>
          Listings for Faculty Development Programmes, conferences, workshops, and other external events
          are provided for informational purposes. Registration, fees, schedules, and certificates are
          governed entirely by the organiser, not by {siteConfig.name}. Outbound links to third-party
          sites are provided for convenience; we do not endorse the content or practices of those sites.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy-900">No professional advice</h2>
        <p>
          Content on {siteConfig.name} is for general information only and does not constitute career,
          legal, financial, immigration, or academic advice. Please consult an appropriate professional
          before relying on any information here for an important decision.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy-900">Reporting issues</h2>
        <p>
          If you find a listing or review on {siteConfig.name} that you believe is fraudulent, illegal,
          defamatory, or otherwise harmful, please email <a href={`mailto:${siteConfig.email}`} className="text-navy-600 hover:underline">{siteConfig.email}</a>. We
          aim to acknowledge such reports within seven (7) working days.
        </p>
      </article>
    </div>
  );
}
