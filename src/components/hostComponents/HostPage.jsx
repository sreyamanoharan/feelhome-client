import React from 'react'
import HostNavbar from './HostNavbar'

const HostPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ fontFamily: '"Roboto Slab", serif' }}>
      <HostNavbar />
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-24">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 w-full max-w-2xl p-8 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: '"Roboto Slab", serif' }}>
            Tell us about your place
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            In this step, we'll ask you which type of property you have and if guests will book the entire place
            or just a room. Then let us know the location and how many guests can stay.
          </p>
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl">
              🏠
            </div>
          </div>
          <div className="flex gap-3 justify-end mt-8">
            <a
              href="/host/hostType"
              className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-xl text-sm transition-all shadow"
            >
              Next
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HostPage
