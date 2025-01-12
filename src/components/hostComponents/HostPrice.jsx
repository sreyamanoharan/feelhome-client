import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addSelectedPrice } from '../../store/slice/Host'
import HostNavbar from './HostNavbar'


const HostPrice = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [price, setPrice] = useState("")

  const handleSubmit = async () => {
    dispatch(addSelectedPrice({selectedPrice: price}))
    navigate('/host/hostDescription')
  }

  return (
    <>
    <HostNavbar/>
    <div className='bg-white h-screen w-full flex flex-col justify-center items-center' style={{fontFamily: '"Roboto Slab", serif'}}>
    <div className='text-center'>
 
    <h1 className='text-gray-900 mt-3 text-3xl'>Now set your place</h1>
    </div>
    <div className="flex flex-col items-center">
    <div className="text-xl font-bold text-green-600 shadow mt-2 shadow-gray-400 rounded-md">₹<input type='number' id="price" className='outline-none p-2 rounded-md bg-white w-28' placeholder='Amount' value={price} onChange={(e) => setPrice(e.target.value)}/></div> 
  
    </div>
    <div className='mt-10 flex gap-16'>
    <button onClick={()=>navigate(-1)} className='bg-gray-900 text-white px-4 py-2'>Back</button>
    <button onClick={async ()=>{
      await handleSubmit()
    }} className='bg-gray-900 text-white px-4 py-2'>Next</button>
    </div>
    </div>
 
    
    </>
  )
}


export default HostPrice