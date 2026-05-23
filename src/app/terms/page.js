import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export const metadata = {
  title: 'Terms of Service',
  description:
    'Terms governing your use of TopFaculty for job search, recruitment, reviews, and premium services.',
  alternates: { canonical: '/terms' },
};

const LAST_UPDATED = 'May 23, 2026';

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-navy-600">Home</Link>
        <span>/</span>
        <span className="text-navy-800 font-medium">Terms of Service</span>
      </nav>

      <article className="prose-tf rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
        <header className="mb-6 border-b border-gray-100 pb-4">
          <h1 className="text-3xl font-black text-navy-900">Terms of Service</h1>
          <p className="mt-2 text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>
        </header>

        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of {siteConfig.name}
          (&ldquo;the Platform&rdquo;), operated through {siteConfig.url}. By using the Platform you
          agree to these Terms. If you do not agree, please do not use the Platform.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy-900">1. What the platform does</h2>
        <p>
          {siteConfig.name} is an online platform that lists faculty and academic job opportunities,
          allows candidates to maintain professional profiles, allows institutions to publish vacancies
          and search candidates, hosts anonymous institution reviews, and offers premium recruitment and
          branding services. {siteConfig.name} is a facilitator; it is not the employer for any role
          listed on the Platform.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy-900">2. Eligibility</h2>
        <p>
          You must be at least eighteen (18) years old and capable of forming a legally binding contract
          under the Indian Contract Act, 1872 to use the Platform. By creating a profile or submitting a
          job posting you confirm that you meet these requirements.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy-900">3. Your responsibilities</h2>
        <ul className="list-disc space-y-1 pl-6">
          <li>Provide accurate, current, and complete information.</li>
          <li>Do not post on behalf of any individual or institution without their authority.</li>
          <li>Do not submit content that is false, defamatory, harassing, infringes intellectual property, or violates any law.</li>
          <li>Do not attempt to gain unauthorised access to the Platform, scrape data at scale, or interfere with normal operation.</li>
          <li>Maintain the confidentiality of any account credentials provided to you.</li>
        </ul>

        <h2 className="mt-8 text-xl font-bold text-navy-900">4. Job listings and recruitment</h2>
        <p>
          Job listings may be either submitted by institutions or aggregated from publicly available
          sources. {siteConfig.name} performs reasonable verification but does not warrant that any
          listing is accurate, current, or will result in employment. You acknowledge that:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Application decisions are made solely by the listing institution.</li>
          <li>{siteConfig.name} does not collect application fees from candidates. If a third party requests payment in connection with a listing, please report it.</li>
          <li>Salary ranges, deadlines, and qualification criteria are provided by the institution and may change without notice.</li>
        </ul>

        <h2 className="mt-8 text-xl font-bold text-navy-900">5. Reviews</h2>
        <p>
          Reviews of institutions submitted through the Platform are the opinions of the contributors.
          They are stored as anonymous by default. {siteConfig.name} may moderate or remove reviews that
          violate these Terms, contain personally identifying information about staff or students, or
          are demonstrably false.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy-900">6. Premium services and fees</h2>
        <p>
          Featured job listings and other premium services are offered subject to the pricing displayed
          on the Platform at the time of purchase. Fees are exclusive of applicable taxes and are
          non-refundable except where required by law. Premium listings remain visible for the period
          stated at the time of purchase.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy-900">7. Intellectual property</h2>
        <p>
          The Platform&rsquo;s design, code, and aggregated content (including the {siteConfig.name}
          name and logo) are the intellectual property of {siteConfig.name}. You retain ownership of
          content you submit but grant {siteConfig.name} a worldwide, non-exclusive, royalty-free
          licence to host, display, and distribute that content as necessary to operate the Platform.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy-900">8. Disclaimers and limitation of liability</h2>
        <p>
          The Platform is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. To
          the maximum extent permitted by law, {siteConfig.name} disclaims all warranties, express or
          implied, including merchantability, fitness for a particular purpose, and non-infringement.
          {' '}{siteConfig.name} will not be liable for any indirect, incidental, special, consequential,
          or punitive damages, or for loss of profits, revenue, data, or goodwill, arising out of or in
          connection with your use of the Platform. Total aggregate liability for any claim arising out
          of these Terms or your use of the Platform is limited to the amount you have paid to
          {' '}{siteConfig.name} in the twelve (12) months preceding the event giving rise to the claim,
          or INR 1,000, whichever is greater.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy-900">9. Indemnity</h2>
        <p>
          You agree to indemnify and hold {siteConfig.name}, its officers, employees, and contractors
          harmless from any claim, loss, or expense (including reasonable legal fees) arising from
          content you submit, your use of the Platform, or your breach of these Terms.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy-900">10. Termination</h2>
        <p>
          {siteConfig.name} may suspend or terminate your access at any time, with or without notice,
          for any breach of these Terms or any conduct that {siteConfig.name} reasonably believes is
          harmful to the Platform or to other users. You may stop using the Platform at any time by
          ceasing to access it and, if applicable, requesting deletion of your profile.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy-900">11. Governing law and dispute resolution</h2>
        <p>
          These Terms are governed by the laws of India. Any dispute arising out of or in connection
          with these Terms will be resolved by binding arbitration seated in Chennai, Tamil Nadu,
          conducted in English under the Arbitration and Conciliation Act, 1996. The courts at Chennai
          will have exclusive jurisdiction over any matter not subject to arbitration.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy-900">12. Changes to these terms</h2>
        <p>
          We may update these Terms from time to time. Material changes will be notified at least
          fifteen (15) days in advance by email (to registered users) and by a notice on the Platform.
          Continued use after the effective date constitutes acceptance of the updated Terms.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy-900">13. Contact</h2>
        <p>
          Questions about these Terms: <a href={`mailto:${siteConfig.email}`} className="text-navy-600 hover:underline">{siteConfig.email}</a>.
        </p>

        <p className="mt-10 text-xs text-gray-500">
          This document is provided as a good-faith template and is not a substitute for independent
          legal advice. Please have qualified counsel review these Terms before public launch.
        </p>
      </article>
    </div>
  );
}
