'use client';

import { useState } from 'react';

export default function NewsletterForm({ compact = false, className = '' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Unable to subscribe right now.');
      }

      setStatus('success');
      setMessage(result.message || 'You are subscribed to faculty job alerts.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className={compact ? 'flex' : 'space-y-2'}>
        <label className="sr-only" htmlFor={compact ? 'footer-email' : 'newsletter-email'}>
          Email address
        </label>
        <input
          id={compact ? 'footer-email' : 'newsletter-email'}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
          className={compact
            ? 'min-w-0 flex-1 rounded-l px-3 py-2 text-sm text-gray-900 outline-none'
            : 'w-full rounded-lg px-3 py-2 text-sm text-gray-900 outline-none ring-1 ring-white/30 focus:ring-2 focus:ring-white'}
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={compact
            ? 'rounded-r bg-accent-500 px-3 py-2 text-sm font-semibold text-white hover:bg-accent-600 disabled:opacity-60'
            : 'w-full rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-800 disabled:opacity-60'}
        >
          {status === 'loading' ? 'Joining...' : compact ? 'Subscribe' : 'Get Alerts'}
        </button>
      </div>
      {message && (
        <p className={`mt-2 text-xs ${status === 'success' ? 'text-green-100' : compact ? 'text-red-300' : 'text-white'}`}>
          {message}
        </p>
      )}
    </form>
  );
}
