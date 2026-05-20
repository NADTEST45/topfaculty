import Link from 'next/link';
import { getDesignations, getStates } from '@/lib/data';
export default function Sidebar() {
  const designations = getDesignations();
  const states = getStates();
  return (
    <aside className="space-y-6">
      <div className="bg-white rounded-lg shadow p-5">
        <h3 className="font-bold text-navy-800 mb-3 text-sm uppercase tracking-wide border-b pb-2">Jobs By Designation</h3>
        {designations.map(d => (
          <Link key={d} href={`/search?designation=${encodeURIComponent(d)}`} className="block py-1.5 text-sm text-gray-700 hover:text-navy-600 hover:pl-1 transition-all border-b border-gray-50">{d} Jobs</Link>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow p-5">
        <h3 className="font-bold text-navy-800 mb-3 text-sm uppercase tracking-wide border-b pb-2">Jobs By State</h3>
        {states.slice(0,10).map(s => (
          <Link key={s} href={`/search?state=${encodeURIComponent(s)}`} className="block py-1.5 text-sm text-gray-700 hover:text-navy-600 hover:pl-1 transition-all border-b border-gray-50">{s}</Link>
        ))}
      </div>
      <div className="bg-accent-500 rounded-lg shadow p-5 text-center text-white">
        <h3 className="font-bold mb-2">Subscribe to Alerts</h3>
        <p className="text-sm mb-3 opacity-90">Get latest faculty jobs delivered to your inbox</p>
        <input placeholder="Your email" className="w-full px-3 py-2 rounded text-sm text-gray-800 mb-2" />
        <button className="w-full bg-navy-800 text-white py-2 rounded text-sm font-semibold hover:bg-navy-900">Subscribe Free</button>
      </div>
    </aside>
  );
}
