import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import HostNavbar from './HostNavbar'


const PropDetails = () => {
  const [datas, setDatas] = useState({})
  const [reload, setReload] = useState(false)
  const { id } = useParams()
  console.log(id);
  const navigate = useNavigate()
  useEffect(() => {
    id && axiosInstance.get(`/host/getDetails/${id}`)
      .then((res) => {
        setDatas(res.data.details)
        console.log(res.data.details, 'asdfghjkl');
      }).catch(err => {
        console.log(err);
      })
  }, [id])



  return (
     <>
   
   <HostNavbar/>
    <div className="bg-white h-screen flex flex-col justify-center items-center pt-20" style={{ fontFamily: '"Satisfy", serif' }}>
 
      <h1 className="text-3xl text-black" >Property Details</h1>
      <div className="bg-white mt-6 mb-10">

        <div className="mt-8 flex flex-col items-center" >
          <div className="w-1/2">
            <div className="grid grid-cols-5 gap-3">
              {datas?.images?.map((img, index) => (

                <img key={index} src={img} alt="" />
              ))}
            </div>
          </div>
          <div className="w-1/2 text-xl border flex flex-col text-left pt-10 pl-20" >
            <ul>
              <li>Property Name : {datas?.address?.name}</li>
              <li className="text-black">
                Address : {datas?.address?.houseAddress},
                {datas?.address?.city},{datas?.address?.state},
                {datas?.address?.pin}
              </li>
              <li className="text-black">Category     : {datas.selectedCategory}</li>
              <li className='flex text-center'>Amenities :   {datas?.selectedFeatures?.map((amen, index) => (
                <p className="" key={index}>{amen} , </p>
              ))}</li>
              <li className="text-black">Location   : {datas.selectedLocation}</li>
              <li className="text-black">Basics   :
                <ul className='ml-10'>
                  <li> Guests- {datas?.selectedBasics?.Guests} </li>
                  <li>  Bedrooms -{datas?.selectedBasics?.Bedrooms}</li>
                  <li>  Beds -{datas?.selectedBasics?.Beds}</li>
                  <li>  Bathrooms -{datas?.selectedBasics?.Bathrooms}</li>
                </ul>
                <li className="text-black">Price per day  : ₹{datas.selectedPrice}</li>

              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
    </>
  );
}

export default PropDetails;