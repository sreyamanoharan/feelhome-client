import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'

function AdminProtected({children}){
     
    const admin=useSelector((state)=>state.Admin.token)||false;
    console.log('admin tokennnnnnnn',admin);
    return admin ? children :Navigate ({to: '/adminLogin'})

}

export default AdminProtected