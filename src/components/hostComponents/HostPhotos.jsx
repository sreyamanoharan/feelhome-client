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
  const [errorMessage, setErrorMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleImageUpload = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    setUploadedImages(fileArray);
    setErrorMessage('');
    setIsSubmitted(false);
  };

  const handleImageSubmit = async () => {
    if (uploadedImages.length < 5) {
      setErrorMessage('Please upload at least 5 images.');
      return;
    }

    setIsUploading(true);
    setErrorMessage('');

    try {
      await Promise.all(
        uploadedImages.map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'feelHome');
          const result = await axios.post(
            'https://api.cloudinary.com/v1_1/ds0dvm4ol/image/upload?upload_preset=feelHome',
            formData
          );
          dispatch(addImage({ images: result.data.secure_url }));
        })
      );

      setUploadedImages([]);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Image upload failed:', error);
      setErrorMessage('Failed to upload images. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ fontFamily: '"Roboto Slab", serif' }}>
      <HostNavbar />
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-24">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 w-full max-w-2xl p-8 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: '"Roboto Slab", serif' }}>
            Add some photos of your property
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Upload at least 5 photos. Great photos help guests imagine staying at your place.
          </p>

          {/* Upload area — hide while uploading or after submitted */}
          {!isUploading && !isSubmitted && (
            <label className="block border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-2xl p-8 text-center cursor-pointer transition-all">
              <div className="text-4xl mb-2">📷</div>
              <p className="text-gray-500 text-sm font-medium">Click to upload photos</p>
              <p className="text-gray-400 text-xs mt-1">JPG, PNG, WEBP supported</p>
              <input
                type="file"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}

          {errorMessage && (
            <p className="text-red-500 text-sm mt-3">{errorMessage}</p>
          )}

          {/* Loader */}
          {isUploading && (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <div className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-gray-500 font-medium">Uploading your photos, please wait...</p>
            </div>
          )}

          {/* Local preview before submit */}
          {!isUploading && uploadedImages.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mt-4">
              {uploadedImages.map((image, index) => (
                <div key={index} className="rounded-lg overflow-hidden h-20">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`uploaded-${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Cloudinary uploaded previews */}
          {!isUploading && hostData.images && hostData.images.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mt-4">
              {hostData.images.map((imageName, index) => (
                <div key={index} className="rounded-lg overflow-hidden h-20">
                  <img
                    src={`${imageName}`}
                    alt={`saved-${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Success message after upload */}
          {isSubmitted && (
            <div className="flex items-center gap-2 mt-4 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <span className="text-green-500 text-lg">✅</span>
              <p className="text-green-700 text-sm font-medium">
                Photos uploaded successfully! You can proceed to next step.
              </p>
            </div>
          )}

          {/* Submit button — hide after submitted or while uploading */}
          {!isSubmitted && !isUploading && (
            <div className="flex gap-3 justify-end mt-4">
              <button
                className="px-4 py-2 border border-blue-900 text-blue-900 text-sm rounded-xl hover:bg-blue-50 transition-all disabled:opacity-50"
                onClick={handleImageSubmit}
                disabled={uploadedImages.length === 0}
              >
                Submit Images
              </button>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-all"
            >
              Back
            </button>
            <button
              onClick={() => navigate('/host/hostFinish')}
              disabled={!isSubmitted}
              className={`px-6 py-2.5 text-white font-semibold rounded-xl text-sm transition-all shadow
                ${isSubmitted 
                  ? 'bg-blue-900 hover:bg-blue-800 cursor-pointer' 
                  : 'bg-gray-300 cursor-not-allowed'
                }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostPhotos;