import { getCategories, getJobs } from '@/lib/data';
import { absoluteUrl } from '@/lib/site';

export default function sitemap() {
  const routes = [
    '',
    '/jobs',
    '/search',
    '/fdp',
    '/network',
    '/reviews',
    '/services',
    '/register/candidate',
    '/register/college',
    '/about',
    '/contact',
    '/admin/jobs/new',
  ].map((route) => ({
    url: absoluteUrl(route || '/'),
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/jobs' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.7,
  }));

  const jobRoutes = getJobs().map((job) => ({
    url: absoluteUrl(`/jobs/${job.id}`),
    lastModified: new Date(job.postedDate),
    changeFrequency: 'weekly',
    priority: job.featured ? 0.9 : 0.8,
  }));

  const categoryRoutes = getCategories().map((category) => ({
    url: absoluteUrl(`/category/${category.slug}`),
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  return [...routes, ...jobRoutes, ...categoryRoutes];
}
