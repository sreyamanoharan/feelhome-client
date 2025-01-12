import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";


function User_Detail(props) {
  const { token } = useSelector((state) => state.User)
    const [user, setUser] = useState({})

    useEffect(() => {
      axiosInstance.get('/userProfile'
        ).then((res)=>{
          setUser(res?.data?.user)
        }).catch((error) => {
            if (error.response.data) {
                toast.error(error.response.data.errMsg)
            } else {
                toast.error(error.message)
            }
        })
    }, [])

   

    
    const setEdit = props.setEdit;
  
    return (
      <div className='flex justify-center items-center backdrop-blur-sm w-full h-full'>
        <div className="container justify-center py-5">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="p-4 col-span-2">
              <div className=''>
                <div className="card rounded-md bg-opacity-80 bg-white mb-4">
                  <div className='flex justify-end p-2'>
                    <button onClick={() => setEdit(true)} className='bg-transparent text-blue-500 font-semibold hover:text-blue-700'>Edit Profile</button>
                  </div>
                  <div className="card-body text-center">
                      {user.profileImage?<img src={user.profileImage} alt="avatar" className="rounded-md h-40 w-40 mx-auto" />:
                      <img src='../../../../public/images/emptyProfile.webp' alt="avatar" className="rounded-md h-40 w-40 mx-auto" />}
                    <h5 className="my-3 text-blue-gray-900">{user.name}</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 col-span-3">
              <div className="card p-2 rounded-md bg-opacity-80 bg-white mb-4">
                <div className="card-body">
                  <div className="flex items-center">
                    <p className="w-1/3 font-semibold text-blue-gray-900">Full Name</p>
                    <p className="text-black mb-0">{user.name}</p>
                  </div>
                  <hr className="my-2" />
                  <div className="flex items-center">
                    <p className="w-1/3 font-semibold text-blue-gray-900">Email</p>
                    <p className="text-black mb-0">{user.email}</p>
                  </div>
                  <hr className="my-2" />
                  <div className="flex items-center">
                    <p className="w-1/3 font-semibold text-blue-gray-900">Phone</p>
                    <p className="text-black mb-0">{user.PhoneNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default User_Detail;