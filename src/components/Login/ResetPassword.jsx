import React, { useState } from 'react'
import {toast,Toaster}from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../api/axios'

const ResetPassword = () => {

    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const navigate=useNavigate()

    const user=useParams()
    const userId=user.userId
    console.log(userId);
    

    const submitNewPassword=async()=>{

        if(password&&confirmPassword&& password===confirmPassword){
            await axios.post('/resetPassword',{userId,password}).then((res)=>{
                console.log(res.data.message);
               
                toast(res.data.message)

                setTimeout(() => {
                    navigate('/userLogin')
                }, 4000);
               
                
            })
        
        }else{
            toast.error('password should match')
        }

 
    }


  return (
    <>
    <Toaster toastOptions={{duration:3000}}/>
    <div className="bg-gray-100 h-screen flex items-center justify-center">
  <div className="flex flex-col items-center justify-center bg-white p-10 rounded shadow-md w-full max-w-md">
    <p className="text-lg font-semibold mb-4">Set New Password</p>
    
    <label htmlFor="password" className="self-start text-sm mb-2">New Password</label>
    <input
      id="password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full p-2 mb-4 border border-gray-300 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter new password"
    />
    
    <label htmlFor="confirmPassword" className="self-start text-sm mb-2">Confirm Password</label>
    <input
      id="confirmPassword"
      type="password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      className="w-full p-2 mb-6 border border-gray-300 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Confirm new password"
    />
    
    <button
      onClick={submitNewPassword}
      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
    >
      Submit
    </button>
  </div>
</div>

    </>
  )
}

export default ResetPassword