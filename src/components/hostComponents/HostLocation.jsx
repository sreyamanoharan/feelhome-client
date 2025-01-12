import React from 'react'
import {useNavigate} from 'react-router-dom'
import map from './../../../public/static/image/map.png'
import { useState } from 'react'
import axios from 'axios'
import { addSelectedLocation } from '../../store/slice/Host'
import { useDispatch, useSelector } from 'react-redux';
import HostNavbar from './HostNavbar'

const HostLocation = () => {

const hostData=useSelector(state=>state.Host)
console.log(hostData);
    
const [location,setLocation]=useState('')
const [latitude,setLatitude]=useState(0)
const [longitude,setLongitude]=useState(0)
const [suggetion,setSuggetion] = useState(false)
const [locationSuggestions,setLocationSuggestions]=useState([])
const [selectedLocation,setSelectedLocation]=useState('')
const [selectedLocationHeading,setSelectedLocationHeading]=useState('')
const navigate=useNavigate()
const dispatch = useDispatch();

const reduxLocation=(heading)=>{
    dispatch(addSelectedLocation({selectedLocation:heading}))
    navigate('/host/hostAddress')
  }

const getLocationSuggestions = async (query) => {
    const MAPBOX_API_KEY = 'pk.eyJ1IjoibmloYWxyb3NoYW4iLCJhIjoiY2xsZGIyNW5wMGFxMjN1cXkwZm5reHlrdSJ9.l2JGuFbgbkgYWJl4vDOUig';
    const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`;
    const params = {
        access_token: MAPBOX_API_KEY,
        types: 'place', // Limit results to places only
        limit: 5, // Number of suggestions to retrieve
        country:"IN"
    };

    try {
        const response = await axios.get(endpoint, { params });
        return response.data.features;
    } catch (error) {
        console.error('Error fetching location suggestions:', error);
        return [];
    }
};

// Function to handle location suggestion selection
const handleLocationSuggestion = async (query) => {
    // Get location suggestions when the user types
    const suggestions = await getLocationSuggestions(query); 
    setLocationSuggestions(suggestions);
};

  return (
    <>
    <HostNavbar/>
    <div className='bg-white h-screen w-full flex flex-col justify-center items-center' style={{fontFamily:' "Roboto Slab", serif'}}>

    <div className='text-center'>
    
      <h1 className='text-gray-900 mt-3 text-3xl'>Where is your place Located?</h1>
      <div className='w-full '>
      <div className='flex justify-center mt-8 h-80 w-full' style={{backgroundImage:'url("./../../../public/static/image/map.png")'}}>
      <div className='w-80 flex md:grid-cols-2 gap-6 justify-center'>
      <div className="text-sm w-full relative">
     
      <input required type='text' 
       
         onChange={(e) => {
          setSuggetion(true)
          setLocation(e.target.value);
          handleLocationSuggestion(e.target.value); // Fetch suggestions as the user types
      }}
      value = {location}
       

       placeholder="Location" className={`w-full text-sm mt-2 p-5 bg-white flex border border-boarder text-black bg-main`}/>
        {/* Display location suggestions */}
        <ul className='absolute z-0 mt-2 w-full bg-main border border-border rounded-lg shadow-lg text-black'>
             {
                          suggetion && locationSuggestions.map((suggestion) => (
                              <li key={suggestion.id}
                              className="p-2 hover:bg-subMain bg-white hover:bg-gray-200 cursor-pointer"
                              >
                                  {/* Assuming you want to display the place name as a suggestion */}
                                  <button
                                      type="button"
                                      onClick={() => {
                                          setSuggetion(false)
                                          setLocation(suggestion.place_name); // Update the input field with the selected suggestion
                                          setLocationSuggestions([]); // Clear the suggestions list
                                          // Now you can also get the longitude and latitude from suggestion.geometry.coordinates
                                          const [long, lat] = suggestion?.geometry.coordinates;
                                          setLatitude(lat)
                                          setLongitude(long)
                                      }}
                                  >
                                      {suggestion.place_name}
                                  </button>
                              </li>
                          ))}
                      </ul>
      </div>
      </div>
      </div>
      </div>
    
    </div>

    <progress className="w-full mt-5">
    <div className="bg-black w-40%"></div>
    <div className="bg-red-700 w-60%"></div>
  </progress>
  

 
    <div className='mt-12 '>
    <button  onClick={()=>navigate(-1)}  className='bg-gray-900 text-white  px-4 py-2'>Back</button>
    <button onClick={()=>reduxLocation(location)}  className='bg-gray-900 text-white px-4 ms-10 py-2'>Next</button>
    </div>
    </div>

    </>
  )
}

export default HostLocation