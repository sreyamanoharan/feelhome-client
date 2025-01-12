import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addImage } from '../../store/slice/Host';
import axios from 'axios';
import HostNavbar from './HostNavbar';

const HostPhotos = () => {
  const hostData = useSelector(state => state.Host);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  const handleImageUpload = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    setUploadedImages(fileArray);
    setErrorMessage(''); // Clear error message when new files are added
  };

  const reduxImage = (imageArray) => {
    const imageStrings = imageArray.map((image) => {
      URL.createObjectURL(image);
    });

    dispatch(addImage({ images: imageStrings }));
  };

  const handleImageSubmit = async () => {
    if (uploadedImages.length < 5) {
      setErrorMessage('Please upload at least 5 images.'); // Show error if fewer than 5 images
      return;
    }

    console.log("Submitting images...");
    return new Promise((resolve, reject) => {
      if (uploadedImages.length === 0) {
        resolve(true);
      }

      uploadedImages.map(async (file, index) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'feelhomeimage');
        const result = await axios.post(
          'https://api.cloudinary.com/v1_1/ds0dvm4ol/image/upload?upload_preset=feelHome',
          formData
        );
        console.log(result.data.secure_url);
        dispatch(addImage({ images: result.data.secure_url }));
        if (uploadedImages.length === index + 1) {
          setUploadedImages([]);
          resolve(true);
        }
      });
    });
  };

  return (
    <>
    <HostNavbar/>
      <div
        className='bg-white h-screen w-full flex flex-col justify-center items-center'
        style={{ fontFamily: '"Roboto Slab", serif' }}
      >
        <h1 className='text-gray-900 mt-3 text-3xl leading-loose'>
          Add Some photos of your Property
        </h1>
        <div>
          <input type="file" multiple onChange={handleImageUpload} />
          {errorMessage && (
            <p className="text-red-500 mt-2">{errorMessage}</p>
          )}
          {/* Display redux images with previews */}
          <div style={{ display: 'flex', marginTop: '10px' }}>
            {hostData.images &&
              hostData.images.map((imageName, index) => (
                <div key={index} style={{ marginRight: '10px' }}>
                  <img
                    src={`${imageName}`}
                    alt={`uploaded-${index}`}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              ))}
          </div>

          {/* Display uploaded images with previews */}
          <div style={{ display: 'flex', marginTop: '10px' }}>
            {uploadedImages.map((image, index) => (
              <div key={index} style={{ marginRight: '10px' }}>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`uploaded-${index}`}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                  }}
                />
                <p>state</p>
              </div>
            ))}
          </div>

          <button
            className='bg-gray-900 p-2 text-white'
            onClick={async () => await handleImageSubmit()}
          >
            Submit Images
          </button>
        </div>
        <div className='mt-12 flex gap-14'>
          <button
            onClick={() => navigate(-1)}
            className='bg-gray-900 text-white px-4 py-2'
          >
            Back
          </button>
          <button
            onClick={() => navigate('/host/hostFinish')}
            className='bg-gray-900 text-white px-4 py-2'
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default HostPhotos;

        {/* <div className='bg-white h-screen w-full flex flex-col justify-center items-center'>
    
          <div className='text-center'>
    
            <h1 className='text-gray-900 mt-3 text-3xl'>Add some photos</h1>
            <div className="border border-gray-300 rounded p-4 mt-6 mb-7 ">
              <div className='flex justify-center '>
                <div>
    
                  <label
                    htmlFor="file-input"
                    className="photo-upload-button relative inline-block cursor-pointer mt-6 mb-8 ml-8 mr-8"
                  >
                    <div className="add-photo-icon w-40 h-40 bg-gray-300 text-gray-600 flex justify-center items-center text-4xl">
                      +
                    </div>
    
                    <input
                      type="file"
                      id="file-input"
                      accept="image/*"
                      onChange={(e) => {
                        const selectedImages = e.target.files
                        const imageArray = Array.from(selectedImages)
                        reduxImage(imageArray)
                      }}
                      className="hidden"
                    />
    
                  </label>
                </div>
              </div>
            </div>
    
    
    
          </div>
    
          <div className="bg-gray-900 w-full mt-16 relative">
            <div className="h-px w-30/100 bg-gray-900"></div>
            <div className="h-px w-70/100 bg-gray-900"></div>
          </div>
    
          <div className='mt-12'>
            <a onClick={()=>navigate('/hostFinish')} className='bg-gray-900 text-white px-4 py-2'>Next</a>
          </div>
        </div> */}