import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import HostNavbar from './HostNavbar'
import { IoLocationSharp } from 'react-icons/io5'
import { IoMdArrowDropright } from 'react-icons/io'
import { FiUsers, FiHome, FiDroplet } from 'react-icons/fi'
import { IoBedOutline } from 'react-icons/io5'
import { MdOutlineCategory, MdAttachMoney } from 'react-icons/md'

const PropDetails = () => {
  const [datas, setDatas] = useState({})
  const [selectedImg, setSelectedImg] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    id && axiosInstance.get(`/host/getDetails/${id}`)
      .then((res) => {
        setDatas(res.data.details)
      }).catch(err => {
        console.log(err)
      })
  }, [id])

  const basics = [
    { icon: <FiUsers />,   label: 'Guests',    value: datas?.selectedBasics?.Guests },
    { icon: <FiHome />,    label: 'Bedrooms',  value: datas?.selectedBasics?.Bedrooms },
    { icon: <IoBedOutline />, label: 'Beds',   value: datas?.selectedBasics?.Beds },
    { icon: <FiDroplet />, label: 'Bathrooms', value: datas?.selectedBasics?.Bathrooms },
  ]

  return (
    <>
      <HostNavbar />

      <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 md:px-10 lg:px-20">

        {/* ── Header ── */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">Property Details</p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900" style={{ fontFamily: '"Roboto Slab", serif' }}>
              {datas?.address?.name || '—'}
            </h1>
            <div className="flex items-center gap-1 mt-1 text-gray-500 text-sm">
              <IoLocationSharp className="text-blue-500" />
              <span>{datas?.address?.houseAddress}, {datas?.address?.city}, {datas?.address?.state} – {datas?.address?.pin}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              {datas?.selectedCategory}
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
              ₹{datas?.selectedPrice} / day
            </span>
          </div>
        </div>

        {/* ── Image Grid ── */}
        {datas?.images?.length > 0 && (
          <div className="grid grid-cols-4 gap-2 rounded-2xl overflow-hidden mb-10 h-[420px]">
            {/* Main large image */}
            <div
              className="col-span-2 row-span-2 cursor-pointer overflow-hidden group"
              onClick={() => setSelectedImg(datas.images[0])}
            >
              <img
                src={datas.images[0]}
                alt="main"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Side thumbnails */}
            {datas.images.slice(1, 5).map((img, i) => (
              <div
                key={i}
                className="cursor-pointer overflow-hidden group relative"
                onClick={() => setSelectedImg(img)}
              >
                <img
                  src={img}
                  alt={`img-${i}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {i === 3 && datas.images.length > 5 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">+{datas.images.length - 5} more</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Lightbox ── */}
        {selectedImg && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-6 right-8 text-white text-4xl hover:text-gray-300">&times;</button>
            <img src={selectedImg} alt="full" className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl" />
          </div>
        )}

        {/* ── Main content ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left — details */}
          <div className="lg:col-span-2 space-y-8">

            {/* Basics */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Property Basics</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {basics.map((b, i) => (
                  <div key={i} className="flex flex-col items-center justify-center bg-blue-50 rounded-xl py-5 gap-2">
                    <span className="text-2xl text-blue-700">{b.icon}</span>
                    <span className="text-2xl font-bold text-gray-900">{b.value ?? '—'}</span>
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-blue-900 px-6 py-4">
                <h2 className="text-lg font-bold text-white">What This Place Offers</h2>
              </div>
              <div className="p-6">
                <ul className="grid grid-cols-2 gap-3">
                  {datas?.selectedFeatures?.map((amen, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700 font-medium">
                      <IoMdArrowDropright className="text-blue-600 text-xl flex-shrink-0" />
                      {amen}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Description */}
            {datas?.description && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-3">About This Property</h2>
                <p className="text-gray-600 leading-relaxed">{datas.description}</p>
              </div>
            )}
          </div>

          {/* Right — summary card */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Summary</h2>

              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-500">Category</span>
                  <span className="font-semibold text-gray-900">{datas?.selectedCategory}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-500">Location</span>
                  <span className="font-semibold text-gray-900 text-right max-w-[60%]">{datas?.selectedLocation}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-500">Price</span>
                  <span className="font-bold text-green-700 text-base">₹{datas?.selectedPrice} / day</span>
                </div>
                <hr className="border-gray-100" />
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-500">Guests</span>
                  <span className="font-semibold text-gray-900">{datas?.selectedBasics?.Guests}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-500">Bedrooms</span>
                  <span className="font-semibold text-gray-900">{datas?.selectedBasics?.Bedrooms}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-500">Beds</span>
                  <span className="font-semibold text-gray-900">{datas?.selectedBasics?.Beds}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-500">Bathrooms</span>
                  <span className="font-semibold text-gray-900">{datas?.selectedBasics?.Bathrooms}</span>
                </div>
              </div>

              <button
                onClick={() => navigate(-1)}
                className="mt-6 w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-200 shadow"
              >
                ← Back to Properties
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default PropDetails
