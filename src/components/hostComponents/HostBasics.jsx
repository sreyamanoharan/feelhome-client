import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedBasics } from '../../store/slice/Host';
import HostNavbar from './HostNavbar';

const HostBasics = () => {
  const hostData = useSelector(state => state.Host);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [basics, setBasics] = useState({ Guests: 0, Bedrooms: 0, Beds: 0, Bathrooms: 0 });

  const handleIncrease = (item) => setBasics(prev => ({ ...prev, [item]: prev[item] + 1 }));
  const handleDecrease = (item) => setBasics(prev => ({ ...prev, [item]: Math.max(prev[item] - 1, 0) }));

  const reduxBasics = (e) => {
    e.preventDefault();
    dispatch(addSelectedBasics({ selectedBasics: basics }));
    navigate('/host/hostStPlace');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ fontFamily: '"Roboto Slab", serif' }}>
      <HostNavbar />
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-24">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 w-full max-w-2xl p-8 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: '"Roboto Slab", serif' }}>
            Share some basics about your place
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            You can always change these details later from your host dashboard.
          </p>

          <div>
            {Object.keys(basics).map((item) => (
              <div key={item} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                <span className="text-base font-semibold text-gray-900">{item}</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleDecrease(item)}
                    className="w-9 h-9 rounded-full border border-gray-200 hover:border-gray-300 flex items-center justify-center text-gray-700 font-bold transition-all"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-bold text-gray-900">{basics[item]}</span>
                  <button
                    type="button"
                    onClick={() => handleIncrease(item)}
                    className="w-9 h-9 rounded-full border border-gray-200 hover:border-gray-300 flex items-center justify-center text-gray-700 font-bold transition-all"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button onClick={() => navigate(-1)} className="px-6 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-all">
              Back
            </button>
            <button onClick={reduxBasics} className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-xl text-sm transition-all shadow">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostBasics;
