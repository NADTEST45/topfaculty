'use client';

import { useState } from 'react';
import Link from 'next/link';

const services = [
  {
    id: 'quality',
    title: 'Quality Improvement',
    label: 'OTP contact reveal',
    description: 'Capture verified contact details before showing TopFaculty quality improvement contact information.',
    inputs: ['Contact person', 'Email ID', 'Mobile number', 'OTP verification'],
  },
  {
    id: 'branding',
    title: 'Branding / Publicity',
    label: 'Campaign desk',
    description: 'Collect admissions, publicity, photos, videos, YouTube links, SMS, email, and digital marketing requests.',
    inputs: ['Institution info', 'Photos', 'Videos', 'SMS / email', 'Digital marketing'],
  },
  {
    id: 'recruitment',
    title: 'Recruitment Consultancy',
    label: 'Hiring support',
    description: 'Handle college requests for candidate sourcing, screening, vacancy promotion, and recruitment consulting.',
    inputs: ['Recruitment form', 'Job details', 'Candidate profile', 'Timeline'],
  },
  {
    id: 'classes',
    title: 'Online Classes / Video',
    label: 'Learning media',
    description: 'Collect interest for online classes, FDP content, workshops, and recorded academic video programs.',
    inputs: ['Program title', 'Audience', 'Mode', 'Video links'],
  },
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(services[0].id);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const service = services.find((item) => item.id === activeService);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    const payload = Object.fromEntries(new FormData(event.currentTarget));
    payload.serviceType = activeService;

    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        const firstError = result.errors ? Object.values(result.errors)[0] : result.error;
        throw new Error(firstError || 'Unable to save service request.');
      }

      setSubmitted(true);
      event.currentTarget.reset();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-navy-600">Home</Link>
        <span>/</span>
        <span className="text-navy-800 font-medium">Premium Services</span>
      </nav>

      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-wide text-accent-600">Paid and request-based services</p>
        <h1 className="text-2xl font-bold text-navy-800 mt-1">Premium services desk</h1>
        <p className="text-sm text-gray-600 mt-2 max-w-3xl">
          One intake area for quality improvement, branding, publicity, recruitment consultancy, and online program requests.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-3">
          {services.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => {
                setActiveService(item.id);
                setSubmitted(false);
              }}
              className={`w-full text-left rounded-lg border p-4 transition ${
                activeService === item.id
                  ? 'border-accent-500 bg-accent-50 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-navy-200'
              }`}
            >
              <span className="text-[11px] font-bold uppercase tracking-wide text-gray-500">{item.label}</span>
              <h2 className="font-semibold text-navy-800 mt-1">{item.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2">
          {submitted && (
            <div className="mb-6 border border-green-300 bg-green-50 text-green-800 rounded-lg px-5 py-4">
              <p className="font-semibold">{service.title} request saved.</p>
              <p className="text-sm mt-1">The admin team can review this lead from the test backend.</p>
            </div>
          )}

          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h2 className="font-semibold text-gray-800">{service.title} request form</h2>
                <p className="text-xs text-gray-500 mt-1">Fields are based on the portal planning notes.</p>
              </div>
              <span className="text-xs font-bold uppercase tracking-wide text-accent-600">{service.label}</span>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">Institution / organization</label>
                <input id="institution" name="institution" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500" />
              </div>
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">Contact person</label>
                <input id="contact" name="contact" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
                <input id="email" name="email" type="email" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500" />
              </div>
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile number</label>
                <input id="mobile" name="mobile" type="tel" required placeholder="OTP verification" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="requirement" className="block text-sm font-medium text-gray-700 mb-1">Requirement</label>
                <textarea id="requirement" name="requirement" rows={4} required placeholder="Describe the service need, campaign, hiring request, or program details." className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500 resize-y" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="assets" className="block text-sm font-medium text-gray-700 mb-1">Reference links / media</label>
                <textarea id="assets" name="assets" rows={3} placeholder="Website, YouTube links, Drive links, creative references, job links" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500 resize-y" />
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {service.inputs.map((input) => (
                  <span key={input} className="bg-white border border-gray-200 text-gray-600 text-xs px-2.5 py-1 rounded">{input}</span>
                ))}
              </div>
              <button type="submit" disabled={submitting} className="px-6 py-2.5 text-sm font-semibold text-white bg-accent-500 hover:bg-accent-600 disabled:opacity-60 rounded-lg">
                {submitting ? 'Saving...' : 'Submit request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
