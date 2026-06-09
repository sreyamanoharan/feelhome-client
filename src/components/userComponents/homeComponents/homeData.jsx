import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import Pagination from './pagination';
import { IoLocationSharp } from 'react-icons/io5';
import { FiSearch, FiFilter } from 'react-icons/fi';

const ITEMS_PER_PAGE = 8;

const HomeData = () => {
  const { token } = useSelector((state) => state.User);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [locationSearchTerm, setLocationSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/getData', {
      headers: { authorization: `Bearer ${token}` }
    }).then((res) => {
      setDatas(res.data.hostData);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    });
  }, []);

  const filteredDatas = datas.filter((data) =>
    data?.selectedLocation?.toString().toLowerCase().includes(locationSearchTerm.toLowerCase()) &&
    data?.selectedCategory?.includes(categoryFilter)
  );

  const totalPages = Math.ceil(filteredDatas.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredDatas.slice(indexOfFirstItem, indexOfLastItem);

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
    setCurrentPage(1);
  };

  const handleLocationSearch = (val) => {
    setLocationSearchTerm(val);
    setCurrentPage(1);
  };

  const categories = Array.from(new Set(datas.map((d) => d.selectedCategory)));

  return (
    <>
      <Toaster toastOptions={{ duration: 3000 }} />

      <div className="min-h-screen bg-gray-50 pt-20 pb-16">

        {/* ── Page header ── */}
        <div className="px-6 md:px-14 pt-6 pb-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">Browse</p>
          <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: '"Oswald", serif' }}>
            All Properties
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {filteredDatas?.length} {filteredDatas?.length === 1 ? 'property' : 'properties'} found
          </p>
        </div>

        {/* ── Filters bar ── */}
        <div className="px-6 md:px-14 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            {/* Category filter */}
            <div className="flex items-center gap-2 flex-1">
              <FiFilter className="text-blue-600 flex-shrink-0" />
              <select
                id="categoryFilter"
                value={categoryFilter}
                onChange={(e) => handleCategoryFilter(e.target.value)}
                className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              >
                <option value="">All Categories</option>
                {categories?.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Location search */}
            <div className="flex items-center gap-2 flex-1">
              <FiSearch className="text-blue-600 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search by location..."
                value={locationSearchTerm}
                onChange={(e) => handleLocationSearch(e.target.value)}
                className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
          </div>
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && filteredDatas.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center px-6">
            <div className="text-5xl mb-4">🔍</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No properties found</h2>
            <p className="text-gray-500 text-sm">Try adjusting your filters or search term.</p>
          </div>
        )}

        {/* ── Property grid ── */}
        {!loading && currentItems.length > 0 && (
          <div className="px-6 md:px-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentItems?.map((data, index) => (
                <div
                  key={data._id}
                  onClick={() => navigate(`/propertyDetails/${data._id}`)}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${index * 40}ms`, opacity: 0, animationFillMode: 'forwards' }}
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

                  {/* Body */}
                  <div className="p-4">
                    <div
                      className="flex items-center gap-1 text-gray-500 text-sm mb-1"
                      style={{ fontFamily: '"Oswald", serif' }}
                    >
                      <IoLocationSharp className="text-blue-500 flex-shrink-0" />
                      <span className="truncate">{data?.selectedLocation}</span>
                    </div>
                    <p
                      className="text-gray-900 font-bold text-base"
                      style={{ fontFamily: '"Oswald", serif' }}
                    >
                      ₹{data?.selectedPrice}
                      <span className="text-gray-400 text-sm font-normal"> / day</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default HomeData;
