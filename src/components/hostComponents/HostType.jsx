import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axiosInstance from '../../api/axios';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedCategory } from '../../store/slice/Host';
import { Toaster, toast } from 'react-hot-toast'
import HostNavbar from './HostNavbar';


const HostType = () => {
  const hostData = useSelector(state => state.Host)
  console.log(hostData);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState(null); // To store selected category
  const [selected, setSelected] = useState(null)
  const [Err, setErr] = useState(null)
  
  const dispatch = useDispatch();


  
  const handleNextClick = () => {
    if (selected === null) {
      toast.error('Please select a category before proceeding.'); // Display error message
      return;
    }

      navigate("/host/hostLocation")
  
  };
  
  const reduxCategory=(heading)=>{
    dispatch(addSelectedCategory({selectedCategory:heading}))
  }


  useEffect(() => {
    axiosInstance
      .get('/getCategory')
      .then((res) => {
        setCategory(res.data.category);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (
    <>

      <Toaster toastOptions={{ duration: 3000 }} />
     <HostNavbar/>
      <div className="bg-white h-screen w-full flex flex-col justify-center items-center" style={{fontFamily:' "Roboto Slab", serif'}}>
        <div className="text-center">
          <h1 className="text-gray-900 mt-3 text-3xl">
            Which of these best describes your place
          </h1>
           
          <div>
            <div className="flex">
              {category.map((type,index) => (
                <div 
                  key={index}
                  className={`w-1/3 p-4 border rounded-lg mx-2 ${selected===index ? `bg-gray-400 text-white` : `text-black`} text-center mt-6 ${
                    selectedCategory === type ? 'selected-category' : ''
                  }`}
                  onClick={() =>{ setSelected(index); reduxCategory(type.heading);  }} // Pass the selected category
                >
                   {selectedCategory === type && (
                  <div className="selected-tick">✔</div> // Selected tick animation
                   )}
                  <div className="text-3xl ">
                    <img src={type.categoryImage} alt={type.heading} />
                  </div>
                  <div className="">{type.heading}</div>
                </div>
              ))}
              
            </div>
          </div>
        </div>
        
        <div className="bg-black w-full mt-16 relative">
          <div className="h-px w-30/100 bg-black"></div>
          <div className="h-px w-70/100 bg-black"></div>
        </div>
        <div className="mt-12">
        <button className="bg-gray-900 text-white px-4 py-2" onClick={()=>navigate("/host/hostPlace")}>
            back
          </button>
          <button className="bg-gray-900 text-white ml-10 px-4 py-2" onClick={handleNextClick}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default HostType;
