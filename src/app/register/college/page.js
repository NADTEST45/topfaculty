'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getCategories, getStates } from '@/lib/data';

const registrationSections = [
  'Establishment details',
  'Affiliation and accreditation',
  'Address and campus information',
  'Courses and programs',
  'Departments and strengths',
  'Placement and average package',
  'Authorized contact verification',
];

export default function CollegeRegistrationPage() {
  const categories = getCategories();
  const states = getStates();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    collegeName: '',
    email: '',
    website: '',
    authorizedPerson: '',
    mobile: '',
    established: '',
    affiliation: '',
    accreditation: '',
    state: '',
    address: '',
    courses: '',
    departments: '',
    strength: '',
    placements: '',
    package: '',
    hiringCategory: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/colleges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!response.ok) {
        const firstError = result.errors ? Object.values(result.errors)[0] : result.error;
        throw new Error(firstError || 'Unable to save institution profile.');
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <span className="text-navy-800 font-medium">College Registration</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-wide text-accent-600">Institution account</p>
            <h1 className="text-2xl font-bold text-navy-800 mt-1">Register college or university</h1>
            <p className="text-sm text-gray-600 mt-2">
              Create an institution profile for posting vacancies, searching candidates, reviews, and premium recruitment services.
            </p>
          </div>

          {submitted && (
            <div className="mb-6 border border-green-300 bg-green-50 text-green-800 rounded-lg px-5 py-4">
              <p className="font-semibold">Institution registration saved.</p>
              <p className="text-sm mt-1">Next step: verify {form.authorizedPerson || 'the authorized person'} by email and phone OTP.</p>
            </div>
          )}

          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h2 className="font-semibold text-gray-800">Authorized signup</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700 mb-1">College name</label>
                <input id="collegeName" name="collegeName" required value={form.collegeName} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Official email</label>
                <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500" />
              </div>
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input id="website" name="website" type="url" value={form.website} onChange={handleChange} placeholder="https://www.college.edu.in" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500" />
              </div>
              <div>
                <label htmlFor="authorizedPerson" className="block text-sm font-medium text-gray-700 mb-1">Authorized person</label>
                <input id="authorizedPerson" name="authorizedPerson" required value={form.authorizedPerson} onChange={handleChange} placeholder="Name and designation" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500" />
              </div>
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile number</label>
                <input id="mobile" name="mobile" type="tel" required value={form.mobile} onChange={handleChange} placeholder="Phone OTP login" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500" />
              </div>
              <div>
                <label htmlFor="hiringCategory" className="block text-sm font-medium text-gray-700 mb-1">Primary hiring category</label>
                <select id="hiringCategory" name="hiringCategory" value={form.hiringCategory} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-navy-500">
                  <option value="">Select category</option>
                  {categories.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}
                </select>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-b">
              <h2 className="font-semibold text-gray-800">College details</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="established" className="block text-sm font-medium text-gray-700 mb-1">Established year</label>
                <input id="established" name="established" value={form.established} onChange={handleChange} placeholder="e.g. 2008" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500" />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <select id="state" name="state" value={form.state} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-navy-500">
                  <option value="">Select state</option>
                  {states.map((state) => <option key={state} value={state}>{state}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="affiliation" className="block text-sm font-medium text-gray-700 mb-1">Affiliation</label>
                <input id="affiliation" name="affiliation" value={form.affiliation} onChange={handleChange} placeholder="University / board" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500" />
              </div>
              <div>
                <label htmlFor="accreditation" className="block text-sm font-medium text-gray-700 mb-1">Accreditation</label>
                <input id="accreditation" name="accreditation" value={form.accreditation} onChange={handleChange} placeholder="NAAC, NBA, AICTE, UGC..." className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea id="address" name="address" rows={2} value={form.address} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500 resize-y" />
              </div>
              <div>
                <label htmlFor="courses" className="block text-sm font-medium text-gray-700 mb-1">Courses and programs</label>
                <textarea id="courses" name="courses" rows={3} value={form.courses} onChange={handleChange} placeholder="B.Tech, MBA, Nursing, Pharmacy..." className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500 resize-y" />
              </div>
              <div>
                <label htmlFor="departments" className="block text-sm font-medium text-gray-700 mb-1">Departments</label>
                <textarea id="departments" name="departments" rows={3} value={form.departments} onChange={handleChange} placeholder="CSE, ECE, English, Commerce..." className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500 resize-y" />
              </div>
              <div>
                <label htmlFor="strength" className="block text-sm font-medium text-gray-700 mb-1">Institution strength</label>
                <input id="strength" name="strength" value={form.strength} onChange={handleChange} placeholder="Faculty and student strength" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500" />
              </div>
              <div>
                <label htmlFor="package" className="block text-sm font-medium text-gray-700 mb-1">Average package</label>
                <input id="package" name="package" value={form.package} onChange={handleChange} placeholder="Placement package, if applicable" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="placements" className="block text-sm font-medium text-gray-700 mb-1">Placement details and achievements</label>
                <textarea id="placements" name="placements" rows={3} value={form.placements} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500 resize-y" />
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Link href="/admin/jobs/new" className="px-5 py-2.5 text-sm text-center font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">Post vacancy</Link>
              <button type="submit" disabled={submitting} className="px-6 py-2.5 text-sm font-semibold text-white bg-accent-500 hover:bg-accent-600 disabled:opacity-60 rounded-lg">
                {submitting ? 'Saving...' : 'Register institution'}
              </button>
            </div>
          </form>
        </div>

        <aside className="space-y-6">
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-sm font-bold uppercase tracking-wide text-navy-800 border-b pb-2 mb-4">Registration scope</h2>
            <div className="space-y-3">
              {registrationSections.map((section) => (
                <div key={section} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="h-5 w-5 rounded-full bg-navy-50 text-navy-700 flex items-center justify-center text-xs font-bold">+</span>
                  <span>{section}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-accent-500 rounded-lg shadow p-5 text-white">
            <h2 className="font-bold">Need hiring support?</h2>
            <p className="text-sm mt-2 opacity-90">Request recruitment consultancy, candidate search, branding, or publicity support from the services desk.</p>
            <Link href="/services" className="inline-block mt-4 bg-white text-navy-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-navy-50">Open services</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
