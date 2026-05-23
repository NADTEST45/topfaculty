'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        const firstError = result.errors ? Object.values(result.errors)[0] : result.error;
        throw new Error(firstError || 'Unable to send your message right now.');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: '✉️',
      title: 'Email',
      value: 'info@topfaculty.com',
      href: 'mailto:info@topfaculty.com',
    },
    {
      icon: '📞',
      title: 'Phone',
      value: '+91-XXXX-XXXXXX',
      href: 'tel:+91XXXXXXXXXX',
    },
    {
      icon: '📍',
      title: 'Address',
      value: 'Hyderabad, Telangana, India',
      href: null,
    },
  ];

  const subjects = [
    'General Inquiry',
    'Job Posting',
    'Partnership',
    'Technical Support',
    'Feedback',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-navy-600 transition-colors">Home</Link>
        <span className="mx-2">›</span>
        <span className="text-navy-800 font-medium">Contact Us</span>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-r from-navy-800 to-navy-600 rounded-xl p-8 md:p-12 mb-10 text-white text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Contact Us</h1>
        <p className="text-navy-100 max-w-2xl mx-auto text-base md:text-lg">
          Have questions or feedback? We&apos;d love to hear from you. Reach out and our team will get back to you shortly.
        </p>
      </section>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6 md:p-8">
          <h2 className="text-xl font-bold text-navy-800 mb-6">Send Us a Message</h2>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <span className="text-4xl block mb-3">✅</span>
              <h3 className="text-lg font-bold text-green-800 mb-2">Message Sent Successfully!</h3>
              <p className="text-green-700 text-sm mb-4">
                Thank you for reaching out, {form.name}. We&apos;ll get back to you at {form.email} within 24-48 hours.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                className="text-navy-600 hover:text-navy-800 font-medium text-sm underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Dr. John Doe"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@university.edu"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject <span className="text-red-500">*</span></label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-colors text-gray-800"
                >
                  <option value="">Select a subject</option>
                  {subjects.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message <span className="text-red-500">*</span></label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-colors resize-vertical"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-accent-500 hover:bg-accent-600 disabled:opacity-60 text-white px-8 py-3 rounded-lg font-semibold text-sm transition-colors w-full sm:w-auto"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>

        {/* Contact Info Sidebar */}
        <div className="space-y-5">
          {contactInfo.map((item) => (
            <div key={item.title} className="bg-white rounded-xl shadow p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-navy-700 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-lg">{item.icon}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-navy-800 mb-1">{item.title}</h3>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-navy-600 hover:underline">{item.value}</a>
                  ) : (
                    <p className="text-sm text-gray-600">{item.value}</p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Office Hours */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-accent-600 rounded-full flex items-center justify-center shrink-0">
                <span className="text-lg">🕐</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-navy-800 mb-1">Office Hours</h3>
                <p className="text-sm text-gray-600">Monday – Friday</p>
                <p className="text-sm text-gray-600">9:00 AM – 6:00 PM IST</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-navy-800 rounded-xl p-6 text-white">
            <h3 className="font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/jobs" className="text-navy-100 hover:text-white transition-colors">Browse Jobs →</Link></li>
              <li><Link href="/about" className="text-navy-100 hover:text-white transition-colors">About Us →</Link></li>
              <li><Link href="/fdp" className="text-navy-100 hover:text-white transition-colors">FDPs & Conferences →</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
