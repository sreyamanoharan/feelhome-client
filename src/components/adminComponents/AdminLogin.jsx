import React from 'react'
import  { useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axiosInstance from '../../api/axios'
import { Toaster,toast } from 'react-hot-toast'

const AdminLogin = () => {
     
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const  navigate = useNavigate()

    async function handleLogin(e){
       e.preventDefault()
       if(email.trim().length==0||password.trim().length==0){
        toast.error('fill all the fields')
       }else{
        axiosInstance.post('/admin/adminLogin',{email,password}).then((res)=>{
            if(res.data){
                navigate('/admin/home')
            }
        })
       }
    }
   

  return (
    <>
    <Toaster toastOptions={{duration:3000}}/>
    <div>
  
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{backgroundImage: "url('/public/image/homestay.jpg')"}}>
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

        <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Don't have an account?{" "}
            <a
                href="#"
                className="font-medium text-purple-600 hover:underline"
            >
                Sign up
            </a>
        </p>
    </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default AdminLogin