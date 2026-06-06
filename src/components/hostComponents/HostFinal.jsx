import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../api/axios';
import { reduxClear } from '../../store/slice/Host';
import Confetti from 'react-dom-confetti';

const HostFinal = () => {
  const config = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 500,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: '20px',
    height: '20px',
    perspective: '700px',
    colors: ['#000', '#333', '#666'],
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userEmail = useSelector(state => state.User.userId);
  const hostData = useSelector(state => state.Host);
  const userName = useSelector(state => state.User.name);
  console.log(userName);
  console.log(hostData, userEmail, 'here is the hostDatasssssss');

  const [happy, setHappy] = useState(false);

  const handleSubmit = async () => {
    console.log(hostData, 'hellll there,....');
    await axiosInstance.post('/host/postData', { hostData, userEmail });
    dispatch(reduxClear({}));
    setHappy(true);
    setTimeout(() => {
      navigate('/host/hostHome');
    }, 4000);
  };

  return (
    <div
      className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4"
      style={{ fontFamily: '"Roboto Slab", serif' }}
    >
      <Confetti active={happy} config={config} />

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 w-full max-w-md p-10 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl">
            🎉
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: '"Roboto Slab", serif' }}>
          You're all set, {userName}!
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          Your property has been listed on feelHome. Guests can now discover and book your place.
        </p>

        <button
          onClick={handleSubmit}
          className="w-full px-8 py-3 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-xl text-base transition-all shadow"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default HostFinal;
