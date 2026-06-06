import React from 'react'
import { useNavigate } from 'react-router-dom'
import HostNavbar from './HostNavbar'

const HostStPlace = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ fontFamily: '"Roboto Slab", serif' }}>
      <HostNavbar />
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-24">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 w-full max-w-2xl p-8 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: '"Roboto Slab", serif' }}>
            Make your place stand out
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            In this step, you'll add some of the amenities your place offers, plus 5 or more photos.
            Then you'll create a title and description.
          </p>
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl">📸</div>
          </div>
          <div className="flex justify-between mt-8">
            <button onClick={() => navigate(-1)} className="px-6 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-all">Back</button>
            <button onClick={() => navigate('/host/hostAmenities')} className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-xl text-sm transition-all shadow">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostStPlace;
