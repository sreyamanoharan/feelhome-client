import React from 'react'
import { useNavigate } from 'react-router-dom'
import HostNavbar from './HostNavbar'
import map from '../../../public/static/image/map.png'
import superhostImg from '../../../public/static/image/superhost.webp'
import { FiDollarSign, FiSliders, FiGlobe, FiShield, FiCamera, FiSmile } from 'react-icons/fi'

const reasons = [
  {
    icon: <FiDollarSign className="text-3xl text-blue-600" />,
    title: 'Monetize Your Space',
    desc: 'Every room, apartment, or villa holds earning potential. Turn your idle space into a steady income stream.',
  },
  {
    icon: <FiSliders className="text-3xl text-blue-600" />,
    title: 'You Set the Price',
    desc: 'Full control over your rates and availability. Short stays or long-term — your rules, your earnings.',
  },
  {
    icon: <FiGlobe className="text-3xl text-blue-600" />,
    title: 'Global Reach',
    desc: 'Showcase your property to thousands of travellers worldwide through our easy-to-use platform.',
  },
  {
    icon: <FiShield className="text-3xl text-blue-600" />,
    title: 'Secure Payments',
    desc: 'Every transaction is protected. Get paid on time, every time, without any hassle.',
  },
]

const steps = [
  {
    number: '01',
    icon: <FiCamera className="text-2xl text-white" />,
    title: 'Create Your Listing',
    desc: 'Add photos, describe your space, set your price and availability in minutes.',
  },
  {
    number: '02',
    icon: <FiGlobe className="text-2xl text-white" />,
    title: 'Get Discovered',
    desc: 'Your property goes live and reaches guests searching for stays in your area.',
  },
  {
    number: '03',
    icon: <FiSmile className="text-2xl text-white" />,
    title: 'Host & Earn',
    desc: 'Welcome guests, deliver great experiences, and watch your earnings grow.',
  },
]

const HostHome = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: '"Roboto Slab", serif' }}>
      <HostNavbar />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-blue-900">
        {/* Background map image */}
        <div className="absolute inset-0 opacity-10">
          <img src={map} alt="" className="w-full h-full object-cover" />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/90 to-transparent" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center gap-12 pt-24 pb-16">
          {/* Text */}
          <div className="flex-1 text-white">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-4">
              For Hosts · feelHome
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Turn Your Property<br />
              <span className="text-blue-300">Into Income</span>
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed max-w-lg mb-8">
              Join thousands of hosts on feelHome and unlock the earning potential of your space. List in minutes, host on your terms.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/host/hostPage')}
                className="px-8 py-3.5 bg-white text-blue-900 font-bold rounded-xl hover:bg-blue-50 shadow-lg transition-all duration-200 hover:scale-[1.02]"
              >
                Start Hosting
              </button>
              <button
                onClick={() => navigate('/host/hostProps')}
                className="px-8 py-3.5 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-200"
              >
                My Properties
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-10 mt-12 border-t border-white/20 pt-8">
              {[['10K+', 'Active Hosts'], ['50K+', 'Happy Guests'], ['₹2Cr+', 'Paid Out']].map(([val, label]) => (
                <div key={label}>
                  <p className="text-2xl font-bold text-white">{val}</p>
                  <p className="text-blue-300 text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Superhost image */}
          <div className="flex-1 hidden md:flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400/20 rounded-3xl blur-3xl scale-110" />
              <img
                src={superhostImg}
                alt="Superhost"
                className="relative rounded-3xl shadow-2xl w-full max-w-md object-cover"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white text-lg">
                  ⭐
                </div>
                <div>
                  <p className="text-xs text-gray-500">Average Rating</p>
                  <p className="font-bold text-gray-900 text-sm">4.9 / 5.0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why host with us ── */}
      <section className="py-20 px-6 md:px-16 max-w-screen-xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">Why Choose Us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Everything you need to host with confidence</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
                {r.icon}
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">{r.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-16">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">Simple Process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-0.5 bg-blue-100 z-0" />
            {steps.map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-blue-900 rounded-2xl flex items-center justify-center shadow-lg mb-5">
                  {step.icon}
                </div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">{step.number}</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-blue-900 text-white text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to start earning?</h2>
        <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
          List your property today and join thousands of hosts already earning on feelHome.
        </p>
        <button
          onClick={() => navigate('/host/hostPage')}
          className="px-10 py-4 bg-white text-blue-900 font-bold rounded-xl hover:bg-blue-50 shadow-lg transition-all duration-200 hover:scale-[1.02] text-lg"
        >
          List Your Property →
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        © {new Date().getFullYear()} feelHome · All rights reserved
      </footer>
    </div>
  )
}

export default HostHome
