import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import HostNavbar from './HostNavbar'

const HostStPlace = () => {

  
  const navigate= useNavigate()
  return (
    <>
    <HostNavbar/>
    <div className='bg-white h-screen w-full flex flex-col justify-center items-center' style={{fontFamily:' "Roboto Slab", serif'}}>

    <div className='text-center'>
      <a className='text-gray-900 text-xl'>Step 2</a>
    
      <h1 className='text-gray-900 mt-3 text-3xl'>Make your place stand out</h1>
      <div className='flex justify-start '>
      <h3 className='text-gray-900 mt-8 text-xl'>
        in this step, you'll add some of the amenities your place
        <br />
       offers, plus 5 or more photos. Then you'll create a title and 
        <br />
        description
      </h3>
      </div>
      
    </div>
   
    <div className="bg-gray-900 w-full mt-16 relative">
    <div className="h-px w-30/100 bg-black"></div>
    <div className="h-px w-70/100 bg-black"></div>
  </div>
  
    <div className='mt-12 flex gap-16'>
    <button onClick={()=>navigate(-1)} className='bg-gray-900 text-white px-4 py-2'>Back</button>
    <button onClick={()=>navigate('/host/hostAmenities')} className='bg-gray-900 text-white px-4 py-2'>Next</button>
    </div>
    </div>
    </>
  )
}

export default HostStPlace