import Link from 'next/link';

export const metadata = {
  title: 'About Us - TopFaculty | India\'s Premier Academic Professional Platform',
  description: 'Learn about TopFaculty — India\'s 3-in-1 platform for faculty recruitment, scholar networking, and college reviews & ratings.',
};

export default function AboutPage() {
  const offerings = [
    {
      icon: '🎓',
      title: 'Faculty Recruitment',
      description: 'Find teaching, research, and administrative positions at top institutions across India. From walk-in interviews to UGC-approved posts, discover opportunities that match your expertise.',
      color: 'bg-navy-700',
    },
    {
      icon: '🤝',
      title: 'Scholar Network',
      description: 'Connect with peers, share research, and build your academic profile with Scopus/ORCID integration. Collaborate across disciplines and institutions nationwide.',
      color: 'bg-navy-500',
    },
    {
      icon: '⭐',
      title: 'College Reviews',
      description: 'Transparent ratings and reviews to help faculty make informed career decisions. Real insights from real academics about work culture, infrastructure, and growth.',
      color: 'bg-accent-600',
    },
  ];

  const stats = [
    { value: '500+', label: 'Institutions' },
    { value: '10,000+', label: 'Faculty' },
    { value: '1,000+', label: 'Jobs Monthly' },
    { value: '15+', label: 'States' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-navy-600 transition-colors">Home</Link>
        <span className="mx-2">›</span>
        <span className="text-navy-800 font-medium">About Us</span>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-r from-navy-800 to-navy-600 rounded-xl p-8 md:p-12 mb-10 text-white text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">About TopFaculty</h1>
        <p className="text-navy-100 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
          India&apos;s premier 3-in-1 academic professional platform combining faculty job recruitment, scholar networking, and college reviews &amp; ratings.
        </p>
      </section>

      {/* Mission */}
      <section className="bg-white rounded-xl shadow p-8 md:p-10 mb-10">
        <h2 className="text-2xl font-bold text-navy-800 mb-4 text-center">Our Mission</h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-center leading-relaxed">
          TopFaculty is India&apos;s premier 3-in-1 academic professional platform combining faculty job recruitment (like Naukri for academics), scholar networking (like LinkedIn for academics), and college reviews &amp; ratings (like Glassdoor for academia). Our mission is to transform how academic professionals connect, collaborate, and grow — empowering educators and researchers across the country.
        </p>
      </section>

      {/* What We Offer */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-navy-800 mb-6 text-center">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offerings.map((item) => (
            <div key={item.title} className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-6 text-center group">
              <div className={`w-14 h-14 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <span className="text-2xl">{item.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-navy-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-navy-800 to-navy-600 rounded-xl p-8 md:p-10 mb-10 text-white">
        <h2 className="text-2xl font-bold mb-8 text-center">TopFaculty at a Glance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-bold text-accent-500">{stat.value}</p>
              <p className="text-navy-100 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision */}
      <section className="bg-white rounded-xl shadow p-8 md:p-10 mb-10">
        <h2 className="text-2xl font-bold text-navy-800 mb-4 text-center">Our Vision</h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-center leading-relaxed mb-6">
          We envision a future where every academic professional in India has seamless access to career opportunities, a thriving peer network, and transparent institutional insights — all in one place. TopFaculty is building the infrastructure that empowers educators, researchers, and institutions to achieve their fullest potential.
        </p>

        <h2 className="text-2xl font-bold text-navy-800 mb-4 text-center mt-8">The Team</h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-center leading-relaxed">
          TopFaculty is built by a passionate team of educators, technologists, and academic professionals who understand the unique challenges of India&apos;s higher education ecosystem. We are committed to creating tools that genuinely serve the academic community.
        </p>
      </section>

      {/* CTA */}
      <section className="text-center mb-6">
        <h2 className="text-xl font-bold text-navy-800 mb-3">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-5">Join thousands of academic professionals on TopFaculty.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/jobs" className="bg-navy-700 hover:bg-navy-800 text-white px-8 py-3 rounded-lg font-semibold text-sm transition-colors">
            Browse Jobs
          </Link>
          <Link href="/contact" className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-semibold text-sm transition-colors">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
