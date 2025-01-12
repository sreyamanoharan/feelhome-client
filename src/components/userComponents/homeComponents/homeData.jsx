import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../api/axios';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast'
import Pagination from './pagination';

const ITEMS_PER_PAGE = 3

const homeData = () => {
  const { token } = useSelector((state) => state.User)
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
  const [currentPage, setCurrentPage] = useState(1)
  const [locationSearchTerm, setLocationSearchTerm] = useState('');

  const filteredDatas = datas.filter((data) =>
    (data?.selectedLocation?.toString().toLowerCase().includes(locationSearchTerm.toLowerCase())) &&
    data?.selectedCategory?.includes(categoryFilter) &&
    data?.selectedCategory.toLowerCase().includes(searchTerm.toLowerCase())
  );



  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const navigate = useNavigate();






  useEffect(() => {
    axiosInstance.get('/getData', {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setDatas(res.data.hostData)
      console.log(datas);
      
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
    setSearchTerm('');
  };
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredDatas.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredDatas.length / ITEMS_PER_PAGE);



  return (
    <>
      <Toaster toastOptions={{ duration: 3000 }} />
      <div className='h-screen bg-white mt-20'>
   
  <div className="flex justify-between items-center mb-4 mx-14 ">
    <div className="flex items-center my-2">
      <label htmlFor="categoryFilter" className="text-gray-900 block border-gray-900"></label>
      <select
        id="categoryFilter"
        value={categoryFilter}
        onChange={(e) => handleCategoryFilter(e.target.value)}
        className="block w-full py-2 px-3 border border-gray-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring focus:border-blue-300"
      >
        <option value="">All Categories</option>
        {Array.from(new Set(datas.map((data) => data.selectedCategory))).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
    <div className="flex items-center my-2">
      <label htmlFor="locationSearchTerm" className="text-gray-900 block"></label>
      <input
       placeholder='search the location'
        type="text"
        id="locationSearchTerm"
        value={locationSearchTerm}
        onChange={(e) => setLocationSearchTerm(e.target.value)}
        className="w-full py-2 px-3 border border-gray-900 rounded-md bg-white text-gray-900 focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
  </div>




        <div className='bg-white text-gray-900 gap-20 w-full flex flex-wrap justify-center p-9'>

          {currentItems.map((data, index) => (
            <div className="card w-96 bg-white shadow-3xl mt-5" key={data._id}>
              {/* <figure className="px-10 pt-10">
              <img src={data.images} alt={data.selectedCategory} className="rounded-xl" />
            </figure> */}
              <div className="card-body items-center text-center cursor-pointer"  onClick={() => navigate(`/propertyDetails/${data._id}`)}>
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
        
        {/* </div> */}



      </div>
      <div className='bg-white text-white flex justify-center '>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </div>

    </>

  )
}

export default homeData