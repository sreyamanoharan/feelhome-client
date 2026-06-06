import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../../components/userComponents/homeComponents/Navbar'
import Banner from '../../components/userComponents/homeComponents/Banner'
import LatestProperties from '../../components/userComponents/homeComponents/LatestProperties'

const features = [
  {
    emoji: '🏡',
    title: 'Verified Listings',
    desc: 'Every property is reviewed and verified so you always know exactly what you are getting.',
  },
  {
    emoji: '💰',
    title: 'Best Prices',
    desc: 'Transparent pricing with no hidden fees — find great stays at genuinely fair rates.',
  },
  {
    emoji: '📅',
    title: 'Easy Booking',
    desc: 'Book your perfect stay in just a few taps with our seamless, secure checkout.',
  },
  {
    emoji: '💬',
    title: '24/7 Support',
    desc: 'Our support team is always on standby to help you before, during, and after your trip.',
  },
]

const footerLinks = [
  { label: 'Home',            to: '/' },
  { label: 'All Properties',  to: '/allProperties' },
  { label: 'Host your Home',  to: '/host/hostHome' },
  { label: 'My Bookings',     to: '/bookings' },
]

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Banner */}
      <Banner />

      {/* ── Why FeelHome ── */}
      <section className="py-16 bg-gray-50">
        <div className="text-center mb-10 px-6">
          <span className="text-blue-600 text-xs font-semibold uppercase tracking-widest">
            Why Choose Us
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mt-2"
            style={{ fontFamily: '"Oswald", serif' }}
          >
            Why FeelHome?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-16">
          {features.map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{emoji}</div>
              <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Latest Properties ── */}
      <LatestProperties />

      {/* ── Footer ── */}
      <footer className="bg-blue-900 text-white mt-auto">
        <div className="max-w-6xl mx-auto px-6 md:px-16 py-12 flex flex-col md:flex-row justify-between gap-10">
          {/* Brand */}
          <div>
            <span
              className="text-2xl font-normal"
              style={{ fontFamily: '"Playwrite ES Deco Guides", serif' }}
            >
              feelHome
            </span>
            <p className="text-white/60 text-sm mt-2 max-w-xs">
              Find your perfect stay, anywhere in the world.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-3">
              Quick Links
            </p>
            <ul className="space-y-2">
              {footerLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-5 text-center text-white/40 text-xs">
          © {new Date().getFullYear()} feelHome · All rights reserved
        </div>
      </footer>
    </div>
  )
}

export default Home
