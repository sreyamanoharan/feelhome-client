import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addDescription } from '../../store/slice/Host'
import { useNavigate } from 'react-router-dom'
import HostNavbar from './HostNavbar'

const HostDescription = () => {
  const hostData = useSelector(state => state.Host);
  const [description, setDescription] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reduxDescription = async () => {
    console.log(description, 'kkkkkkk00000');
    dispatch(addDescription({ description: description }));
    navigate('/host/hostFinal');
  };

  const charCount = description ? description.length : 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ fontFamily: '"Roboto Slab", serif' }}>
      <HostNavbar />
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-24">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 w-full max-w-2xl p-8 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: '"Roboto Slab", serif' }}>
            Describe your property
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Help guests understand what makes your place special.
          </p>

          <textarea
            placeholder="Tell guests what you love about your place — the vibe, nearby attractions, special features..."
            className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 resize-none h-40 mt-2"
            value={description || ''}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p className="text-right text-xs text-gray-400 mt-1">{charCount} characters</p>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-all"
            >
              Back
            </button>
            <button
              onClick={async () => { await reduxDescription(); }}
              className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-xl text-sm transition-all shadow"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostDescription;
