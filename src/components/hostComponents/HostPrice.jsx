import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addSelectedPrice } from '../../store/slice/Host'
import HostNavbar from './HostNavbar'

const HostPrice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [price, setPrice] = useState('');

  const handleSubmit = async () => {
    dispatch(addSelectedPrice({ selectedPrice: price }));
    navigate('/host/hostDescription');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ fontFamily: '"Roboto Slab", serif' }}>
      <HostNavbar />
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-24">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 w-full max-w-2xl p-8 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: '"Roboto Slab", serif' }}>
            Set your price per day
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            You can change your price anytime. Competitive pricing helps attract more guests.
          </p>

          <div className="flex items-center justify-center gap-1 border-b-2 border-blue-900 pb-2 mt-6 mb-2">
            <span className="text-4xl font-bold text-gray-900">₹</span>
            <input
              type="number"
              id="price"
              className="text-4xl font-bold text-gray-900 text-center outline-none w-40 bg-transparent"
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <p className="text-center text-gray-400 text-sm mb-8">Guests will be charged this amount per night</p>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-all"
            >
              Back
            </button>
            <button
              onClick={async () => { await handleSubmit(); }}
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

export default HostPrice;
