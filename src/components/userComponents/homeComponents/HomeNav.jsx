import React from 'react'
import daisyui from 'daisyui'
import {AiFillHome} from 'react-icons/ai'
import {GiTreehouse} from 'react-icons/gi'
import {TbBeachOff} from 'react-icons/tb'
import {GiCampingTent} from 'react-icons/gi'
import {MdHouseboat} from 'react-icons/md'
import {MdMeetingRoom} from 'react-icons/md'


const HomeNav = () => {

  return (
    <div>
    <div>
    <div className="navbar bg-white mt-0.5">
    <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>I</a></li>
        <li>
          <a>P</a>
          <ul className="p-2">
            <li><a>S</a></li>
            <li><a>S</a></li>
          </ul>
        </li>
        <li><a>I</a></li>
      </ul>
    </div>
    
  </div>
  <div className="navbar-center hidden lg:flex">
  <ul className="menu menu-horizontal px-1">
    <li>
      <a className="text-black hover:bg-gray-600 hover:text-white text-opacity-60 dark:text-opacity-80  transition-colors duration-300 } ">
        <GiTreehouse />Treehouse
      </a>
    </li>
    <li>
      <a className="text-black hover:bg-gray-600 hover:text-white text-opacity-60 dark:text-opacity-80  transition-colors duration-300">
        <TbBeachOff />Beach
      </a>
    </li>
    <li>
      <a className="text-black hover:bg-gray-600 hover:text-white text-opacity-60 dark:text-opacity-80  transition-colors duration-300">
        <GiCampingTent />Camping
      </a>
    </li>
    <li>
      <a className="text-black hover:bg-gray-600 hover:text-white text-opacity-60 dark:text-opacity-80  transition-colors duration-300">
        <MdHouseboat />Houseboat
      </a>
    </li>
    <li>
      <a className="text-black hover:bg-gray-600 hover:text-white text-opacity-60 dark:text-opacity-80  transition-colors duration-300">
        <MdMeetingRoom />Room
      </a>
    </li>
  </ul>
</div>



  <div className="navbar-end">
    <a className=""></a>
  </div>
</div>
    </div>
    </div>
  )
}

export default HomeNav