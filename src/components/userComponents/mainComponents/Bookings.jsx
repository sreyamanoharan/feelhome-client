import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoLocationSharp } from 'react-icons/io5';
import { FiCalendar, FiX, FiAlertTriangle } from 'react-icons/fi';

const Bookings = () => {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellationLoading, setCancellationLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const userId = useSelector((state) => state.User.userId);
  const navigate = useNavigate();

  const fetchBookings = () => {
    axiosInstance.get(`/booking/${userId}`).then((res) => {
      if (res.data.data) setBooking(res.data.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async () => {
    try {
      setCancellationLoading(true);
      await axiosInstance.post(`/cancel-booking/${bookingId}`);
      setModalOpen(false);
      fetchBookings();
    } catch (error) {
      console.error(error);
    } finally {
      setCancellationLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* ── Page header ── */}
        <div className="mb-8 pt-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">Account</p>
          <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: '"Oswald", serif' }}>
            My Bookings
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {booking.length} {booking.length === 1 ? 'booking' : 'bookings'} found
          </p>
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && booking.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl border border-dashed border-gray-200 text-center px-6">
            <div className="text-5xl mb-4">🛎️</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No bookings yet</h2>
            <p className="text-gray-500 text-sm mb-6">Start exploring properties and book your stay.</p>
            <button
              onClick={() => navigate('/allProperties')}
              className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-200 shadow"
            >
              Explore Properties
            </button>
          </div>
        )}

        {/* ── Booking cards ── */}
        {!loading && booking.length > 0 && (
          <div className="space-y-4">
            {booking.map((data, index) => (
              <div
                key={data._id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col sm:flex-row animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms`, opacity: 0, animationFillMode: 'forwards' }}
              >
                {/* Property image */}
                <div
                  className="sm:w-52 sm:flex-shrink-0 h-44 sm:h-auto overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/propertyDetails/${data?.propertyId?._id}`)}
                >
                  <img
                    src={data?.propertyId?.images?.[0]}
                    alt={data?.propertyId?.selectedCategory}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    {/* Category + Status */}
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {data?.propertyId?.selectedCategory}
                      </span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        data?.status === 'cancelled'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {data?.status === 'cancelled' ? 'Cancelled' : 'Confirmed'}
                      </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                      <IoLocationSharp className="text-blue-500 flex-shrink-0" />
                      <span>{data?.propertyId?.selectedLocation}</span>
                    </div>

                    {/* Dates */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1.5">
                        <FiCalendar className="text-blue-500" />
                        <span>Check-in: <strong className="text-gray-900">{formatDate(data?.checkInDate)}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FiCalendar className="text-blue-500" />
                        <span>Check-out: <strong className="text-gray-900">{formatDate(data?.checkOutDate)}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Footer row */}
                  <div className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-gray-100">
                    <p className="text-lg font-bold text-gray-900">
                      ₹{data?.Amount}
                      <span className="text-gray-400 text-sm font-normal"> total</span>
                    </p>
                    {data?.status !== 'cancelled' && (
                      <button
                        onClick={() => { setBookingId(data._id); setModalOpen(true); }}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-all duration-200"
                      >
                        <FiX /> Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Cancel confirmation modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full animate-scale-up">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <FiAlertTriangle className="text-red-500 text-2xl" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Cancel Booking?</h2>
              <p className="text-gray-500 text-sm mb-6">
                Are you sure you want to cancel this booking? This action cannot be undone.
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Keep Booking
                </button>
                <button
                  onClick={handleCancelBooking}
                  disabled={cancellationLoading}
                  className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50"
                >
                  {cancellationLoading ? 'Cancelling...' : 'Yes, Cancel'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
