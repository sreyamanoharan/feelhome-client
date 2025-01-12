import React from 'react'
import Home from '../../../public/static/image/superhost.webp'
import map from '../../../public/static/image/map.png'



const HostHome = () => {

  return (

    <>
      <div className='bg-white flex h-screen'>
        <div className='bg-white flex w-full h-full justify-end items-center' >

          <div className='bg-white w-72 h-24' style={{fontFamily: '"Libre Baskerville", serif'}}>

            <p className='text-center text-4xl text-red-600'> feelHome</p>
            <p className='text-center text-3xl text-gray-900 mt-1'>You can earn...</p>
          </div>
        </div>
        <div className='bg-white w-full h-screen flex items-center' >


          <img className='bg-orange-400 h-5/6 w-9/12' src={map} />
        </div>

      </div>
      <div>
        <p></p>
      </div>
      <div className='bg-white w-full h-auto flex px-10'>
        <img src={Home}></img>
        <div className='text-gray-900 px-12' style={{fontFamily: '"Inconsolata", serif'}}>

          <p className='text-2xl font-bold mb-4'> Unlock Earning Opportunities with Your Property</p>

          <p className='text-base py-5'>Step into a world of possibilities feelHome, where your property isn't just a space—it's a lucrative asset waiting to be explored! Immerse yourself in our dynamic community and unearth the thrill of earning effortlessly through renting out your space.</p>
          <p className='text-xl py-5'>Why Opt for Property Rental on Our Platform?</p>

          <p className='py-1'>Monetize Your Dwelling: From spare rooms to luxurious homes, every nook of your property holds the potential for steady earnings. Let your space work for you and generate income effortlessly.</p>
          <p className='py-1'> Tailor Your Rates: Take charge of your earnings by setting personalized rental prices and terms. Our platform empowers you to tailor rates to your liking, whether you're offering short-term escapes or long-term stays.</p>
          <p className='py-1'> Global Visibility: Cast a wide net and showcase your property to a global audience. Our user-friendly interface ensures that your space is easily discoverable, maximizing your chances of attracting the right guests.</p>
       <p className='py-1'> Secure Transactions: Rest easy knowing that our secure payment system safeguards every transaction. Focus on providing an exceptional hosting experience while we take care of the financial details.</p>
        </div>
      </div>
      
      <div className='bg-white w-full h-auto text-gray-900 ' style={{fontFamily: '"Inconsolata", serif'}}>
        <h1 className='text-2xl font-bold mb-4 text-center pt-10'>How It Works:</h1>
        <div className='px-12 pb-10 py-5'>
        <p>Craft Your Listing: Create an enticing listing that showcases the unique charm of your space. Let your property's personality shine through with captivating photos</p>
        <p className='pt-4'>Effortless Hosting: Extend a warm welcome to your guests and ensure they have an unforgettable stay. Our platform streamlines communication, and our support team is ready to assist you every step of the way.</p>
        </div>

      </div>

    </>
  )
}

export default HostHome





