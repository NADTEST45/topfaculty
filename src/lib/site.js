export const siteConfig = {
  name: 'TopFaculty',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://topfaculty.com',
  email: 'info@topfaculty.com',
  phone: '+91-XXXX-XXXXXX',
  description:
    "India's academic career platform for faculty jobs, FDPs, research roles, and institution recruitment.",
  social: {
    linkedin: 'https://www.linkedin.com/company/topfaculty',
    twitter: 'https://twitter.com/topfaculty',
    telegram: 'https://t.me/topfaculty',
    youtube: 'https://www.youtube.com/@topfaculty',
  },
};

export const employerPackages = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Post one verified academic opening and receive email applications.',
    features: ['1 active job', 'Email applications', '7-day listing'],
  },
  {
    name: 'Featured',
    price: '₹2,999',
    description: 'Boost urgent faculty hiring with homepage placement and alerts.',
    features: ['Homepage feature', 'Job alert push', '30-day listing'],
    highlighted: true,
  },
  {
    name: 'Institution',
    price: 'Custom',
    description: 'High-volume hiring support for colleges, universities, and groups.',
    features: ['Bulk postings', 'Dedicated support', 'Recruitment analytics'],
  },
];

export function absoluteUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}
