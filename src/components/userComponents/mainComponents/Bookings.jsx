import React, { useEffect } from 'react'
import axiosInstance from '../../../api/axios'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const Bookings = () => {

  const [booking, setBooking] = useState([])
  const [cancellationLoading, setCancellationLoading] = useState(false);
  const [modalOpen, setmodalOpen] = useState(false)
  const [bookingId, setBookingId] = useState(null)

  const userId = useSelector(state => state.User.userId)
  console.log(userId);

  const handleCancelBooking = async () => {

    console.log(bookingId, '===bookinggggIdddddd====');
    try {
      setCancellationLoading(true);

      const response = await axiosInstance.post(`/cancel-booking/${bookingId}`);

      console.log(response.data);
    } catch (error) {

      console.error(error);
    } finally {
      setCancellationLoading(false);
    }
  };


  useEffect(() => {
    axiosInstance.get(`/booking/${userId}`).then((res) => {
      if (res.data.data) {
        console.log(res.data.data, 'ssssssssssssssuuuuuuuuuuuuuuuuuuuusssssssssssssss');
        setBooking(res.data.data)
      }
    })

  }, [cancellationLoading])



  console.log(booking);


  return (


    <div className="overflow-x-auto h-screen bg-white text-gray-900 mt-20">


      <table className="table text-gray-900">


        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th></th>
            <th className='text-gray-900'>Category</th>
            <th className='text-gray-900'>price</th>
            <th className='text-gray-900' >Location</th>

            <th></th>
          </tr>
        </thead>
        <tbody>

          {booking.map((data, index) => (


            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={data?.propertyId?.images[0]} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold"><data className="selectedCategory"></data></div>
                    <div className="text-sm opacity-50"></div>
                  </div>
                </div>
              </td>
              <td>
                {data?.propertyId?.selectedCategory}
              </td>
              <td>
                {data.Amount}
              </td>
              <td>
                {data?.propertyId?.selectedLocation}
              </td>

              <th>
                <button
                  onClick={() => { setBookingId(data._id), setmodalOpen(true) }}
                  disabled={cancellationLoading}
                >
                  {cancellationLoading ? 'Cancelling...' : 'Cancel Booking'}
                </button>
              </th>
            </tr>


          ))}
        </tbody>

      </table>



      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-black font-semibold p-8 rounded-lg shadow-md text-center">
            <h1 className="text-xl font-semibold mb-4"></h1>
            <p>Are you sure you want to cancel booking?</p>




            <div className='flex - justify-center space-x-4 items-center mt-8' >

              <button
                className="btn btn-secondary bg-red-500 text-white hover:bg-red-600"
                onClick={() => { handleCancelBooking(), setmodalOpen(false) }}
              >
                Yes
              </button>
              <button
                className="btn btn-secondary bg-red-500 text-white hover:bg-red-600"
                onClick={() => setmodalOpen(false)}
              >
                No
              </button>
            </div>

          </div>
        </div>
      )}
    </div>


  )
}

export default Bookings