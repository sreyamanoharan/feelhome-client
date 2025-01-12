import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { adminLogout } from '../../store/slice/Admin';
import { useDispatch } from 'react-redux';


const AdminNav = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()


  return (
    <>
      <div className="drawer lg:drawer-open bg-white">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col ">
          {/* Page content here */}
          <Outlet />
          {/* <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}

        </div>
        <div className="drawer-side" >
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-blue-gray-900 text-gray-900 t ">
            {/* Sidebar content here */}
            
            <li className='mt-28'><button  onClick={()=>navigate('/admin/home')} className="text-lg font-bold">Dashboard</button></li>
            <li><button  onClick={()=>navigate('/admin/userList')} className="text-lg font-bold">User Management</button></li>
            <li><button  onClick={()=>navigate('/admin/categoryList')} className="text-lg font-bold">Category Management</button></li>
            <li><button  onClick={()=>navigate('/admin/MainFeature')} className="text-lg font-bold">Feature Management</button></li>
            <li><button  onClick={()=>navigate('/admin/MainBanner')} className="text-lg font-bold">Banner Management</button></li>
            <button className='text-white bg-gray-900 mt-32 w-40 h-8 rounded' onClick={()=>{dispatch(adminLogout()) ,navigate('/admin/adminLogin')}}>Log Out</button>
          </ul>
         
        </div>
       
      </div>
    </>
  )
}

export default AdminNav