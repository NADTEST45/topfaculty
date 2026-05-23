import Link from 'next/link';
import NewsletterForm from './NewsletterForm';
import { siteConfig } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-accent-500 rounded-full flex items-center justify-center"><span className="text-white font-bold">TF</span></div>
              <span className="text-xl font-bold">TopFaculty</span>
            </div>
            <p className="text-gray-400 text-sm">India's leading platform for academic faculty recruitment, connecting educators with institutions since 2013.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-accent-500">Job Categories</h3>
            {['Engineering','Arts and Science','Research Jobs','Nursing','Polytechnic','School Jobs'].map(c => (
              <Link key={c} href={`/category/${c.toLowerCase().replace(/ /g,'-')}`} className="block text-gray-400 text-sm py-1 hover:text-white">{c}</Link>
            ))}
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-accent-500">By Designation</h3>
            {['Professor','Associate Professor','Assistant Professor','HOD','Dean','Principal'].map(d => (
              <Link key={d} href={`/search?designation=${encodeURIComponent(d)}`} className="block text-gray-400 text-sm py-1 hover:text-white">{d} Jobs</Link>
            ))}
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-accent-500">Quick Links</h3>
            <Link href="/about" className="block text-gray-400 text-sm py-1 hover:text-white">About Us</Link>
            <Link href="/contact" className="block text-gray-400 text-sm py-1 hover:text-white">Contact Us</Link>
            <Link href="/fdp" className="block text-gray-400 text-sm py-1 hover:text-white">FDPs & Conferences</Link>
            <Link href="/admin" className="block text-gray-400 text-sm py-1 hover:text-white">Post Recruitment</Link>
            <h3 className="font-semibold mt-4 mb-2 text-accent-500">Stay Updated</h3>
            <NewsletterForm compact />
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
          <p>© 2026 TopFaculty.com. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link href="/about" className="hover:text-white">Privacy Policy</Link>
            <Link href="/about" className="hover:text-white">Terms</Link>
            <Link href="/about" className="hover:text-white">Disclaimer</Link>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-white">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
