import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../../../api/axios';
import { toast } from 'react-hot-toast';
import { RiDeleteBin6Line } from "react-icons/ri";




const MainBanner = () => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [bannerData, setBannerData] = useState([]);
  const [mainHeading, setMainHeading] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [reload, setReload] = useState(false)




  const handleModalOpen = () => {
    setModalOpen(true);
  };


  const uploadImagesToCloudinary = async (files) => {
    const imageUrl = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'feelhomeimage');

      try {
        console.log('kkkkkkk ');
        const result = await axios.post(
          'https://api.cloudinary.com/v1_1/ds0dvm4ol/image/upload?upload_preset=feelHome',
          formData
        );
        console.log('jjjjj');
        console.log(result.data.secure_url);
        imageUrl.push(result.data.secure_url);
      } catch (error) {
        // Handle error here if needed
        console.error('Error uploading image:', error);
      }
    }

    return imageUrl;
  };

  const bannerSubmit = async (id) => {

    try {
      console.log('banner submit ...ooooo', id);
      const status = await axiosInstance.patch(`/admin/banner?id=${id}`)
      if (typeof status.data.disable !== 'undefined') {
        setBannerData((prev) => (prev.filter((bann) => {
          if (bann._id == id) bann.bannerStatus = status.data.disable
          return bann
        })))
      } else {
        if (status.data.errmsg) toast.error(status.data.errmsg)
      }
      console.log(status, 'banner status');
    } catch (error) {
      if (error.response.data.errmsg) toast.error(error.response.data.errmsg)
      console.error(error);
    }

  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    setReload(!reload)
    setLoading('addingBanner')

    try {
      const uploadedImageUrls = await uploadImagesToCloudinary([selectedFile]);

      const formData = new FormData();
      formData.append('mainHeading', mainHeading);
      formData.append('description', description);
      formData.append('bannerImage', uploadedImageUrls[0]);
      const inputObject = Object.fromEntries(formData)
      const response = await axiosInstance.post('/admin/banner', inputObject);
      if (response.data.banner) {
        setBannerData([response.data.banner,
        ...bannerData
        ]);
        toast.success('Banner added successfully!')
      }
      setModalOpen(false)


      setMainHeading('');
      setDescription('');
      setMessage('Error adding banner. Please try again.');
      console.log(error);
    } catch (error) {
      setMessage('Error adding banner. Please try again.');
      console.log(error);
    }
  };

  useEffect(() => {
    axiosInstance.get('/admin/banner')
      .then((res) => {
        setBannerData(res.data.bannerData);
        console.log(res.data.bannerData);

      })
      .catch((error) => {
        console.error('Error fetching banner data:', error);
      });
  }, []);

  


  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };


  const deleteBanner = async (id) => {
    console.log(id, 'delete banner');

    const res=await axiosInstance.delete(`/admin/banner?id=${id}`)
    setBannerData((prev) =>
      prev.filter((bann) => bann._id !== id) 
    );
      }

  




  return (
    <>
      <div className='bg-[#f4f7fe] p-5 h-full'>
        <div style={{ textAlign: 'center' }}>
          <a
            style={{
              color: 'black',
              cursor: 'pointer',
              fontSize: '24px',
            }}
          >
            Banner Management
          </a>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <button className="btn btn-active btn-accent" onClick={handleModalOpen} style={{ marginRight: '10px' }}>
            Add New Banners
          </button>
        </div>

        <div className='bg-white text-gray-900'>
          <table className="w-full mt-16 ">
            <thead>
              <tr>
                <th className="px-4 py-2 text-black">Image</th>
                <th className="px-4 py-2 text-black">Main Heading</th>
                <th className="px-4 py-2 text-black">Description</th>
                <th className="px-4 py-2 text-black">Options</th>

              </tr>
            </thead>
            <tbody>
              {bannerData.map((data, index) => (
                <tr key={data._id}>
                  <td className="px-4 py-2 text-center">
                    <img src={data.bannerImage} alt="" width="100px" className="mx-auto" />
                  </td>
                  <td className="px-4 py-2 text-center text-black">{data.mainHeading}</td>
                  <td className="px-4 py-2 text-center text-black whitespace-normal break-all max-w-sm max-h-1 overflow-y-auto">{data.description}</td>
                  <td className="px-4 py-2 text-center text-black">
                    {data.bannerStatus === true ? (
                      <a onClick={() => bannerSubmit(data._id)} className="btn btn-secondary">
                        Disable
                      </a>
                    ) : (
                      <a onClick={() => bannerSubmit(data._id)} className="btn btn-primary">
                        Enable
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-2"><RiDeleteBin6Line className="text-black text-2xl hover:text-red-500 cursor-pointer" onClick={() => { deleteBanner(data._id) }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {modalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white text-black font-semibold p-8 rounded-lg shadow-md text-center">
              <h1 className="text-xl font-semibold mb-4">Add New Banner</h1>
              {message && <p>{message}</p>}
              <form action='submit' method='POST' onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="bannerImage" className="block">Banner Image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    id="bannerImage"
                    onChange={handleFileChange}
                    required
                    className="border p-2 w-full"
                  />
                </div>
                <div className="mb-4 bg-white text-black">
                  <label htmlFor="mainHeading" className="block">Main Heading:</label>
                  <input
                    type="text"
                    id="mainHeading"
                    value={mainHeading}
                    onChange={(e) =>

                      setMainHeading(e.target.value)}
                    required
                    className="border p-2 w-full bg-white text-black"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="block">Description:</label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="border p-2 w-full bg-white"
                  />
                </div>
                <div className='flex - justify-center space-x-4 items-center'>
                  <button
                    className=" bg-gray-800 btn text-white "
                    type="submit"
                  >
                    {loading !== 'addingBanner' ?
                      'Add New Banners' : <><p className='w-5 h-5 rounded-full border-4 border-t-transparent border-white animate-spin' />PROSEEDING</>}
                  </button>
                  <button
                    className="btn btn-secondary bg-red-500 text-white hover:bg-red-600"
                    onClick={() => setModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MainBanner;

