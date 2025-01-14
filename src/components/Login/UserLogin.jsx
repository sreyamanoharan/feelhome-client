import { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import { useDispatch } from 'react-redux'
import { userLogin } from '../../../src/store/slice/User'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";



function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reMail, setRemail] = useState(false);
  const [forgott, setForgott] = useState(false)
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
    console.log("hi");

    const { credential } = credentialResponse;
    console.log(credential);

    console.log(credential);

    if (credential) {
      try {
        const decode = jwtDecode(credential);
        console.log(decode);

        const Guser = {
          name: decode.name,
          email: decode.email,
          password: decode.email.split("@")[0]
        };
        console.log("Guser", Guser);

        const { data } = await axiosInstance.post("/userGlogin", {
          ...Guser,

        });
        console.log(data);

        if (data) {
          console.log(data);
          const name = data.username
          const GsignCheck = data.email;
          const token = data.token;
          const role = data.role
          const userId = data.userId
          dispatch(userLogin({ name, token, role, userId }))


          localStorage.setItem(
            "user",
            JSON.stringify(token, GsignCheck)
          );
          navigate("/");
        }

      } catch (error) {
        console.error("Error in googleSignup:", error);
      }
    } else {
      console.error("Credential is null");
    }
  };


  return (
    <>
      <Toaster toastOptions={{ duration: 3000 }} />

      <div>

        <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/static/image/homestay.jpg')" }}>
          <div className="relative flex flex-col justify-center min-h-screen overflow-hidden ">
            <div className=" p-6 m-auto bg-white rounded-md shadow-md w-[100%] md:w-96 ">
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
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <a
                  onClick={() => forgotPassword()}
                  className="text-xs text-purple-600 hover:underline cursor-pointer"
                >
                  Forget Password?
                </a>
                <div className="mt-6">
                  <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                    Login
                  </button>
                </div>
              </form>
              <div className='mt-3'>


                <GoogleOAuthProvider clientId="161297492569-lrbkhcpraa639qn64m7eav401ethrh55.apps.googleusercontent.com" >
                  <GoogleLogin
                    size="medium"
                    type="standard"
                    theme="outline"
                    onSuccess={googleSignup}
                    onError={() => {
                    }}

                  />
                </GoogleOAuthProvider>
              </div>
              <p className="mt-8 text-xs font-light text-center text-gray-700">
                {" "}
                Don't have an account?{" "}
                <a
                  href="/register"
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

export default UserLogin