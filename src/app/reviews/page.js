'use client';

import { useState } from 'react';
import Link from 'next/link';

const ratingFields = [
  'Teaching quality',
  'Salary range',
  'Working environment',
  'Benefits',
  'Placements',
  'Career growth',
  'Overall rating',
];

const sampleReviews = [
  {
    institution: 'New Horizon College of Engineering',
    relation: 'Former faculty',
    summary: 'Strong academic systems and structured department reviews.',
    overall: 4.2,
  },
  {
    institution: 'Christ University',
    relation: 'Current faculty',
    summary: 'Good student quality, active research expectations, and clear processes.',
    overall: 4.4,
  },
  {
    institution: 'Sri Ramachandra Institute of Higher Education',
    relation: 'Related professional',
    summary: 'Professional environment with strong clinical and academic exposure.',
    overall: 4.1,
  },
];

export default function ReviewsPage() {
  const [anonymous, setAnonymous] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    const payload = Object.fromEntries(new FormData(event.currentTarget));
    payload.anonymous = anonymous;

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        const firstError = result.errors ? Object.values(result.errors)[0] : result.error;
        throw new Error(firstError || 'Unable to save review.');
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
        <span className="text-navy-800 font-medium">Reviews</span>
      </nav>

      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-wide text-accent-600">Institution reviews</p>
        <h1 className="text-2xl font-bold text-navy-800 mt-1">Review colleges and workplaces</h1>
        <p className="text-sm text-gray-600 mt-2 max-w-3xl">
          Reviews are intended for people related to the organization, with anonymous submission support and admin moderation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {submitted && (
            <div className="mb-6 border border-green-300 bg-green-50 text-green-800 rounded-lg px-5 py-4">
              <p className="font-semibold">Review saved for moderation.</p>
              <p className="text-sm mt-1">Anonymous mode is {anonymous ? 'enabled' : 'disabled'} for this submission.</p>
            </div>
          )}

          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h2 className="font-semibold text-gray-800">Review form</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                <input id="institution" name="institution" required placeholder="College or university name" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500" />
              </div>
              <div>
                <label htmlFor="relation" className="block text-sm font-medium text-gray-700 mb-1">Your relationship</label>
                <select id="relation" name="relation" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-navy-500">
                  <option value="">Select relationship</option>
                  <option>Current faculty</option>
                  <option>Former faculty</option>
                  <option>Current staff</option>
                  <option>Former staff</option>
                  <option>Research scholar</option>
                  <option>Placement partner</option>
                </select>
              </div>

              {ratingFields.map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">{field}</label>
                  <select id={field} name={field} required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-navy-500">
                    <option value="">Rate</option>
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Good</option>
                    <option value="3">3 - Average</option>
                    <option value="2">2 - Needs improvement</option>
                    <option value="1">1 - Poor</option>
                  </select>
                </div>
              ))}

              <div>
                <label className="flex items-center gap-3 pt-7 cursor-pointer">
                  <input type="checkbox" checked={anonymous} onChange={(event) => setAnonymous(event.target.checked)} className="h-5 w-5 accent-accent-500" />
                  <span className="text-sm font-medium text-gray-700">Submit anonymously</span>
                </label>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="pros" className="block text-sm font-medium text-gray-700 mb-1">Pros</label>
                <textarea id="pros" name="pros" rows={3} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500 resize-y" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="cons" className="block text-sm font-medium text-gray-700 mb-1">Cons</label>
                <textarea id="cons" name="cons" rows={3} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-500 resize-y" />
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
              <p className="text-xs text-gray-500">Only related users should submit reviews. Admin moderation is required before publishing.</p>
              <button type="submit" disabled={submitting} className="px-6 py-2.5 text-sm font-semibold text-white bg-accent-500 hover:bg-accent-600 disabled:opacity-60 rounded-lg">
                {submitting ? 'Saving...' : 'Submit review'}
              </button>
            </div>
          </form>
        </div>

        <aside className="space-y-6">
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-sm font-bold uppercase tracking-wide text-navy-800 border-b pb-2 mb-4">Recent review examples</h2>
            <div className="space-y-4">
              {sampleReviews.map((review) => (
                <article key={review.institution} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-semibold text-navy-800">{review.institution}</h3>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">{review.overall}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{review.relation}</p>
                  <p className="text-sm text-gray-600 mt-2">{review.summary}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-sm font-bold uppercase tracking-wide text-navy-800 border-b pb-2 mb-4">Review categories</h2>
            <div className="flex flex-wrap gap-2">
              {[...ratingFields, 'Pros / cons'].map((field) => (
                <span key={field} className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded">{field}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
