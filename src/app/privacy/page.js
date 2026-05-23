import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export const metadata = {
  title: 'Privacy Policy',
  description:
    'How TopFaculty collects, uses, and protects personal data of candidates, institutions, and visitors under the Digital Personal Data Protection Act, 2023.',
  alternates: { canonical: '/privacy' },
};

const LAST_UPDATED = 'May 23, 2026';

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-navy-600">Home</Link>
        <span>/</span>
        <span className="text-navy-800 font-medium">Privacy Policy</span>
      </nav>

      <article className="prose-tf rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
        <header className="mb-6 border-b border-gray-100 pb-4">
          <h1 className="text-3xl font-black text-navy-900">Privacy Policy</h1>
          <p className="mt-2 text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>
        </header>

        <p>
          {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates {siteConfig.url} and
          provides a platform that connects faculty candidates, researchers, and academic institutions.
          This Privacy Policy explains what personal data we collect, how we use it, and the choices
          available to you. It is written to be consistent with the Digital Personal Data Protection
          Act, 2023 (&ldquo;DPDP Act&rdquo;) of India.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy-900">1. Information we collect</h2>
        <p>We collect personal data that you provide directly when you use specific features of the site:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li><strong>Candidate profile:</strong> name, email, phone number, preferred location, education and work history, research interests, certifications, Scopus / Google Scholar identifiers, social links, and any free-text fields you choose to fill.</li>
          <li><strong>Institution profile:</strong> college name, official email, website, authorised representative, mobile number, year established, accreditation, courses and departments offered, placement summary, and average package.</li>
          <li><strong>Job postings:</strong> contact details and job description text submitted by the posting institution.</li>
          <li><strong>Contact and service requests:</strong> name, email, message contents, and the institution context you provide.</li>
          <li><strong>Reviews:</strong> institution name, your stated relationship to it, numeric ratings, and free-text pros / cons. Reviews are stored as anonymous by default; we do not associate them with a candidate profile unless you opt out of anonymity.</li>
          <li><strong>Newsletter:</strong> email address only.</li>
        </ul>
        <p>
          We also receive technical data automatically when you visit, including IP address, browser
          and device information, referring page, and pages viewed. This is used for security, abuse
          prevention, and aggregate analytics.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy-900">2. How we use your information</h2>
        <ul className="list-disc space-y-1 pl-6">
          <li>To operate the platform: display job listings, deliver candidate profiles to institutions you engage with, and facilitate contact between candidates and recruiters.</li>
          <li>To respond to enquiries and service requests submitted through the site.</li>
          <li>To send transactional email such as account confirmations, job-application acknowledgements, and weekly job-alert digests if you have subscribed.</li>
          <li>To moderate content (review verification, removing fraudulent listings, enforcing site rules).</li>
          <li>To protect the platform against fraud, abuse, and security incidents.</li>
          <li>To comply with legal obligations and respond to lawful requests.</li>
        </ul>

        <h2 className="mt-8 text-xl font-bold text-navy-900">3. Legal basis</h2>
        <p>
          We process personal data on the basis of your <strong>consent</strong> (for newsletter signups,
          public review submissions, and marketing communications), and on the basis of <strong>legitimate
          uses certified by law</strong> under section 7 of the DPDP Act (for delivering the services you
          have requested and protecting the platform).
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy-900">4. Sharing of data</h2>
        <p>We do not sell personal data. We share data only as follows:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li><strong>Institutions you engage with:</strong> if you submit a job application or make your candidate profile visible to colleges, the relevant institution receives the contact information needed to respond.</li>
          <li><strong>Service providers we use to run the platform:</strong> hosting (Vercel Inc., USA), database (Supabase, hosted in Mumbai region), email delivery, and error monitoring. Each is bound by contractual obligations to process data only on our instructions.</li>
          <li><strong>Legal compliance:</strong> when required by law, valid government request, or to enforce our Terms.</li>
          <li><strong>Business transfer:</strong> in the event of a merger, acquisition, or asset sale, with notice to affected users.</li>
        </ul>

        <h2 className="mt-8 text-xl font-bold text-navy-900">5. International transfers</h2>
        <p>
          Some of our service providers are located outside India. Where personal data is transferred
          internationally, we take steps to ensure it is protected to a standard consistent with the DPDP
          Act and with the contractual safeguards offered by those providers.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy-900">6. Retention</h2>
        <p>
          Candidate and institution profiles are retained while your account is active and for up to
          twenty-four (24) months thereafter, unless you request earlier deletion. Job postings are
          retained for up to thirty-six (36) months from the posting date to provide historical search
          context. Newsletter subscribers are retained until they unsubscribe. Anonymous reviews are
          retained indefinitely as part of the public review record but may be removed on valid
          grievance.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy-900">7. Your rights</h2>
        <p>You have the right, subject to verification, to:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>access the personal data we hold about you;</li>
          <li>correct or update inaccurate or incomplete data;</li>
          <li>request erasure of your data;</li>
          <li>withdraw consent for newsletter or marketing communications at any time;</li>
          <li>nominate another individual to exercise your rights in the event of your incapacity or death.</li>
        </ul>
        <p>
          To exercise any of these rights, write to <a href={`mailto:${siteConfig.email}`} className="text-navy-600 hover:underline">{siteConfig.email}</a> from
          the email address associated with your account.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy-900">8. Security</h2>
        <p>
          We use industry-standard safeguards including TLS in transit, encrypted storage at rest, and
          role-based access controls on production data. No method of transmission or storage is
          perfectly secure; you accept that risk when using any online service.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy-900">9. Cookies</h2>
        <p>
          We use a small number of strictly necessary cookies (authentication, security, anti-abuse).
          We do not use third-party advertising cookies. Aggregated, anonymous traffic analytics may be
          collected to help us improve the site.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy-900">10. Children</h2>
        <p>
          {siteConfig.name} is intended for users aged 18 and above. We do not knowingly collect
          personal data from children under 18. If you believe we have, write to us and we will delete
          the record.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy-900">11. Grievance officer</h2>
        <p>
          Questions, complaints, or DPDP-related requests may be addressed to the Grievance Officer:
        </p>
        <p>
          <strong>Grievance Officer</strong><br />
          {siteConfig.name}<br />
          Email: <a href={`mailto:${siteConfig.email}`} className="text-navy-600 hover:underline">{siteConfig.email}</a>
        </p>
        <p>
          We will acknowledge complaints within seven (7) working days and respond substantively within
          thirty (30) days.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy-900">12. Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Material changes will be notified by
          email (to subscribers) and a prominent notice on the site for at least thirty (30) days. The
          &ldquo;Last updated&rdquo; date at the top of this page reflects the most recent change.
        </p>

        <p className="mt-10 text-xs text-gray-500">
          This document is provided as a good-faith template aligned with DPDP Act, 2023 requirements
          and is not a substitute for independent legal advice. Please consult qualified counsel before
          public launch.
        </p>
      </article>
    </div>
  );
}
