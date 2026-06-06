import { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import { useDispatch } from 'react-redux'
import { userLogin } from '../../../src/store/slice/User'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";



function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reMail, setRemail] = useState(false);
  // const [forgott, setForgott] = useState(false)//
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    if (email.trim().length == 0 || password.trim().length == 0) {
      toast.error('fill all the fields')
    } else {
      axiosInstance.post('/userlogin', { email, password, reMail }).then((res) => {
        if (res.data) {
          console.log(res.data);
          toast.success(res.data.message)
          const name = res.data.name
          const token = res.data.token
          const role = res.data.role
          const userId = res.data.userId
          dispatch(userLogin({ name, token, role, userId }))
          navigate('/')
          console.log('here===');
        } else {
          if (res.status == 400) {
            toast.error(res.data.errmsg)
          }
        }
      }).catch((err) => {
        if (err?.res?.status === 401) {
          setRemail(true)
          toast.error(err?.res.data.errmsg)
        } else if (err?.res?.status === 500) {
          console.log("err")
        } else if (err?.response?.data) {
          toast.error(err?.response?.data?.errmsg)
        }
      })
    }
  }

  const forgotPassword = () => {
    if (email) {
      axiosInstance.post('/forgotPassword', { email }).then((res) => {
        toast.success(res.data.message)
      }).catch((error) => {
        if (error.response.data.errmsg) {
          toast.error(error.response.data.errmsg)
        }

      })
    } else {
      toast.error('enter email')
    }

  }

  const googleSignup = async (credentialResponse) => {
    const { credential } = credentialResponse;

    if (credential) {
      try {
        const decode = jwtDecode(credential);
        const Guser = {
          name: decode.name,
          email: decode.email
        };

        const { data } = await axiosInstance.post("/userGlogin", {
          ...Guser,

        });
        if (data) {
          const name = data.name
          const token = data.token;
          const role = data.role
          const userId = data.userId
          dispatch(userLogin({ name, token, role, userId }))


          toast.success(data.message || "Google login successful");
          navigate("/");
        }

      } catch (error) {
        console.error("Error in googleSignup:", error);
        toast.error(error?.response?.data?.errmsg || "Google login failed. Please try again.");
      }
    } else {
      toast.error("Google login failed. Please try again.");
    }
  };


  return (
    <>
      <Toaster toastOptions={{ duration: 3000 }} />

      <div>
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative" style={{ backgroundImage: "url('/static/image/homestay.jpg')" }}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[3px]"></div>
          <div className="relative flex flex-col justify-center min-h-screen overflow-hidden z-10 w-full items-center px-4">
            <div className="p-8 m-auto bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-md md:w-96 animate-scale-up">
              <h1 className="text-3xl font-bold text-center text-purple-800 tracking-tight">
                Welcome Back
              </h1>
              <p className="text-center text-gray-500 text-sm mt-1 mb-6">Log in to manage your homestay</p>
              
              <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                  <label
                    form="email"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="block w-full px-4 py-2.5 mt-1.5 text-gray-900 bg-white border border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all duration-300 shadow-sm"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    form="password"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="block w-full px-4 py-2.5 mt-1.5 text-gray-900 bg-white border border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all duration-300 shadow-sm"
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex justify-end">
                  <a
                    onClick={() => forgotPassword()}
                    className="text-xs font-medium text-purple-600 hover:text-purple-700 hover:underline cursor-pointer transition-colors duration-200"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="pt-2">
                  <button className="w-full px-4 py-3 text-white font-semibold transition-all duration-300 bg-gradient-to-r from-purple-700 to-purple-600 rounded-xl hover:from-purple-600 hover:to-purple-500 active:scale-[0.98] shadow-lg hover:shadow-purple-500/20">
                    Login
                  </button>
                </div>
              </form>

              <div className="relative flex py-4 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-xs font-medium uppercase">Or continue with</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <div className='flex justify-center mt-1'>
                <GoogleLogin
                  size="large"
                  type="standard"
                  theme="outline"
                  onSuccess={googleSignup}
                  redirect_uri="https://feelhome-client.vercel.app"
                  onError={() => toast.error('Google login failed. Please try again.')}
                />
              </div>

              <p className="mt-8 text-sm font-normal text-center text-gray-600">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="font-semibold text-purple-600 hover:text-purple-700 hover:underline transition-colors duration-200"
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

export default UserLogin
