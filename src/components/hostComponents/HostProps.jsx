import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HostNavbar from './HostNavbar';
import { IoLocationSharp } from 'react-icons/io5';
import { FiUsers, FiEye, FiPlus } from 'react-icons/fi';
import { IoBedOutline } from 'react-icons/io5';
import { MdOutlineBathtub } from 'react-icons/md';

const HostProps = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.User.userId);

  useEffect(() => {
    axiosInstance
      .get(`/host/getData/${userId}`)
      .then((res) => {
        setDatas(res.data.hostData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: '"Roboto Slab", serif' }}>
      <HostNavbar />

      <div className="pt-24 pb-16 px-4 md:px-10 lg:px-20">

        {/* ── Page header ── */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">Host Dashboard</p>
            <h1 className="text-3xl font-bold text-gray-900">My Properties</h1>
            <p className="text-gray-500 text-sm mt-1">
              {datas.length} {datas.length === 1 ? 'property' : 'properties'} listed
            </p>
          </div>
          <button
            onClick={() => navigate('/host/hostPage')}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-xl shadow transition-all duration-200 hover:shadow-lg"
          >
            <FiPlus className="text-lg" />
            Add New Property
          </button>
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && datas.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl border border-dashed border-gray-300 text-center px-6">
            <div className="text-5xl mb-4">🏠</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No properties yet</h2>
            <p className="text-gray-500 text-sm mb-6">Start hosting by listing your first property.</p>
            <button
              onClick={() => navigate('/host/hostPage')}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-xl shadow transition-all duration-200"
            >
              <FiPlus /> List a Property
            </button>
          </div>
        )}

        {/* ── Property grid ── */}
        {!loading && datas.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {datas.map((data) => (
              <div
                key={data._id}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={data?.images[0]}
                    alt={data?.selectedCategory}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Category badge */}
                  <div className="absolute top-3 left-3 bg-blue-900/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                    {data?.selectedCategory}
                  </div>
                  {/* Price badge */}
                  <div className="absolute top-3 right-3 bg-white/90 text-gray-900 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm shadow">
                    ₹{data?.selectedPrice}<span className="font-normal text-gray-500">/day</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 flex flex-col flex-1">
                  {/* Name & location */}
                  <h3 className="font-bold text-gray-900 text-base leading-tight mb-1 truncate">
                    {data?.address?.name || data?.selectedLocation}
                  </h3>
                  <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
                    <IoLocationSharp className="text-blue-500 flex-shrink-0" />
                    <span className="truncate">{data?.selectedLocation}</span>
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center gap-3 text-gray-600 text-xs mb-4 border-t border-gray-100 pt-3">
                    <span className="flex items-center gap-1">
                      <FiUsers className="text-blue-600" />
                      {data?.selectedBasics?.Guests} guests
                    </span>
                    <span className="flex items-center gap-1">
                      <IoBedOutline className="text-blue-600" />
                      {data?.selectedBasics?.Beds} beds
                    </span>
                    <span className="flex items-center gap-1">
                      <MdOutlineBathtub className="text-blue-600" />
                      {data?.selectedBasics?.Bathrooms} baths
                    </span>
                  </div>

                  {/* Action button */}
                  <div className="mt-auto">
                    <button
                      onClick={() => navigate(`/host/propDetails/${data._id}`)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow hover:shadow-blue-900/20"
                    >
                      <FiEye />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HostProps;
