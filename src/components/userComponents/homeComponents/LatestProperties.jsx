import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../api/axios';
import { useNavigate } from 'react-router-dom';

const LatestProperties = () => {
  const [latestProperties, setLatestProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestProperties = async () => {
      try {
        const response = await axiosInstance.get('/latestProperties');
        const sortedProperties = response.data.latestProperties.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setLatestProperties(sortedProperties);
      } catch (error) {
        console.error('Error fetching latest properties:', error);
      }
    };
    fetchLatestProperties();
  }, []);

  return (
    <section className="py-16 bg-white">
      {/* Section heading */}
      <div className="text-center mb-10 px-6">
        <span className="text-blue-600 text-xs font-semibold uppercase tracking-widest">
          Freshly Listed
        </span>
        <h2
          className="text-3xl md:text-4xl font-bold text-gray-900 mt-2"
          style={{ fontFamily: '"Oswald", serif' }}
        >
          Latest Properties
        </h2>
      </div>

      {/* Property grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 md:px-16">
        {latestProperties?.map((data, index) => (
          <div
            key={data._id}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer animate-fade-in-up"
            style={{ animationDelay: `${index * 60}ms`, opacity: 0, animationFillMode: 'forwards' }}
            onClick={() => navigate(`/propertyDetails/${data._id}`)}
          >
            {/* Image */}
            <div className="relative w-full h-48 overflow-hidden">
              <img
                src={data?.images[0]}
                alt={data?.selectedCategory}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-3 right-3 bg-blue-900/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                {data?.selectedCategory}
              </div>
            </div>

            {/* Card body */}
            <div className="p-4">
              <p
                className="text-gray-500 text-sm flex items-center gap-1 mb-1"
                style={{ fontFamily: '"Oswald", serif' }}
              >
                <span className="text-blue-500">📍</span>
                {data?.selectedLocation}
              </p>
              <p
                className="text-lg font-bold text-gray-900"
                style={{ fontFamily: '"Oswald", serif' }}
              >
                ₹{data?.selectedPrice}{' '}
                <span className="text-gray-400 text-sm font-normal">/ day</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Explore all button */}
      <div className="flex justify-center mt-12">
        <button
          onClick={() => navigate('/allProperties')}
          className="border-2 border-blue-900 text-blue-900 font-semibold px-8 py-3 rounded-xl hover:bg-blue-900 hover:text-white transition-all duration-200 shadow-sm"
          style={{ fontFamily: '"Oswald", serif' }}
        >
          Explore All Properties →
        </button>
      </div>
    </section>
  );
};

export default LatestProperties;
