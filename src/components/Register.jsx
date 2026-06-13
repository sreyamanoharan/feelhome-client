import React, { useState } from 'react'
import axios from 'axios';
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
      await axiosInstance.post('/register', { name, email, PhoneNumber, password }).then((res) => {
        console.log(res, 'ressss');

        if (res.data.message) {
          toast.success(res.data.message, { duration: 60000 });
          clearForm()
        }
      }).catch((err) => {
        if (err.response.status === 404) {
          Navigate('/serverError')
        } else if (err?.response?.data) {
          toast.error(err?.response?.data?.message)
        }
      })


    } catch (error) {
      console.error('Error:', error.message)
    }
  };


  function singUp(e) {
    e.preventDefault()
    if (name.trim().length == 0 || email.trim().length == 0 || PhoneNumber.trim().length == 0 || password.trim().length == 0 || ConfirmPassword.trim().length == 0) {
      setErr('fill all the fields')
    } else {
      if (!nameRegex.test(name)) {
        setErr('Invalid name format. Only letters are allowed.')
      } else if (regex_mobile.test(PhoneNumber) == false) {
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
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative" style={{ backgroundImage: "url('/static/image/homestay.jpg')" }}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[3px]"></div>
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden z-10 w-full lg:w-[45%] lg:ml-auto items-center px-4 lg:pr-20">

          <div className="w-full max-w-md p-8 m-auto bg-white rounded-2xl shadow-2xl border border-gray-100 animate-scale-up">
            <h1 className="text-3xl font-bold text-center text-red-500 tracking-tight">
              Create Account
            </h1>
            <p className="text-center text-gray-500 text-sm mt-1 mb-6">Join FeelHome and explore stays</p>

            <form className="space-y-4" onSubmit={singUp}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  className="block w-full px-4 py-2 mt-1.5 text-gray-900 bg-white border border-gray-300 rounded-xl focus:border-red-400 focus:ring-4 focus:ring-red-100 focus:outline-none transition-all duration-300 shadow-sm"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="PhoneNumber"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  value={PhoneNumber}
                  className="block w-full px-4 py-2 mt-1.5 text-gray-900 bg-white border border-gray-300 rounded-xl focus:border-red-400 focus:ring-4 focus:ring-red-100 focus:outline-none transition-all duration-300 shadow-sm"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="10 digit number"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  className="block w-full px-4 py-2 mt-1.5 text-gray-900 bg-white border border-gray-300 rounded-xl focus:border-red-400 focus:ring-4 focus:ring-red-100 focus:outline-none transition-all duration-300 shadow-sm"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  className="block w-full px-4 py-2 mt-1.5 text-gray-900 bg-white border border-gray-300 rounded-xl focus:border-red-400 focus:ring-4 focus:ring-red-100 focus:outline-none transition-all duration-300 shadow-sm"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label
                  htmlFor="ConfirmPassword"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={ConfirmPassword}
                  className="block w-full px-4 py-2 mt-1.5 text-gray-900 bg-white border border-gray-300 rounded-xl focus:border-red-400 focus:ring-4 focus:ring-red-100 focus:outline-none transition-all duration-300 shadow-sm"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <div className='flex justify-center text-center'>
                <span className='text-red-500 text-xs font-medium'>{Err ? Err : 'Password should contain A-Z, a-z & 1-9'}</span>
              </div>
              <div className="pt-2">
                <button type='submit' className="w-full px-4 py-3 text-white font-semibold transition-all duration-300 bg-gradient-to-r from-red-500 to-rose-500 rounded-xl hover:from-red-600 hover:to-rose-600 active:scale-[0.98] shadow-lg hover:shadow-red-500/20">
                  Register
                </button>
              </div>
            </form>

            <p className="mt-8 text-sm font-normal text-center text-gray-600">
              Already have an account?{" "}
              <a
                href="/userLogin"
                className="font-semibold text-red-500 hover:text-red-600 hover:underline transition-colors duration-200"
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












