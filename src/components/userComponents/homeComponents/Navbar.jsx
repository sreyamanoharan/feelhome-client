import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogout } from "../../../store/slice/User";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../../api/axios";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [details, setDetails] = useState("");
  const [showOption, setShowOption] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const userId = useSelector((state) => state.User.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (userId) {
      axiosInstance.get(`/getUser/${userId}`).then((res) => {
        setDetails(res?.data?.users);
      });
    }
  }, [userId]);

  const isLinkActive = (pathname) => location.pathname === pathname;

  const navLinks = [
    { to: "/host/hostHome", label: "Host your Home" },
    { to: "/bookings",      label: "My Bookings" },
    { to: "/allProperties", label: "All Properties" },
    { to: "/userChat",      label: "Chat" },
  ];

  return (
    <>
      {/* Main navbar */}
      <nav className="fixed top-0 w-full z-50 h-16 bg-blue-900/95 backdrop-blur-md border-b border-white/10 shadow-lg flex items-center px-6 md:px-10">
        {/* Logo */}
        <Link
          to="/"
          className="text-white text-2xl flex-shrink-0 hover:opacity-90 transition-opacity"
          style={{ fontFamily: '"Playwrite ES Deco Guides", serif' }}
        >
          feelHome
        </Link>

        {/* Center nav links — desktop */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-1">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`text-sm font-medium transition-all duration-200 ${
                isLinkActive(to)
                  ? "bg-white/15 text-white rounded-lg px-3 py-1.5"
                  : "text-white/70 hover:text-white hover:bg-white/10 rounded-lg px-3 py-1.5"
              }`}
              style={{ fontFamily: '"Oswald", serif' }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right side — desktop */}
        <div className="hidden md:flex items-center gap-3 ml-auto flex-shrink-0 relative">
          {userId ? (
            <>
              <button
                onClick={() => setShowOption(!showOption)}
                className="flex items-center cursor-pointer"
              >
                <img
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-white/30 hover:ring-white/70 transition-all duration-200"
                  src={details?.profileImage || "/static/image/default-avatar.png"}
                  alt="avatar"
                />
              </button>
              {showOption && (
                <div className="absolute top-12 right-0 bg-white rounded-xl shadow-2xl border border-gray-100 w-44 py-2 z-50 animate-fade-in">
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => { setShowOption(false); navigate("/userProfile"); }}
                  >
                    Profile
                  </button>
                  <div className="mx-3 border-t border-gray-100 my-1" />
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    onClick={() => {
                      setShowOption(false);
                      dispatch(userLogout());
                      navigate("/userLogin");
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link
                to="/userLogin"
                className="whitespace-nowrap text-sm font-semibold text-white border border-white/50 rounded-lg px-4 py-1.5 hover:bg-white/10 transition-all duration-200"
                style={{ fontFamily: '"Oswald", serif' }}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="whitespace-nowrap text-sm font-bold bg-white text-blue-900 rounded-lg px-4 py-1.5 hover:bg-blue-50 shadow transition-all duration-200"
                style={{ fontFamily: '"Oswald", serif' }}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden ml-auto text-white p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile slide-down panel */}
      <div
        className={`fixed top-16 left-0 w-full z-40 bg-blue-900/98 backdrop-blur-md border-b border-white/10 shadow-xl transition-all duration-300 ease-in-out overflow-hidden md:hidden ${
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4 gap-1">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`text-sm font-medium py-2.5 px-3 rounded-lg transition-all duration-200 ${
                isLinkActive(to)
                  ? "bg-white/15 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}

          <div className="border-t border-white/10 mt-2 pt-3">
            {userId ? (
              <>
                <div className="flex items-center gap-3 mb-2 px-3 py-2">
                  <img
                    src={details?.profileImage || "/static/image/default-avatar.png"}
                    className="w-8 h-8 rounded-full object-cover"
                    alt="avatar"
                  />
                  <span className="text-white text-sm font-medium">{details?.name || "Profile"}</span>
                </div>
                <button
                  className="w-full text-left text-sm text-white/70 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-all"
                  onClick={() => { setMobileOpen(false); navigate("/userProfile"); }}
                >
                  View Profile
                </button>
                <button
                  className="w-full text-left text-sm text-red-400 hover:text-red-300 px-3 py-2 rounded-lg hover:bg-white/10 transition-all"
                  onClick={() => { setMobileOpen(false); dispatch(userLogout()); navigate("/userLogin"); }}
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-3 px-3 py-2">
                <Link
                  to="/userLogin"
                  className="flex-1 text-center text-sm font-semibold text-white border border-white/50 rounded-lg px-4 py-2 hover:bg-white/10 transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex-1 text-center text-sm font-bold bg-white text-blue-900 rounded-lg px-4 py-2 hover:bg-blue-50 transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
