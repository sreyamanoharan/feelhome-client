import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../api/axios';
import { toast } from 'react-hot-toast';
import User_Detail from './User_Detail';
import { FiX, FiUpload } from 'react-icons/fi';

function User_profile() {
  const { token } = useSelector((state) => state.User);
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);
  const [name, setNewName] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [profileImage, setNewProfile] = useState('');
  const [err, setErr] = useState('');
  const [saving, setSaving] = useState(false);
  const regex_mobile = /^\d{10}$/;

  useEffect(() => {
    axiosInstance.get('/userProfile', {
      headers: { authorization: `Bearer ${token}` }
    }).then((res) => {
      setUser(res?.data?.user);
      setNewName(res?.data?.user?.name);
      setPhoneNumber(res?.data?.user?.PhoneNumber);
      setNewProfile(res?.data?.user?.profileImage);
    }).catch((error) => {
      if (error.response?.data) toast.error(error.response.data.errMsg);
      else toast.error(error.message);
    });
  }, [token, edit]);

  const submitEdits = async () => {
    setErr('');
    if (name.trim().length === 0) return setErr('Name cannot be empty');
    if (!regex_mobile.test(PhoneNumber)) return setErr('Enter a valid 10-digit mobile number');

    try {
      setSaving(true);
      const res = await axiosInstance.patch('/editProfile', { name, profileImage, PhoneNumber }, {
        headers: { authorization: `Bearer ${token}` }
      });
      toast.success(res.data.message);
      setEdit(false);
    } catch (error) {
      if (error?.response?.data) toast.error(error.response.data.errMsg);
      else toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const validExts = ['.jpg', '.jpeg', '.png', '.webp'];
    const ext = file.name.substr(file.name.lastIndexOf('.')).toLowerCase();
    if (!validExts.includes(ext)) return toast.error('Please upload a valid image (jpg, png, webp)');

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setNewProfile(reader.result);
    reader.onerror = () => toast.error('Error reading image');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <User_Detail setEdit={setEdit} />

      {/* ── Edit modal ── */}
      {edit && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-md animate-scale-up">

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
                <button
                  onClick={() => setEdit(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
                >
                  <FiX />
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-6 space-y-5">

                {/* Avatar upload */}
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <img
                      src={profileImage || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
                      alt="avatar"
                      className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 shadow-md"
                    />
                    <label
                      htmlFor="avatar-upload"
                      className="absolute bottom-0 right-0 w-8 h-8 bg-blue-900 hover:bg-blue-800 text-white rounded-full flex items-center justify-center cursor-pointer shadow transition-colors"
                    >
                      <FiUpload className="text-xs" />
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                  <p className="text-xs text-gray-400">Click the icon to change photo</p>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-50"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                  <input
                    type="text"
                    value={PhoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="10-digit number"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-50"
                  />
                </div>

                {err && (
                  <p className="text-red-500 text-xs font-medium text-center">{err}</p>
                )}
              </div>

              {/* Footer */}
              <div className="flex gap-3 px-6 py-5 border-t border-gray-100">
                <button
                  onClick={() => setEdit(false)}
                  className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={submitEdits}
                  disabled={saving}
                  className="flex-1 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-xl text-sm transition-all shadow disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setEdit(false)} />
        </>
      )}
    </div>
  );
}

export default User_profile;
