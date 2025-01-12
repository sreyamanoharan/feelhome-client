import React, { useEffect } from 'react'
import axiosInstance from '../../api/axios'
import { useState } from 'react'
import toast from 'react-hot-toast'


const UserList = () => {

    const [user,setUser]=useState([])
    
    useEffect(()=>{
        axiosInstance.get('/admin/getUser').then((res)=>{
            setUser(res.data.user)
        }).catch((error)=>{
            console.log(error);
        })
    })

    const statusChange = (userId, blocked) => {
        axiosInstance
          .patch(
            '/admin/userStatus',
            { userId, blocked }
          )
          .then((res) => {
            toast.success(res?.data?.message);
            setReload(!reload);
          })
          .catch((err) => {
            if (err?.response?.data?.errmsg) {
              toast.error(err?.response?.data?.errmsg);
            }
          });
      };

  return (
    <>

   
     <div className='bg-white p-5 min-h-full'>
      <a  style={{
          color: 'black',
          cursor: 'pointer',
          fontSize: '24px',
        }}
        >
          User Management
        </a>

  <div className='bg-white h-auto'>
  <div className='bg-white text-gray-900 h-auto'>
  <table className="w-full mt-16 ">
        <thead>
          <tr>
          <th className="px-4 py-2 text-black">Profile Image</th>
            <th className="px-4 py-2 text-black">Name</th>
            <th className="px-4 py-2 text-black">Email</th>
            <th className="px-4 py-2 text-black">Options</th>
          </tr>
        </thead>
        <tbody>
        {user.map((data,index) => (
          <tr key={data._id}> 
          <td className="px-4 py-2 text-center">
                <img src={data?.profileImage} alt={data.profileImage} width="100px" className="mx-auto max-h-24"/>
              </td>
              <td className="px-4 py-2 text-center text-black">{data.name}</td>
              <td className="px-4 py-2 text-center text-black">{data.email}</td>
              <td className="px-4 py-2 text-center text-black">
              {data.isBlocked === false ? (
                 
                <button onClick={() => statusChange(data?._id, data?.isBlocked)}  className="btn bg-[#6AD2FF] text-gray-900  hover:bg-[#6AD2FF]" >
                 Block
                </button>
              ) : (
                <button onClick={() => statusChange(data._id, data.isBlocked)} className="btn bg-[#4318FF] text-gray-900  hover:bg-[#4318FF]">
                  Unblock
                </button>
              )}
            </td>
               
            </tr>
        ))}
        </tbody>
      </table>

  </div>
     
  </div>
    </div>
    </>
  )
}

export default UserList