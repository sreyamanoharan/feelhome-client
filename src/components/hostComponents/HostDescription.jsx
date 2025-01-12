import React, { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { addDescription } from '../../store/slice/Host'
import { useNavigate } from 'react-router-dom'
import HostNavbar from './HostNavbar'

const HostDescription = () => {

  const hostData=useSelector(state=>state.Host)
  const [description,setDescription]=useState(null)

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const reduxDescription=async()=>{
    console.log(description,'kkkkkkk00000');
    
    dispatch(addDescription({description:description}))
    navigate('/host/hostFinal')
  }
  return (
    <>
    <HostNavbar/>
    <div className='bg-white h-screen w-full flex flex-col justify-center items-center' style={{fontFamily:' "Roboto Slab", serif'}}>
    <p className='text-3xl' style={{fontFamily:' "Roboto Slab", serif'}}>Tell more about your property</p>
        <div>
        <textarea placeholder='tell about your plce' className='bg-white text-black mt-10 h-20 w-[350px]' value={description} onChange={(e)=>setDescription(e.target.value)}/>
    </div>
    <div className='mt-10 flex gap-16'>
    <button onClick={()=>navigate(-1)} className='bg-gray-900 text-white px-4 py-2'>Back</button>
    <button onClick={async ()=>{
      await reduxDescription()
    }} className='bg-gray-900 text-white px-4 py-2'>Next</button>
    </div>
    </div>
    </>
  )
}

export default HostDescription