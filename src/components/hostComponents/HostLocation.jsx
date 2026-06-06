import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { addSelectedLocation } from '../../store/slice/Host'
import { useDispatch, useSelector } from 'react-redux'
import HostNavbar from './HostNavbar'

const HostLocation = () => {
  const hostData = useSelector(state => state.Host);
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [suggetion, setSuggetion] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const reduxLocation = (heading) => {
    if (!location.trim()) {
      alert('Please select a location');
      return;
    }
    dispatch(addSelectedLocation({ selectedLocation: heading, latitude, longitude }));
    navigate('/host/hostAddress');
  };

  const getLocationSuggestions = async (query) => {
    const MAPBOX_API_KEY = import.meta.env.VITE_MAPBOX_API_KEY;
    const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`;
    const params = {
      access_token: MAPBOX_API_KEY,
      types: 'place',
      limit: 5,
      country: 'IN'
    };
    try {
      const response = await axios.get(endpoint, { params });
      console.log('Mapbox response:', response.data.features);
      return response.data.features;
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
      return [];
    }
  };

  const handleLocationSuggestion = async (query) => {
    if (!query || query.trim().length < 2) {
      setLocationSuggestions([]);
      setSuggetion(false);
      return;
    }
    const suggestions = await getLocationSuggestions(query);
    if (suggestions.length > 0) {
      setLocationSuggestions(suggestions);
      setSuggetion(true);
    } else {
      setLocationSuggestions([]);
      setSuggetion(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ fontFamily: '"Roboto Slab", serif' }}>
      <HostNavbar />
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-24">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 w-full max-w-2xl p-8 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: '"Roboto Slab", serif' }}>
            Where is your place located?
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Your address is only shared with guests after they've made a confirmed booking.
          </p>

          <div className="relative w-full">
            <input
              required
              type="text"
              onChange={(e) => {
                setLocation(e.target.value);
                handleLocationSuggestion(e.target.value);
              }}
              value={location}
              placeholder="Search your city or area..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
            />

            {suggetion && locationSuggestions.length > 0 && (
              <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                {locationSuggestions.map((suggestion) => (
                  <li key={suggestion.id}>
                    <button
                      type="button"
                      className="px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-0 w-full text-left"
                      onClick={() => {
                        setSuggetion(false);
                        setLocation(suggestion.place_name);
                        setLocationSuggestions([]);
                        const [long, lat] = suggestion?.geometry.coordinates;
                        setLatitude(lat);
                        setLongitude(long);
                      }}
                    >
                      {suggestion.place_name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Show selected coordinates (optional, for debugging) */}
          {latitude !== 0 && longitude !== 0 && (
            <p className="text-xs text-gray-400 mt-2">
              📍 Lat: {latitude.toFixed(4)}, Lng: {longitude.toFixed(4)}
            </p>
          )}

          <div className="flex justify-between mt-8">
            <button
              className="px-6 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-all"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <button
              className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-xl text-sm transition-all shadow"
              onClick={() => reduxLocation(location)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostLocation;