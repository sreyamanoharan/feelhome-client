import React, { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../../store/slice/User'
import { FiPlus, FiHome, FiGrid, FiMessageSquare, FiLogOut, FiMenu, FiX } from 'react-icons/fi'

const HostNavbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { label: 'Home',           path: '/host/hostHome', icon: <FiHome /> },
    { label: 'My Properties',  path: '/host/hostProps', icon: <FiGrid /> },
    { label: 'Chat',           path: '/host/chat',      icon: <FiMessageSquare /> },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-blue-900/95 backdrop-blur-md border-b border-white/10 shadow-lg h-20">
      <div className="max-w-screen-xl mx-auto h-full flex items-center justify-between px-6 md:px-10">

        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="text-white text-2xl font-normal hover:scale-105 transition-transform duration-300"
          style={{ fontFamily: '"Playwrite ES Deco Guides", serif' }}
        >
          feelHome
        </button>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive(link.path)
                  ? 'bg-white/15 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              style={{ fontFamily: '"Oswald", serif' }}
            >
              <span className="text-base">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* <button
            onClick={() => navigate('/host/hostPage')}
            className="flex items-center gap-2 px-4 py-2 bg-white text-blue-900 text-sm font-bold rounded-lg hover:bg-blue-50 transition-all duration-200 shadow"
            style={{ fontFamily: '"Oswald", serif' }}
          >
            <FiPlus className="text-base" />
            Add Property
          </button> */}
          <button
            onClick={() => { dispatch(userLogout()); navigate('/userLogin'); }}
            className="flex items-center gap-2 px-4 py-2 text-white/70 hover:text-red-300 text-sm font-medium rounded-lg hover:bg-white/10 transition-all duration-200"
            style={{ fontFamily: '"Oswald", serif' }}
          >
            <FiLogOut />
            Logout
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-blue-900 border-t border-white/10 px-6 py-4 space-y-2 animate-fade-in-down">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive(link.path)
                  ? 'bg-white/15 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
            >
              {link.icon} {link.label}
            </Link>
          ))}
          <button
            onClick={() => { navigate('/host/hostPage'); setMobileOpen(false); }}
            className="flex items-center gap-3 w-full px-4 py-3 bg-white text-blue-900 font-bold rounded-lg text-sm"
          >
            <FiPlus /> Add Property
          </button>
          <button
            onClick={() => { dispatch(userLogout()); navigate('/userLogin'); }}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-300 hover:bg-white/10 rounded-lg text-sm font-medium"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      )}
    </nav>
  )
}

export default HostNavbar
