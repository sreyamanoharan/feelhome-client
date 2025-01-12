import React from 'react'
import Navbar from '../../components/userComponents/homeComponents/Navbar'
import Banner from '../../components/userComponents/homeComponents/Banner'
import LatestProperties from '../../components/userComponents/homeComponents/LatestProperties'


export const Home= () => {

  return (
    <div>
    <Navbar/>
    {/* <HomeNav/> */}
    <Banner/>
    <LatestProperties/>

    </div>
  )
}
export default Home


