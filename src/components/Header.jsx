'use client';
import Link from 'next/link';
import { useState } from 'react';
import { siteConfig } from '@/lib/site';

const navCategories = [
  { href: '/category/engineering', label: 'Engineering' },
  { href: '/category/polytechnic', label: 'Polytechnic' },
  { href: '/category/arts-and-science', label: 'Arts and Science' },
  { href: '/category/nursing', label: 'Nursing' },
  { href: '/category/research', label: 'Research Jobs' },
  { href: '/category/school', label: 'School Jobs' },
];

const platformLinks = [
  { href: '/jobs', label: 'All Jobs' },
  { href: '/network', label: 'Network' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/services', label: 'Services' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const socialLinks = [
    ['linkedin', siteConfig.social.linkedin],
    ['twitter', siteConfig.social.twitter],
    ['telegram', siteConfig.social.telegram],
    ['youtube', siteConfig.social.youtube],
  ];

  return (
    <header>
      {/* Top bar */}
      <div className="bg-gray-100 border-b text-xs">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex justify-between items-center">
          <div className="flex gap-4">
            <Link href="/" className="text-gray-600 hover:text-navy-800">Home</Link>
            <Link href="/about" className="text-gray-600 hover:text-navy-800">About Us</Link>
            <Link href="/contact" className="text-gray-600 hover:text-navy-800">Contact Us</Link>
            <Link href="/services" className="text-gray-600 hover:text-navy-800">Premium Services</Link>
          </div>
          <div className="flex gap-3">
            <Link href="/register/candidate" className="text-gray-500 hover:text-navy-700 text-[11px]">Candidate Signup</Link>
            <Link href="/register/college" className="text-gray-500 hover:text-navy-700 text-[11px]">College Signup</Link>
            {socialLinks.map(([s, href]) => (
              <a key={s} href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-navy-600 capitalize text-[11px]" aria-label={`TopFaculty on ${s}`}>{s[0].toUpperCase()}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Logo */}
      <div className="bg-white py-4 border-b">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-navy-800 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">TF</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-navy-800 leading-tight">TopFaculty</h1>
              <p className="text-xs text-gray-500 -mt-0.5">The Academic Professional Network</p>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-2">
            <Link href="/register/candidate" className="text-xs border border-navy-200 text-navy-700 px-4 py-2 rounded-lg hover:bg-navy-50 font-semibold">Join as Faculty</Link>
            <Link href="/register/college" className="text-xs bg-accent-500 text-white px-4 py-2 rounded-lg hover:bg-accent-600 font-semibold">College Portal</Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-navy-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="hidden md:flex">
              <Link href="/" className="text-white px-3 py-3 text-sm font-medium hover:bg-navy-700 border-b-2 border-transparent hover:border-accent-500 transition-all">HOME</Link>
              {platformLinks.map(c => (
                <Link key={c.href} href={c.href} className="text-white px-3 py-3 text-sm font-medium hover:bg-navy-700 border-b-2 border-transparent hover:border-accent-500 transition-all whitespace-nowrap">{c.label.toUpperCase()}</Link>
              ))}
              {navCategories.map(c => (
                <Link key={c.href} href={c.href} className="text-white px-3 py-3 text-sm font-medium hover:bg-navy-700 border-b-2 border-transparent hover:border-accent-500 transition-all whitespace-nowrap">{c.label.toUpperCase()}</Link>
              ))}
              <Link href="/admin/jobs/new" className="text-accent-500 px-3 py-3 text-sm font-medium hover:bg-navy-700 border-b-2 border-transparent hover:border-accent-500 transition-all whitespace-nowrap">POST</Link>
            </div>
            <div className="flex items-center gap-2 ml-auto py-2">
              {searchOpen ? (
                <form action="/search" className="flex">
                  <input name="q" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search jobs..." className="px-3 py-1.5 rounded-l text-sm w-48 focus:outline-none" autoFocus />
                  <button type="submit" className="bg-accent-500 text-white px-3 py-1.5 rounded-r text-sm">Go</button>
                </form>
              ) : (
                <button onClick={() => setSearchOpen(true)} className="text-white p-2 hover:bg-navy-700 rounded">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
              )}
              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
            </div>
          </div>
          {menuOpen && (
            <div className="md:hidden pb-3">
              <Link href="/" className="block text-white px-4 py-2 text-sm hover:bg-navy-700">Home</Link>
              {platformLinks.map(c => (
                <Link key={c.href} href={c.href} className="block text-white px-4 py-2 text-sm hover:bg-navy-700">{c.label}</Link>
              ))}
              {navCategories.map(c => (
                <Link key={c.href} href={c.href} className="block text-white px-4 py-2 text-sm hover:bg-navy-700">{c.label}</Link>
              ))}
              <Link href="/register/candidate" className="block text-white px-4 py-2 text-sm hover:bg-navy-700">Candidate Signup</Link>
              <Link href="/register/college" className="block text-white px-4 py-2 text-sm hover:bg-navy-700">College Signup</Link>
              <Link href="/admin/jobs/new" className="block text-accent-500 px-4 py-2 text-sm hover:bg-navy-700">Post Your Recruitment</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
