import React, { useEffect,useState } from 'react'
import axiosInstance from '../../../api/axios';
import { Link } from 'react-router-dom';


const PaymentDetails = () => {
   const [loading,setLoading]=useState()
   const [err,setErr]=useState()
   const [room,setRoom]=useState()


  useEffect(()=>{
   const data=axiosInstance.get('/getroombyId').then((res)=>{
    setRoom(res.data.data)
    console.log(data);
    setLoading(false)
   })

  })

  return (
    <div className='bg-white h-screen'>
    
    </div>
  )
}

export default PaymentDetails