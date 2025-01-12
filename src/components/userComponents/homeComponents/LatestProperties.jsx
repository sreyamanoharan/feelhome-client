import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../api/axios';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast'

const LatestProperties = () => {

  const [latestProperties, setLatestProperties] = useState([]);
  const [minDate, setMinDate] = useState(new Date().toISOString().split('T')[0])
  const [datas, setDatas] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState('')
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numGuests, setNumGuests] = useState(1);
  const [propertyId, setPropertyId] = useState('')
  const [hostId, setHostId] = useState('')
  const userId = useSelector(state => state.User.userId)
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();



  const handleBooking = async (propertyId) => {
    console.log('hereee')
    if (new Date() >= new Date(checkInDate) || checkInDate == checkOutDate || new Date() >= new Date(checkOutDate) || checkInDate == undefined || checkOutDate == undefined) {
      console.log('booking.........')
      toast.error("Enter correct dates")
    } else {
      console.log('booking.........')

      axiosInstance.post('/create-checkout-session', { userId, propertyId, checkInDate, checkOutDate }).then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url
        }
      }).catch((err) => {
        console.log(err)
        if (err?.response.data.errMsg) {
          console.log('error')
          toast.error(err.response.data.errMsg)
        }
      })
    }
  }

  useEffect(() => {
    const fetchLatestProperties = async () => {
      try {
        const response = await axiosInstance.get('/latestProperties');
        const sortedProperties = response.data.latestProperties.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setLatestProperties(sortedProperties);
      } catch (error) {
        console.error('Error fetching latest properties:', error);
      }
    };

    fetchLatestProperties();
  }, []);

  return (
    <>
      <div className='h-full text-gray-900 bg-white '>
        <div className="text-center">
          <h1 className="text-gray-900 text-3xl p-5" style={{
            fontFamily: ' "Oswald", serif',
          }}>Latest Properties</h1>
        </div>

        <div className='bg-white gap-3 w-full flex flex-wrap justify-center p-9'>

          {latestProperties.map((data, index) => (
            <div key={data._id} className="card w-72 sm:w-96 bg-white shadow-3xl mt-5 mx-2">
            
              <div className="card-body items-center text-center cursor-pointer" onClick={() => navigate(`/propertyDetails/${data._id}`)}>
                <h2 className="card-title">
                  <img src={data?.images[0]} alt="" />
                </h2>
                <p style={{ fontFamily: ' "Oswald", serif', }}>{data?.selectedCategory}</p>
                <p style={{ fontFamily: ' "Oswald", serif', }}>{data?.selectedLocation}</p>
                 <p style={{ fontFamily: ' "Oswald", serif', }}> Rs.{data?.selectedPrice}/day</p>

              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  )
}



export default LatestProperties