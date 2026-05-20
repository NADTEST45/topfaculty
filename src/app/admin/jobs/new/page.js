'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories, getDesignations, getStates } from '@/lib/data';

export default function NewJobPage() {
  const [categories, setCategories] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [states, setStates] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    title: '',
    institution: '',
    city: '',
    state: '',
    category: '',
    designation: '',
    type: 'regular',
    description: '',
    qualifications: '',
    salary: '',
    experience: '',
    vacancies: '',
    deadline: '',
    contactEmail: '',
    contactPhone: '',
    contactWebsite: '',
    featured: false,
  });

  useEffect(() => {
    setCategories(getCategories());
    setDesignations(getDesignations());
    setStates(getStates());
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-navy-700 text-white shadow-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <nav className="text-sm text-navy-200 mb-2 flex items-center gap-1">
            <Link href="/admin" className="hover:text-white transition">
              Admin
            </Link>
            <span>/</span>
            <span className="text-white">Post New Job</span>
          </nav>
          <h1 className="text-2xl font-bold">Post New Job</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {submitted && (
          <div className="mb-6 bg-green-50 border border-green-300 text-green-800 rounded-xl px-6 py-4 flex items-center justify-between">
            <div>
              <p className="font-semibold">Job posted successfully!</p>
              <p className="text-sm mt-0.5">
                &ldquo;{form.title || 'Untitled Job'}&rdquo; has been saved.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({
                    title: '', institution: '', city: '', state: '', category: '',
                    designation: '', type: 'regular', description: '', qualifications: '',
                    salary: '', experience: '', vacancies: '', deadline: '',
                    contactEmail: '', contactPhone: '', contactWebsite: '', featured: false,
                  });
                }}
                className="text-sm font-medium text-green-700 hover:underline"
              >
                Post Another
              </button>
              <Link
                href="/admin"
                className="text-sm font-medium text-green-700 hover:underline"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Section: Basic Info */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800">Job Details</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            {/* Title - full width */}
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Assistant Professor in Computer Science"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none transition"
              />
            </div>

            {/* Institution */}
            <div>
              <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">
                Institution <span className="text-red-500">*</span>
              </label>
              <input
                id="institution"
                name="institution"
                type="text"
                required
                value={form.institution}
                onChange={handleChange}
                placeholder="College or University name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none transition"
              />
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <input
                id="city"
                name="city"
                type="text"
                required
                value={form.city}
                onChange={handleChange}
                placeholder="City name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none transition"
              />
            </div>

            {/* State */}
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <select
                id="state"
                name="state"
                required
                value={form.state}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none transition bg-white"
              >
                <option value="">Select State</option>
                {states.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                required
                value={form.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none transition bg-white"
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Designation */}
            <div>
              <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">
                Designation <span className="text-red-500">*</span>
              </label>
              <select
                id="designation"
                name="designation"
                required
                value={form.designation}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none transition bg-white"
              >
                <option value="">Select Designation</option>
                {designations.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Type <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="regular"
                    checked={form.type === 'regular'}
                    onChange={handleChange}
                    className="accent-navy-700"
                  />
                  <span className="text-sm text-gray-700">Regular</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="walk-in"
                    checked={form.type === 'walk-in'}
                    onChange={handleChange}
                    className="accent-navy-700"
                  />
                  <span className="text-sm text-gray-700">Walk-in</span>
                </label>
              </div>
            </div>

            {/* Description - full width */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={form.description}
                onChange={handleChange}
                placeholder="Detailed job description..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none transition resize-y"
              />
            </div>

            {/* Qualifications - full width */}
            <div className="md:col-span-2">
              <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700 mb-1">
                Qualifications <span className="text-red-500">*</span>
              </label>
              <textarea
                id="qualifications"
                name="qualifications"
                required
                rows={3}
                value={form.qualifications}
                onChange={handleChange}
                placeholder="Required qualifications and eligibility criteria..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none transition resize-y"
              />
            </div>

            {/* Salary */}
            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                Salary
              </label>
              <input
                id="salary"
                name="salary"
                type="text"
                value={form.salary}
                onChange={handleChange}
                placeholder="e.g. As per UGC norms"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none transition"
              />
            </div>

            {/* Experience */}
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                Experience
              </label>
              <input
                id="experience"
                name="experience"
                type="text"
                value={form.experience}
                onChange={handleChange}
                placeholder="e.g. 3-8 years"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none transition"
              />
            </div>

            {/* Vacancies */}
            <div>
              <label htmlFor="vacancies" className="block text-sm font-medium text-gray-700 mb-1">
                Vacancies
              </label>
              <input
                id="vacancies"
                name="vacancies"
                type="number"
                min="1"
                value={form.vacancies}
                onChange={handleChange}
                placeholder="Number of positions"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none transition"
              />
            </div>

            {/* Deadline */}
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                Application Deadline <span className="text-red-500">*</span>
              </label>
              <input
                id="deadline"
                name="deadline"
                type="date"
                required
                value={form.deadline}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none transition"
              />
            </div>
          </div>

          {/* Section: Contact Info */}
          <div className="px-6 py-4 bg-gray-50 border-t border-b border-gray-200">
            <h2 className="font-semibold text-gray-800">Contact Information</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            {/* Contact Email */}
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Email <span className="text-red-500">*</span>
              </label>
              <input
                id="contactEmail"
                name="contactEmail"
                type="email"
                required
                value={form.contactEmail}
                onChange={handleChange}
                placeholder="hr@college.edu.in"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none transition"
              />
            </div>

            {/* Contact Phone */}
            <div>
              <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Phone
              </label>
              <input
                id="contactPhone"
                name="contactPhone"
                type="tel"
                value={form.contactPhone}
                onChange={handleChange}
                placeholder="Phone number"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none transition"
              />
            </div>

            {/* Contact Website */}
            <div>
              <label htmlFor="contactWebsite" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Website
              </label>
              <input
                id="contactWebsite"
                name="contactWebsite"
                type="url"
                value={form.contactWebsite}
                onChange={handleChange}
                placeholder="https://www.college.edu.in"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none transition"
              />
            </div>

            {/* Featured Checkbox */}
            <div className="flex items-center pt-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-300 accent-accent-500"
                />
                <div>
                  <span className="text-sm font-medium text-gray-700">Mark as Featured</span>
                  <p className="text-xs text-gray-500">Featured jobs appear in the highlighted section</p>
                </div>
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
            <Link
              href="/admin"
              className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-semibold text-white bg-accent-500 hover:bg-accent-600 rounded-lg shadow transition"
            >
              Post Job
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
