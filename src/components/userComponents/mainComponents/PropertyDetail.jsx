import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import { useSelector } from 'react-redux';
import { toast, Toaster } from 'react-hot-toast';
import { FaStar } from 'react-icons/fa';
import { IoLocationSharp } from "react-icons/io5";
import { IoMdArrowDropright } from "react-icons/io";
import { FiCalendar } from "react-icons/fi";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';



const PropertyDetail = () => {
  const [datas, setDatas] = useState({});
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [showCheckInCal, setShowCheckInCal] = useState(false);
  const [showCheckOutCal, setShowCheckOutCal] = useState(false);
  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);
  const [numGuests, setNumGuests] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [ratings, setRatings] = useState()
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [amount, setAmount] = useState('')
  const [hostId,setHostId]=useState('')
  const { id } = useParams();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.User.userId);
  useEffect(() => {
    if (id) {
      // Fetch property details
      axiosInstance
        .get(`/getDetails/${id}`)
        .then((res) => {
          console.log(res.data.details, 'daaaaaaaaaaaaaaaaaaattttaaaaaaaaaaaaasss');

          setDatas(res.data.details);
          setHostId(res.data.details.hostId._id)

        })
        .catch((err) => {
          console.error(err);
        });

      // Fetch reviews
      axiosInstance
        .get(`/reviews/${id}`)
        .then((res) => {
          console.log(res.data.review, 'reviewwwwwwwww...........');
          console.log(res.data.rating);

          setReviews(res.data.review)
          setRatings(res.data.rating)
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  // Close calendars when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (checkInRef.current && !checkInRef.current.contains(e.target)) {
        setShowCheckInCal(false);
      }
      if (checkOutRef.current && !checkOutRef.current.contains(e.target)) {
        setShowCheckOutCal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddReview = async () => {
    if (!newReview || rating === 0) {
      toast.error('Please add a review and select a rating!');
      return;
    }

    try {
      const res = await axiosInstance.post('/reviews', {
        userId,
        propertyId: id,
        review: newReview,
        rating,
      });

      setReviews((prev) => [...prev, res.data.review]);
      setNewReview('');
      setRating(0);
      toast.success('Review added successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add review!');
    }
  };




  const calculateDays = () => {
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);

      // Calculate the difference in milliseconds
      const diffTime = checkOut - checkIn;

      // Convert milliseconds to days
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      return diffDays > 0 ? diffDays : 0; // Ensure the difference is non-negative
    }
    return 0;
  };

  const totalPrice = calculateDays() * datas.selectedPrice;



  const handleBooking = async () => {



    if (calculateDays() === 0) {
      toast.error('Please select valid dates.');
      return;
    } else {
      try {
        const res = await axiosInstance.post('/create-checkout-session', {
          userId,
          propertyId: id,
          checkInDate,
          checkOutDate,
        });

        if (res.data.url) {
          window.location.href = res.data.url;
        } else {
          toast.success('Booking successful!');
        }
      } catch (err) {
        console.error(err);
        toast.error(err?.response?.data?.errMsg || 'Booking failed!');
      }
    }
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % datas.images.length);
  };

  const handlePreviousImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + datas.images.length) % datas.images.length);
  };

  const handleIncrease = () => {
    console.log(datas, 'checking....');
    console.log(hostId,'hostIddddddd');
    

    if (datas?.selectedBasics?.Guests > numGuests) {
      setNumGuests(numGuests + 1);
    }
  };

  const handleDecrease = () => {
    if (numGuests > 1) {
      setNumGuests(numGuests - 1);
    }
  };

  return (
    <>
      <Toaster toastOptions={{ duration: 3000 }} />

      <div className='bg-white min-h-screen pt-28 pb-20 px-4 md:px-12 lg:px-24'>
        <div>
          <p className='text-3xl font-bold text-gray-900 mb-6 animate-fade-in-up' style={{ fontFamily: ' "Roboto Slab", serif' }}>{datas?.address?.name}</p>
          
          {/* Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-3xl overflow-hidden shadow-lg animate-fade-in-up delay-100">
            {datas?.images?.slice(0, 5).map((image, index) => (
              <div
                key={index}
                className={`relative cursor-pointer overflow-hidden ${
                  index === 0 ? 'col-span-2 row-span-2 h-[450px]' : 'col-span-1 row-span-1 h-[218px]'
                }`}
                onClick={() => setSelectedImageIndex(index)}
              >
                <img
                  src={image}
                  alt={`Gallery item ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>

          {/* Image Modal */}
          {selectedImageIndex !== null && (
            <div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in"
              onClick={() => setSelectedImageIndex(null)}
            >
              <div className="relative max-w-5xl w-full mx-4 animate-scale-up" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button
                  className="absolute -top-12 right-0 text-4xl text-white hover:text-blue-300 transition-colors duration-200"
                  onClick={() => setSelectedImageIndex(null)}
                >
                  &times;
                </button>

                {/* Image Number */}
                <div className="absolute top-4 left-4 text-white text-sm font-semibold z-10 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  {selectedImageIndex + 1} / {datas.images.length}
                </div>

                {/* Image Slider */}
                <div className="flex items-center justify-between bg-black/40 backdrop-blur-md rounded-2xl p-4 h-[600px] relative">
                  <button
                    className={`absolute left-4 z-10 text-white bg-black/40 hover:bg-black/75 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                      selectedImageIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105'
                    }`}
                    disabled={selectedImageIndex === 0}
                    onClick={handlePreviousImage}
                  >
                    &#10094;
                  </button>
                  <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-lg">
                    <img
                      src={datas.images[selectedImageIndex]}
                      alt={`Selected ${selectedImageIndex + 1}`}
                      className="max-h-full max-w-full object-contain rounded shadow-2xl transition-transform duration-300"
                    />
                  </div>
                  <button
                    className={`absolute right-4 z-10 text-white bg-black/40 hover:bg-black/75 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                      selectedImageIndex === datas.images.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105'
                    }`}
                    disabled={selectedImageIndex === datas.images.length - 1}
                    onClick={handleNextImage}
                  >
                    &#10095;
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Property Details */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mt-10">
            <div className="flex-1 w-full animate-fade-in-up">
              <div className='flex items-center gap-3 mb-4'>
                <span className='px-4 py-1.5 bg-blue-100 text-blue-900 rounded-full text-sm font-semibold' style={{ fontFamily: ' "Roboto Slab", serif' }}> {datas.selectedCategory}</span>
                <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full text-amber-700 font-semibold text-sm">
                  <FaStar className='text-yellow-500' />
                  <span>{ratings || 'New'}</span>
                </div>
              </div>

              <div className='mb-6'>
                <h2 className='text-xl md:text-2xl text-gray-700 font-medium' style={{ fontFamily: ' "Roboto Slab", serif' }}>
                  {datas?.selectedBasics?.Guests} Guests · {datas?.selectedBasics?.Bedrooms} Bedrooms · {datas?.selectedBasics?.Bathrooms} Bathrooms · {datas?.selectedBasics?.Beds} Beds
                </h2>
              </div>
              
              <hr className="border-gray-200 my-6" />

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6' style={{ fontFamily: '"Dancing Script", serif' }}>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full overflow-hidden">
                  {/* Heading banner */}
                  <div className="bg-blue-900 px-6 py-4">
                    <p className="text-2xl font-bold text-white" style={{ fontFamily: '"Dancing Script", serif' }}>What this place offers to you</p>
                  </div>
                  {/* Amenities list */}
                  <div className="p-6">
                    <ul className="grid grid-cols-2 font-bold text-lg gap-2 text-gray-700" style={{ fontFamily: '"Dancing Script", serif' }}>
                      {datas?.selectedFeatures?.map((amen, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <IoMdArrowDropright className="text-xl text-blue-600" />
                          <span className="text-left">{amen}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full flex flex-col justify-center">
                  <div className="text-3xl text-blue-900 mb-2">
                    <IoLocationSharp className="animate-bounce" />
                  </div>
                  <div className="font-bold text-lg text-gray-800 leading-relaxed" style={{ fontFamily: '"Dancing Script", serif' }}>
                    {datas?.address?.houseAddress} <br />
                    {datas?.address?.city}, {datas?.address?.state}, {datas?.address?.pin}
                  </div>
                </div>
              </div>

              <hr className="border-gray-200 my-8" />

              <div className='mt-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100' >
                <h3 className='text-3xl font-bold text-gray-900 mb-4' style={{ fontFamily: '"Satisfy", serif' }}>About This Place</h3>
                <p className='text-gray-600 leading-relaxed' style={{ fontFamily: ' "Roboto Slab", serif' }}>{datas?.description}</p>
              </div>
            </div>

            {/* Booking Form */}
            <div className="p-6 shadow-2xl rounded-2xl border border-blue-50/50 bg-gradient-to-br from-blue-50 to-white w-96 mt-20 transition-all duration-300 animate-fade-in-up delay-200 relative z-10">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Book Now</h2>

              {/* Guest Section */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-800 font-medium">Guests:</span>
                <div className="flex items-center space-x-2">
                  <button
                    className="border border-blue-500/20 px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold w-9 h-9 flex items-center justify-center shadow-md transition-all duration-200 active:scale-95 disabled:bg-gray-300 disabled:border-transparent disabled:cursor-not-allowed"
                    onClick={handleDecrease}
                    disabled={numGuests <= 1}
                  >
                    -
                  </button>
                  <span className="text-gray-900 font-semibold">{numGuests}</span>
                  <button
                    className="border border-blue-500/20 px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold w-9 h-9 flex items-center justify-center shadow-md transition-all duration-200 active:scale-95 disabled:bg-gray-300 disabled:border-transparent disabled:cursor-not-allowed"
                    onClick={handleIncrease}
                    disabled={numGuests >= datas?.selectedBasics?.Guests}
                  >
                    + 
                  </button>
                </div>
              </div>

              {/* Check-In & Check-Out */}
              <div className="mb-4 relative" ref={checkInRef}>
                <label className="block font-medium text-gray-700 mb-1">Check-in Date:</label>
                <button
                  type="button"
                  onClick={() => { setShowCheckInCal(!showCheckInCal); setShowCheckOutCal(false); }}
                  className="flex items-center justify-between border border-gray-300 p-2.5 rounded-lg w-full text-gray-900 bg-white shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <span className={checkInDate ? 'text-gray-900' : 'text-gray-400'}>
                    {checkInDate ? new Date(checkInDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Select check-in date'}
                  </span>
                  <FiCalendar className="text-blue-600 text-lg" />
                </button>
                {showCheckInCal && (
                  <div className="absolute top-full left-0 mt-2 z-50 shadow-2xl rounded-xl border border-gray-200 bg-white">
                    <Calendar
                      onChange={(date) => {
                        setCheckInDate(date.toISOString().split('T')[0]);
                        setShowCheckInCal(false);
                      }}
                      value={checkInDate ? new Date(checkInDate) : null}
                      minDate={new Date()}
                      className="rounded-xl"
                    />
                  </div>
                )}
              </div>

              <div className="mb-4 relative" ref={checkOutRef}>
                <label className="block font-medium text-gray-700 mb-1">Check-out Date:</label>
                <button
                  type="button"
                  onClick={() => { setShowCheckOutCal(!showCheckOutCal); setShowCheckInCal(false); }}
                  className="flex items-center justify-between border border-gray-300 p-2.5 rounded-lg w-full text-gray-900 bg-white shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <span className={checkOutDate ? 'text-gray-900' : 'text-gray-400'}>
                    {checkOutDate ? new Date(checkOutDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Select check-out date'}
                  </span>
                  <FiCalendar className="text-blue-600 text-lg" />
                </button>
                {showCheckOutCal && (
                  <div className="absolute top-full left-0 mt-2 z-50 shadow-2xl rounded-xl border border-gray-200 bg-white">
                    <Calendar
                      onChange={(date) => {
                        setCheckOutDate(date.toISOString().split('T')[0]);
                        setShowCheckOutCal(false);
                      }}
                      value={checkOutDate ? new Date(checkOutDate) : null}
                      minDate={checkInDate ? new Date(checkInDate) : new Date()}
                      className="rounded-xl"
                    />
                  </div>
                )}
              </div>
              <div className="space-y-1 mb-4 text-gray-700 font-medium">
                <p>Price per day: <span className="text-gray-900">₹{datas?.selectedPrice}</span></p>
                <p className="text-lg border-t border-gray-100 pt-2 mt-2">
                  Total Price: <span className="font-bold text-gray-900 text-xl">₹{totalPrice || datas?.selectedPrice}</span>
                </p>
              </div>

              <button
                onClick={handleBooking}
                className="w-full py-3 mt-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white font-semibold rounded-xl hover:from-blue-800 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] active:scale-95 animate-pulse-glow"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row gap-12 mt-12 pt-8 border-t border-gray-200'>
          <div className="flex-1 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-fade-in-up delay-300">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Reviews ({reviews?.length || 0})</h2>

            {/* Display Reviews */}
            <div className="space-y-4">
              {reviews?.length > 0 ? (
                reviews.map((review, index) => (
                  <div
                    key={index}
                    className="p-5 bg-gray-50 rounded-xl hover:shadow-md transition-shadow duration-200 animate-fade-in"
                  >
                    <div className='flex items-center gap-4 mb-2'>
                      <div className="w-10 h-10 rounded-full bg-blue-900/10 text-blue-900 font-bold flex items-center justify-center">
                        {review?.reviewer?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className='font-semibold text-gray-950'>{review?.reviewer}</p>
                        <p className='text-xs text-gray-500'>{review?.date}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed pl-14">{review?.review}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No reviews yet. Be the first to add one!</p>
              )}
            </div>

            {/* Add Review */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Add Your Review</h3>
              <textarea
                className="w-full p-4 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition-all duration-200 text-gray-900"
                placeholder="Write your review here..."
                rows={4}
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
              ></textarea>
              <div className="flex items-center space-x-3 mt-3">
                <span className="text-gray-700 font-medium">Your Rating:</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`cursor-pointer text-xl transition-all duration-150 ${i < (hoverRating || rating)
                        ? 'text-yellow-400 scale-110'
                        : 'text-gray-300 hover:scale-105'
                        }`}
                      onClick={() => setRating(i + 1)}
                      onMouseEnter={() => setHoverRating(i + 1)}
                      onMouseLeave={() => setHoverRating(0)}
                    />
                  ))}
                </div>
              </div>
              <button
                className="mt-4 px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200 active:scale-95"
                onClick={handleAddReview}
              >
                Submit Review
              </button>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-between p-6 shadow-2xl mt-12 rounded-2xl bg-white border border-gray-100 w-[300px] h-[350px] hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl animate-fade-in-up delay-300 self-start">
            <div className="flex flex-col items-center text-center font-bold text-lg gap-2" style={{ fontFamily: '"Dancing Script", serif' }}>
              <div className="relative group">
                <img src={datas?.hostId?.profileImage || "/static/image/default-avatar.png"} className='rounded-full w-24 h-24 object-cover shadow-md border-2 border-blue-500/10 group-hover:scale-105 transition-transform duration-300' />
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
              </div>
              <p className="text-2xl mt-2 text-gray-900">{datas?.hostId?.name}</p>
              <p className="text-sm font-sans font-normal text-gray-500">{datas?.hostId?.email}</p>
              <p className="text-sm font-sans font-normal text-gray-500">{datas?.hostId?.PhoneNumber}</p>
            </div>
            <button 
              onClick={() => navigate(`/userChat/${hostId}`)} 
              className='mt-4 w-full bg-gradient-to-r from-blue-900 to-blue-800 text-white font-semibold rounded-xl py-2.5 hover:from-blue-800 hover:to-blue-700 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-md'
            >
              Message Host
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetail;
