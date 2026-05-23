import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { absoluteUrl, siteConfig } from '@/lib/site';

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'TopFaculty - Faculty Recruitment 2026 | Teaching Jobs India',
    template: '%s | TopFaculty',
  },
  description: siteConfig.description,
  keywords: ['faculty jobs', 'assistant professor jobs', 'academic jobs India', 'teaching jobs', 'FDP', 'research jobs'],
  openGraph: {
    title: 'TopFaculty - Academic Jobs and Faculty Recruitment',
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TopFaculty - Academic Jobs and Faculty Recruitment',
    description: siteConfig.description,
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    sameAs: Object.values(siteConfig.social),
  };

  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
