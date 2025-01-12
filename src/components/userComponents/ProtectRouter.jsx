import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'
function ProtectedRoute({children}) {
    
    const user =useSelector((state) => state.User.token) || false;
    console.log("this is token from proteted routere ",user)
  return   user ? children : Navigate({to:'/userLogin'});
  
}

export default ProtectedRoute