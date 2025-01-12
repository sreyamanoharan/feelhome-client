import React from 'react'
import  { useState} from 'react'
import axiosInstance from '../../api/axios'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { adminLogin } from '../../store/slice/Admin'

const AdminLogin = () => {
 

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const dispatch=useDispatch()
    const navigate = useNavigate()

    async function handleLogin(e){
        e.preventDefault()
       
    console.log(email,password,"fffffffffff");
    axiosInstance.post('/admin/adminlogin', {email,password}).then((res)=>{
      if(res.data){
         const email=res.data.email
         const token=res.data.token
         const role=res.data.role
        
         dispatch(adminLogin({email,token,role}))
        navigate('/admin/home')
        console.log('here===');
      }else{
       if(res.status==400){
          toast.error(res.data.errmsg)
       }
      }
    }).catch ((err)=>{
     console.log(err);
    })
  
}
  return (
   
    <>
    
    <div>
  
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{backgroundImage: "url('/static/image/homestay.jpg')"}}>
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden ">
    <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl p-65">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
           Log in
        </h1>
        <form className="mt-6" onSubmit={handleLogin}>
            <div className="mb-2">
                <label
                    form="email"
                    className="block text-sm font-semibold text-gray-800"
                >
                    Email
                </label>
                <input
                    onChange={(e)=>setEmail(e.target.value)}
                    type="email"
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>
            <div className="mb-2">
                <label
                    form="password"
                    className="block text-sm font-semibold text-gray-800"
                >
                    Password
                </label>
                <input
                onChange={(e)=>setPassword(e.target.value)}
                    type="password"
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>
            <a
                href="#"
                className="text-xs text-purple-600 hover:underline"
            >
                Forget Password?
            </a>
            <div className="mt-6">
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                    Login
                </button>
            </div>
        </form>

       
    </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default AdminLogin