import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import { useSelector } from 'react-redux';
import { toast, Toaster } from 'react-hot-toast';
import { FaStar } from 'react-icons/fa';
import { IoLocationSharp } from "react-icons/io5";
import { IoMdArrowDropright } from "react-icons/io";



const PropertyDetail = () => {
  const [datas, setDatas] = useState({});
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
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



      <div className='bg-white h-auto p-20'>


        <div>
          <p className='p-5 text-3xl' style={{ fontFamily: ' "Roboto Slab", serif' }}>{datas?.address?.name}</p>
          {/* Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {datas?.images?.slice(0, 5).map((image, index) => (
              <div
                key={index}
                className={`relative cursor-pointer ${index === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
                  }`}
                onClick={() => setSelectedImageIndex(index)}
              >
                <img
                  src={image}
                  alt={`Gallery item ${index + 1}`}
                  className="rounded-lg w-full h-full object-cover hover:opacity-80 transition duration-300"
                />
              </div>
            ))}
          </div>

          {/* Image Modal */}
          {selectedImageIndex !== null && (
            <div
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
              onClick={() => setSelectedImageIndex(null)}
            >
              <div className="relative">
                {/* Close Button */}
                <button
                  className="absolute top-2 right-2 text-2xl z-10 text-white"
                  onClick={() => setSelectedImageIndex(null)}
                >
                  &times;
                </button>

                {/* Image Number */}
                <div className="absolute top-4 left-4 text-white text-lg font-semibold z-10 bg-black bg-opacity-50 px-4 py-2 rounded">
                  {selectedImageIndex + 1} / {datas.images.length}
                </div>

                {/* Image Slider */}
                <div className="flex items-center space-x-4 bg-gray-900 h-[700px]">
                  <button
                    className={`text-white text-2xl ${selectedImageIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    disabled={selectedImageIndex === 0}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePreviousImage();
                    }}
                  >
                    &#10094;
                  </button>
                  <img
                    src={datas.images[selectedImageIndex]}
                    alt={`Selected ${selectedImageIndex + 1}`}
                    className="rounded-lg w-[900px] h-[550px]"
                  />
                  <button
                    className={`text-white text-2xl ${selectedImageIndex === datas.images.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    disabled={selectedImageIndex === datas.images.length - 1}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage();
                    }}
                  >
                    &#10095;
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Property Details */}
          <div className="flex justify-between items-start mt-4 bg-white">
            <div>


              <div className='flex'>
                <p className=' text-lg' style={{ fontFamily: ' "Roboto Slab", serif' }}> {datas.selectedCategory}</p>
                <FaStar className='text-xl ml-5' /><p className='text-base'>{ratings}</p>
              </div>


              <div className='flex'>
                <p className=' text-2xl' style={{ fontFamily: ' "Roboto Slab", serif' }}>{datas?.selectedBasics?.Guests} Guests .{datas?.selectedBasics?.Bedrooms} Bedrooms .{datas?.selectedBasics?.Bathrooms} Bathrooms .{datas?.selectedBasics?.Beds} Beds</p>

                {/* <li className='ml-20 pl-20'> {datas.selectedLocation}</li> */}

              </div>
              <div className='flex ' style={{ fontFamily: '"Dancing Script", serif' }}>
                <div className="card-body items-center text-center w-[400px] mr-20 rounded-lg shadow-blue-200/50">
                  <p className="text-2xl" style={{ fontFamily: '"Dancing Script", serif' }}>What this place offers to you</p>

                  <div className="card-actions">
                    <ul className="grid grid-cols-2 font-bold text-lg" style={{ fontFamily: '"Dancing Script", serif' }}>
                      {datas?.selectedFeatures?.map((amen, index) => (
                        <li key={index} className="flex items-center">
                          <IoMdArrowDropright className="text-lg" />
                          <p className="text-left pl-3">{amen}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>


                <div className="card-body items-center text-center shadow-xl w-[400px] mt-10 rounded-lg">
                  <p className="text-3xl pt-12">
                    <IoLocationSharp />
                  </p>

                  <div className="card-actions font-bold text-lg">
                    {datas?.address?.houseAddress} <br />
                    {datas?.address?.city}, {datas?.address?.state}, {datas?.address?.pin}
                  </div>
                </div>

              </div>




              <div className='w-[900px] mt-10' >

                <h3 className='text-3xl' style={{ fontFamily: '"Satisfy", serif' }}>About This Place</h3>
                <p className='mt-4' style={{ fontFamily: ' "Roboto Slab", serif' }}>{datas?.description}</p>
              </div>

            </div>


            {/* Booking Form */}
            <div className="p-6 shadow-lg rounded bg-blue-100 w-96 mt-8">
              <h2 className="text-xl font-semibold mb-4">Book Now</h2>

              {/* Guest Section */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-black font-medium">Guests:</span>
                <div className="flex items-center space-x-2">
                  <button
                    className="border-2 border-black px-2 py-1 rounded-full bg-blue-500 w-8 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    onClick={handleDecrease}
                    disabled={numGuests <= 1} // Disable the button when numGuests is 0 or less
                  >
                    -
                  </button>
                  <span>{numGuests}</span>
                  <button
                    className="border-2 border-black px-2 py-1 rounded-full bg-blue-500 w-8 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    onClick={handleIncrease}
                    disabled={numGuests>=datas?.selectedBasics?.Guests}
                  >
                    + 
                  </button>
                </div>
              </div>

              {/* Check-In & Check-Out */}
              <div className="mb-4">
                <label htmlFor="checkInDate" className="block font-medium ">
                  Check-in Date:
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  id="checkInDate"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="border p-2 rounded-md w-full text-white"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="checkOutDate" className="block font-medium">
                  Check-out Date:
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  id="checkOutDate"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="border p-2 rounded-md w-full text-white"
                />
              </div>
              <p>Price per day: ₹{datas?.selectedPrice} </p>
              <p>
                Total Price:  ₹<span className="font-bold">{totalPrice ||datas?.selectedPrice }</span>
              </p>

              <button
                onClick={handleBooking}
                className="btn btn-primary w-full py-2 bg-blue-900 text-white rounded-md hover:bg-blue-600"
              >
                Book Now
              </button>
            </div>

          </div>
        </div>


        <div className='flex'>


          <div className=" bg-white pt-20 pr-8 w-[800px] ">
            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

            {/* Display Reviews */}
            <div className="space-y-4 bg-white">
              {reviews?.length > 0 ? (
                reviews.map((review, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white rounded-lg shadow-sm"
                  >
                    <div className='flex'>
                      <p className='text-gray-700 '>{review?.reviewer}</p>
                      <p className='text-gray-700 pl-7'>{review?.date}</p>
                    </div>

                    <p className="mt-2 text-black">{review?.review}</p>
                  </div>
                ))
              ) : (
                <p>No reviews yet. Be the first to add one!</p>
              )}
            </div>

            {/* Add Review */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Add Your Review</h3>
              <textarea
                className="w-full p-2 border rounded-lg bg-white "
                placeholder="Write your review here..."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
              ></textarea>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-gray-700">Your Rating:</span>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`cursor-pointer ${i < (hoverRating || rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                      }`}
                    onClick={() => setRating(i + 1)}
                    onMouseEnter={() => setHoverRating(i + 1)}
                    onMouseLeave={() => setHoverRating(0)}
                  />
                ))}
              </div>
              <button
                className="btn btn-primary mt-4 py-2 px-4 bg-blue-900 text-white rounded-md hover:bg-blue-600"
                onClick={handleAddReview}
              >
                Submit Review
              </button>
            </div>
          </div>
          <div className="card-body items-center h-80 w-[300px] shadow-xl mt-48 rounded-lg bg-white">
            <p className="text-3xl"></p>

            <div className="card-actions font-bold flex-col items-center text-2xl" style={{ fontFamily: '"Dancing Script", serif' }}>
              <img src={datas?.hostId?.profileImage} className='rounded-full w-20 h-20 gap-4' />

              <p>{datas?.hostId?.name}</p>
              <p>{datas?.hostId?.email}</p>
              <p>{datas?.hostId?.PhoneNumber}</p>

            </div>

            <button onClick={() => navigate(`/userChat/${hostId}`)} className='bg-blue-900 rounded-lg h-10 w-24 text-white'>Message Host</button>
          </div>


        </div>

      </div>
    </>
  );
};

export default PropertyDetail;
