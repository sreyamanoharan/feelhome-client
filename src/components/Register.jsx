import React, { useState } from 'react'
import axios  from 'axios';
import axiosInstance from '../api/axios'
import { Navigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'



const Register = () => {

  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [ConfirmPassword, setConfirmPassword] = useState('')  
  const [Err, setErr] = useState(null)

  const regex_password = /^(?=.*?[A-Z])(?=.*[a-z])(?=.*[0-9]){8,16}/
  const regex_mobile = /^\d{10}$/
  const nameRegex = /^[a-zA-Z]+$/

  const clearForm = () => {
    setName('');
    setEmail('');
    setPhoneNumber('');
    setPassword('');
    setConfirmPassword('');
    setErr(null);
  };

  const handleSubmit = async () => {


    try {
      await axiosInstance.post('/register', { name, email, PhoneNumber, password }).then((res)=>{

      
        if (res.data.message) {
          toast.success(res.data.message);
          clearForm ()
        }
      }).catch((err)=>{
        if(err.response.status===404){
          Navigate('/serverError')
        }else if(err?.response?.data){
          toast.error(err?.response?.data?.message)
        }
      })


    } catch (error) {
      console.error('Error:',error.message)
    }
  };


  function singUp(e) {
    e.preventDefault()

    if (name.trim().length == 0 || email.trim().length == 0 || PhoneNumber.trim().length == 0 || password.trim().length == 0 || ConfirmPassword.trim().length == 0) {
      setErr('fill all the fields')
    } else {
      if(!nameRegex.test(name)){
        setErr('Invalid name format. Only letters are allowed.')
      }else if (regex_mobile.test(PhoneNumber) == false) {
        setErr('wrong Mobile')
      } else if (regex_password.test(password) == false) {
        setErr('Use Strong password');
      } else if (password != ConfirmPassword) {
        setErr('password doesnnot match');
      } else {
        setErr('')
        handleSubmit()
      }

    }


  }


  return (
    <>
      <Toaster toastOptions={{ duration: 3000 }} />
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/static/image/homestay.jpg')" }}>
        <div className="relative flex flex-col justify-center overflow-hidden ml-auto  w-1/3">


          <div className="w-full p-6 m-auto h bg-white rounded-md shadow-md lg:max-w-xl p-65">
            <h1 className="text-3xl font-semibold text-center bg-opacity-75 text-red-500 underline">
              Register
            </h1>
            <form className="mt-6" onSubmit={singUp}>
              <div className="mb-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-800 text-opacity-200"
                >
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="PhoneNumber"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                   value={PhoneNumber}
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Password
                </label>
                <input
                  type="password"
                 value={password}
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-800"
                >
                  ConfirmPassword
                </label>
                <input
                  type="password"
                  value={ConfirmPassword}
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

              </div>
          
              <div className='flex justify-center'>
                <span className='text-red-600 text-sm'>{Err ? Err : '[password should contain A-Z&a-z&1-9]'}</span>
              </div>
              <div className="mt-6">
                <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                  Register
                </button>
              </div>
            </form>

            <p className="mt-8 text-xs font-light text-center text-gray-700 opacity-100">
              {" "}
              Already have an account?{" "}
              <a
                href="/userLogin"
                className="font-medium text-purple-600 hover:underline opacity-100"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default Register;












