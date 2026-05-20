'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getJobs, getCategories, getFdpEvents } from '@/lib/data';

export default function AdminDashboard() {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [fdpEvents, setFdpEvents] = useState([]);

  useEffect(() => {
    setJobs(getJobs());
    setCategories(getCategories());
    setFdpEvents(getFdpEvents());
  }, []);

  const walkInCount = jobs.filter((j) => j.type === 'walk-in').length;
  const featuredCount = jobs.filter((j) => j.featured).length;

  const stats = [
    { label: 'Total Jobs', value: jobs.length, icon: '📋', bg: 'bg-navy-700' },
    { label: 'Walk-in Jobs', value: walkInCount, icon: '🚶', bg: 'bg-navy-500' },
    { label: 'Featured Jobs', value: featuredCount, icon: '⭐', bg: 'bg-accent-500' },
    { label: 'Categories', value: categories.length, icon: '📂', bg: 'bg-navy-600' },
    { label: 'FDP Events', value: fdpEvents.length, icon: '🎓', bg: 'bg-accent-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-navy-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-navy-100 text-sm mt-1">TopFaculty Management Panel</p>
          </div>
          <Link
            href="/"
            className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition"
          >
            View Site
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`${stat.bg} text-white rounded-xl p-5 shadow-md`}
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm opacity-90 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Link
            href="/admin/jobs/new"
            className="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-5 py-2.5 rounded-lg shadow transition"
          >
            + Post New Job
          </Link>
          <button className="bg-navy-700 hover:bg-navy-800 text-white font-semibold px-5 py-2.5 rounded-lg shadow transition">
            Manage FDPs
          </button>
          <button className="border border-navy-700 text-navy-700 hover:bg-navy-700 hover:text-white font-semibold px-5 py-2.5 rounded-lg transition">
            View Analytics
          </button>
        </div>

        {/* Recent Jobs Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Recent Jobs</h2>
            <span className="text-sm text-gray-500">{jobs.length} total</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-600 uppercase text-xs tracking-wider">
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Institution</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Deadline</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {jobs.map((job) => {
                  const cat = categories.find((c) => c.slug === job.category);
                  return (
                    <tr key={job.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-3 text-gray-500 font-mono">#{job.id}</td>
                      <td className="px-6 py-3 font-medium text-gray-800 max-w-xs truncate">
                        {job.title}
                        {job.featured && (
                          <span className="ml-2 inline-block bg-accent-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                            Featured
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-3 text-gray-600">{job.institution}</td>
                      <td className="px-6 py-3">
                        <span className="bg-navy-50 text-navy-700 text-xs font-medium px-2 py-1 rounded">
                          {cat ? cat.name : job.category}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded ${
                            job.type === 'walk-in'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {job.type === 'walk-in' ? 'Walk-in' : 'Regular'}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-gray-600">{job.deadline}</td>
                      <td className="px-6 py-3">
                        <div className="flex gap-2">
                          <button className="text-navy-500 hover:text-navy-700 font-medium transition">
                            Edit
                          </button>
                          <button className="text-red-400 hover:text-red-600 font-medium transition">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
