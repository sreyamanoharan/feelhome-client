import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiPhone, FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function User_Detail({ setEdit }) {
  const { token } = useSelector((state) => state.User);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/userProfile').then((res) => {
      setUser(res?.data?.user);
    }).catch((error) => {
      if (error.response?.data) {
        toast.error(error.response.data.errMsg);
      } else {
        toast.error(error.message);
      }
    });
  }, []);

  const fields = [
    { icon: <FiUser className="text-blue-500" />,  label: 'Full Name', value: user.name },
    { icon: <FiMail className="text-blue-500" />,  label: 'Email Address', value: user.email },
    { icon: <FiPhone className="text-blue-500" />, label: 'Phone Number', value: user.PhoneNumber },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Page header */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">Account</p>
          <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: '"Oswald", serif' }}>
            My Profile
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* ── Left: Avatar card ── */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="relative mb-4">
                <img
                  src={user.profileImage || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
                  alt="avatar"
                  className="w-28 h-28 rounded-full object-cover border-4 border-blue-100 shadow-md"
                />
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-1">{user.name || '—'}</h2>
              <p className="text-gray-500 text-sm mb-5">{user.email || '—'}</p>

              {/* Member badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                Verified Member
              </span>

              <button
                onClick={() => setEdit(true)}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-200 shadow text-sm"
              >
                <FiEdit2 /> Edit Profile
              </button>
            </div>
          </div>

          {/* ── Right: Info card ── */}
          <div className="md:col-span-2 space-y-4">

            {/* Details card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-base font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">
                Personal Information
              </h3>
              <div className="space-y-4">
                {fields.map(({ icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      {icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
                      <p className="text-gray-900 font-semibold text-sm mt-0.5">{value || '—'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'My Bookings', path: '/bookings', color: 'bg-blue-50 text-blue-700 hover:bg-blue-100' },
                  { label: 'All Properties', path: '/allProperties', color: 'bg-green-50 text-green-700 hover:bg-green-100' },
                  { label: 'Host a Property', path: '/host/hostHome', color: 'bg-purple-50 text-purple-700 hover:bg-purple-100' },
                  { label: 'Messages', path: '/userChat', color: 'bg-orange-50 text-orange-700 hover:bg-orange-100' },
                ].map(({ label, path, color }) => (
                  <button
                    key={label}
                    onClick={() => navigate(path)}
                    className={`${color} text-sm font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-left`}
                  >
                    {label} →
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default User_Detail;
