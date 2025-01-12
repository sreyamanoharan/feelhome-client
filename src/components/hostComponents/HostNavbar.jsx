import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {AiFillPlusSquare} from 'react-icons/ai'


const HostNavbar = () => {
  
  const navigate=useNavigate()
  const location=useLocation()
  const isHostProps=location.pathname==='/host/hostProps'

  return (
   <div className="navbar bg-gray-800 text-white fixed pr-10 h-20 z-50">

   <div className="flex-1">
    <button onClick={()=>{navigate('/')}} className="btn btn-ghost normal-case text-xl"   style={{
    fontFamily: ' "Playwrite ES Deco Guides", serif',
    fontWeight: 400,
    fontStyle: 'normal',
  }}>feelHome</button>
   </div>
   <div className="flex-none">
   <ul className="menu menu-horizontal px-3">
     <li><a href='/host/hostHome' className="text-black hover:bg-gray-600 hover:text-white text-opacity-60 dark:text-opacity-80  transition-colors duration-300" style={{fontFamily: ' "Oswald", serif',}}>Home</a></li>
     <li>
       
         <button onClick={()=>{navigate('/host/hostProps')}} className="text-black hover:bg-gray-600 hover:text-white text-opacity-60 dark:text-opacity-80  transition-colors duration-300" style={{fontFamily: ' "Oswald", serif',}}>My Properties</button>
       
     </li>
  <li>      <button onClick={() => navigate('/host/chat')} className="text-black hover:bg-gray-600 hover:text-white text-opacity-60 dark:text-opacity-80  transition-colors duration-300" style={{fontFamily: ' "Oswald", serif',}}>chat</button>
  </li>
    
    
   </ul>

   {isHostProps && (
    <div className="relative group">
  <a href="/host/hostPage" className="text-2xl">
    <AiFillPlusSquare />
  </a>
  <span className="absolute bottom mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-sm text-white bg-gray-800 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity">
    Add new
  </span>
</div>
  )}

 </div>
 
</div>
  
)
}

export default HostNavbar