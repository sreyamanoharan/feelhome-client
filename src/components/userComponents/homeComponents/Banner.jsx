import React, { useEffect, useState } from 'react'
import beach from '../../../../src/images/beach.jpeg'
import treehouse from '../../../../src/images/treehouse.png'
import { Typography } from "@material-tailwind/react";
import axiosInstance from '../../../api/axios';


import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { Autoplay, FreeMode, Pagination } from 'swiper/modules';





import { useSelector } from 'react-redux';

const Banner = () => {

  const [banners, setBanners] = useState([])
  const userId = useSelector(state => state.User.userId)



  useEffect(() => {
    axiosInstance.get('/banners').then(res => {
      setBanners(res.data.banners)
      console.log(res.data.banners, 'lllloooooooo')
    }).catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <>

<Swiper
  loop={true}
  
  autoplay={{
    delay: 2500,
    disableOnInteraction: false,
  }}
  slidesPerView={2}
  spaceBetween={3}
  freeMode={true}
  pagination={{
    clickable: true,
  }}
  modules={[FreeMode, Pagination, Autoplay]}
  className="mySwiper mt-16"
>
  {banners.map((banner) => (
    <SwiperSlide className="relative">
      <div className="image-container w-full h-[500px]"> {/* Define the container size */}
        <img
          src={banner.bannerImage}
          alt="Banner"
          className="object-cover w-full h-full" // Ensures the image fits within the container
        />
      </div>
      <div className="absolute inset-0 bg-black/50">
        <div className="absolute bottom-40 left-4">
          <Typography
            variant="h1"
            color="white"
            className="mb-4 text-3xl md:text-4xl lg:text-5xl break-words"
            style={{ fontFamily: '"Caveat", serif' }}
          >
            {banner.mainHeading}
          </Typography>
          <Typography
            variant="lead"
            color="primary"
            className="text-left text-black pr-8"
            style={{
              fontFamily: '"Caveat", serif',
              fontSize: '1.1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              padding: '0.2rem 0.5rem',
              lineHeight: '1.8',
              boxDecorationBreak: 'clone',
              WebkitBoxDecorationBreak: 'clone',
              display: 'inline',
              maxWidth: '10px',
            }}
          >
            &quot;{banner.description}&quot;
          </Typography>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>








      {/* <div className='bg-white h-full mt-28'> 
     <div className='mx-16 bg-white'>
     <div className='lg:flex bg-white'> 

   
      {banners.map(banner=>(
    <Carousel key={banner._id} className="rounded-xl">
   
      <div className="relative h-full w-full">
        <img
          src={banner.bannerImage}
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl break-words"
            >
             {banner.mainHeading}
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80 break-words"
            >
             {banner.description}
            </Typography>
          </div>
        </div>
      </div>
    </Carousel>
    ))}

      </div>
   
    </div>

</div>  */}

    </>
  );
}

export default Banner