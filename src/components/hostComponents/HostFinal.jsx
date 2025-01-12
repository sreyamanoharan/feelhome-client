import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
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
    width: "20px",
    height: "20px",
    perspective: "700px",
    colors: ["#000", "#333", "#666"]
  };
  const navigate= useNavigate()
  const dispatch=useDispatch()

  const userEmail=useSelector(state=>state.User.userId)
  const hostData=useSelector(state=>state.Host)
  const userName=useSelector(state=>state.User.name)
  console.log(userName);
  console.log(hostData,userEmail,'here is the hostDatasssssss');

    const [happy,setHappy]=useState(false)
    const handleSubmit = async () => {
      console.log(hostData,'hellll there,,....');
      
      await axiosInstance.post('/host/postData',{hostData,userEmail})
      dispatch(reduxClear({}))
      setHappy(true)
      setTimeout(() => {
        navigate('/host/hostHome')
      }, 4000);
    }

  return (
    <>
     <div className='bg-white h-screen w-full flex flex-col justify-center items-center' style={{fontFamily: '"Roboto Slab", serif'}}>

<div className='text-center'>
  <a className='text-gray-900 text-3xl'>Congratulations {userName}</a>

  <h2 className='text-gray-900 mt-3 text-2xl'>Your Property Hasbeen Added to feelHome</h2>
 
</div>

<div className="bg-gray-900 w-full mt-16 relative">
<div className="h-px w-30/100 bg-gray-900"></div>
<div className="h-px w-70/100 bg-gray-900"></div>
</div>

<div className='mt-12 cursor-pointer'>
    <button onClick={handleSubmit} className='bg-gray-900 text-white px-4 py-2'>go back to home</button>
    {/* <Confetti  active={true}  config={ config }/> */}
    <Confetti active={ happy } />
    </div>
</div>

    </>
  )
}

export default HostFinal