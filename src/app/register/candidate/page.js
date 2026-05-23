'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getStates } from '@/lib/data';

const profileFields = [
  'Personal details',
  'Preferred location',
  'Education details',
  'Work experience',
  'Research interests',
  'Certifications',
  'Scholar IDs',
  'Resume upload',
  'Social links',
];

export default function CandidateRegistrationPage() {
  const states = getStates();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    preferredLocation: '',
    education: '',
    experience: '',
    researchArea: '',
    certifications: '',
    scopusId: '',
    googleScholarId: '',
    socialLinks: '',
    visibility: 'standard',
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
      const response = await fetch('/api/candidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!response.ok) {
        const firstError = result.errors ? Object.values(result.errors)[0] : result.error;
        throw new Error(firstError || 'Unable to save candidate profile.');
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
        <span className="text-navy-800 font-medium">Candidate Registration</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-wide text-accent-600">Faculty profile</p>
            <h1 className="text-2xl font-bold text-navy-800 mt-1">Create candidate account</h1>
            <p className="text-sm text-gray-600 mt-2">
              Build a searchable academic profile for faculty jobs, scholar networking, reviews, and college discovery.
            </p>
          </div>

          {submitted && (
            <div className="mb-6 border border-green-300 bg-green-50 text-green-800 rounded-lg px-5 py-4">
              <p className="font-semibold">Candidate profile saved.</p>
              <p className="text-sm mt-1">Next step: OTP verification for {form.phone || 'the registered mobile number'}.</p>
            </div>
          )}

          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h2 className="font-semibold text-gray-800">Signup details</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input id="name" name="name" required value={form.name} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} placeholder="OTP based signup" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500" />
              </div>
              <div>
                <label htmlFor="preferredLocation" className="block text-sm font-medium text-gray-700 mb-1">Preferred location</label>
                <select id="preferredLocation" name="preferredLocation" value={form.preferredLocation} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-navy-500">
                  <option value="">Select location</option>
                  {states.map((state) => <option key={state} value={state}>{state}</option>)}
                </select>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-b">
              <h2 className="font-semibold text-gray-800">Academic profile</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">Education details</label>
                <input id="education" name="education" value={form.education} onChange={handleChange} placeholder="Ph.D., M.Tech, NET/SET" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500" />
              </div>
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Work experience</label>
                <input id="experience" name="experience" value={form.experience} onChange={handleChange} placeholder="e.g. 8 years" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500" />
              </div>
              <div>
                <label htmlFor="researchArea" className="block text-sm font-medium text-gray-700 mb-1">Research / teaching area</label>
                <input id="researchArea" name="researchArea" value={form.researchArea} onChange={handleChange} placeholder="AI, VLSI, Finance, Nursing..." className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500" />
              </div>
              <div>
                <label htmlFor="certifications" className="block text-sm font-medium text-gray-700 mb-1">Certifications</label>
                <input id="certifications" name="certifications" value={form.certifications} onChange={handleChange} placeholder="NET, SET, FDP, industry certs" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500" />
              </div>
              <div>
                <label htmlFor="scopusId" className="block text-sm font-medium text-gray-700 mb-1">Scopus / SCI ID</label>
                <input id="scopusId" name="scopusId" value={form.scopusId} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500" />
              </div>
              <div>
                <label htmlFor="googleScholarId" className="block text-sm font-medium text-gray-700 mb-1">Google Scholar ID</label>
                <input id="googleScholarId" name="googleScholarId" value={form.googleScholarId} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500" />
              </div>
              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">Resume upload</label>
                <input id="resume" name="resume" type="file" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white file:mr-3 file:border-0 file:bg-navy-50 file:text-navy-700 file:px-3 file:py-1 file:rounded" />
              </div>
              <div>
                <label htmlFor="visibility" className="block text-sm font-medium text-gray-700 mb-1">Profile visibility</label>
                <select id="visibility" name="visibility" value={form.visibility} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-navy-500">
                  <option value="standard">Standard visibility</option>
                  <option value="premium">Premium recruiter visibility</option>
                  <option value="private">Private until I apply</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="socialLinks" className="block text-sm font-medium text-gray-700 mb-1">Social network links</label>
                <textarea id="socialLinks" name="socialLinks" rows={3} value={form.socialLinks} onChange={handleChange} placeholder="LinkedIn, ORCID, personal website, portfolio links" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500 resize-y" />
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Link href="/jobs" className="px-5 py-2.5 text-sm text-center font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">Browse jobs</Link>
              <button type="submit" disabled={submitting} className="px-6 py-2.5 text-sm font-semibold text-white bg-accent-500 hover:bg-accent-600 disabled:opacity-60 rounded-lg">
                {submitting ? 'Saving...' : 'Create profile'}
              </button>
            </div>
          </form>
        </div>

        <aside className="space-y-6">
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-sm font-bold uppercase tracking-wide text-navy-800 border-b pb-2 mb-4">Profile checklist</h2>
            <div className="space-y-3">
              {profileFields.map((field) => (
                <div key={field} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="h-5 w-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-[10px] font-bold">OK</span>
                  <span>{field}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-navy-800 rounded-lg shadow p-5 text-white">
            <h2 className="font-bold">Scholar network access</h2>
            <p className="text-sm text-navy-100 mt-2">After verification, candidates can add connections, join groups, publish posts, and follow colleges.</p>
            <Link href="/network" className="inline-block mt-4 bg-white text-navy-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-navy-50">View network</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
