import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addSelectedFeature } from '../../store/slice/Host'
import HostNavbar from './HostNavbar'

const HostAmenities = () => {
  const [feature, setFeature] = useState([]);
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();

  const manageSelected = (feat) => {
    if (selected.includes(feat)) {
      setSelected(selected.filter(item => item !== feat));
    } else {
      setSelected([...selected, feat]);
    }
  };

  useEffect(() => {
    axiosInstance.get('/getFeature').then((res) => {
      setFeature(res.data.feature);
    }).catch(err => console.log(err));
  }, []);

  const handleSubmit = () => {
    selected.forEach(item => dispatch(addSelectedFeature({ selectedFeature: item })));
    navigate('/host/hostPhotos');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ fontFamily: '"Roboto Slab", serif' }}>
      <HostNavbar />
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-24">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 w-full max-w-2xl p-8 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: '"Roboto Slab", serif' }}>
            What does your place offer?
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Select all the amenities available at your property. You can update these anytime.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {feature.map((feat, index) => {
              const isSelected = selected.includes(feat);
              return (
                <div
                  key={feat.id || index}
                  className={`relative border-2 rounded-2xl p-4 cursor-pointer transition-all flex flex-col items-center gap-2 text-sm font-medium ${
                    isSelected ? 'border-blue-900 bg-blue-50 text-blue-900' : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                  onClick={() => manageSelected(feat)}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-blue-900 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</div>
                  )}
                  <img src={feat.featureImage} alt={feat.heading} className="w-12 h-12 object-contain" />
                  <span>{feat.heading}</span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between mt-8">
            <button onClick={() => navigate(-1)} className="px-6 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-all">Back</button>
            <button onClick={handleSubmit} className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-xl text-sm transition-all shadow">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostAmenities;
