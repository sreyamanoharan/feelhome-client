import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedCategory } from '../../store/slice/Host';
import { Toaster, toast } from 'react-hot-toast';
import HostNavbar from './HostNavbar';

const HostType = () => {
  // const hostData = useSelector(state => state.Host);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();

  const handleNextClick = () => {
    if (selected === null) {
      toast.error('Please select a category before proceeding.');
      return;
    }
    navigate('/host/hostLocation');
  };

  const reduxCategory = (heading) => {
    dispatch(addSelectedCategory({ selectedCategory: heading }));
  };

  useEffect(() => {
    axiosInstance.get('/getCategory').then((res) => {
      setCategory(res.data.category);
    }).catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ fontFamily: '"Roboto Slab", serif' }}>
      <Toaster toastOptions={{ duration: 3000 }} />
      <HostNavbar />
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-24">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 w-full max-w-2xl p-8 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: '"Roboto Slab", serif' }}>
            Which of these best describes your place?
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Choose the category that best matches your property type.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {category.map((type, index) => (
              <div
                key={index}
                className={`border-2 rounded-2xl p-4 cursor-pointer transition-all flex flex-col items-center gap-2 text-sm font-medium ${
                  selected === index
                    ? 'border-blue-900 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
                onClick={() => { setSelected(index); setSelectedCategory(type); reduxCategory(type.heading); }}
              >
                <img src={type.categoryImage} alt={type.heading} className="w-12 h-12 object-contain" />
                <span>{type.heading}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              className="px-6 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-all"
              onClick={() => navigate('/host/hostPlace')}
            >
              Back
            </button>
            <button
              className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-xl text-sm transition-all shadow"
              onClick={handleNextClick}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostType;
