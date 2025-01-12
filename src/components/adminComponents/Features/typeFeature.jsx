// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import axiosInstance from '../../../api/axios';
// import { toast } from 'react-hot-toast';

// const TypeFeature = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [type, setType] = useState([]);
//   const [heading, setHeading] = useState('');
//   const [loading, setLoading] = useState('');
//   const [modalOpen, setModalOpen] = useState(false);
//   const [message, setMessage] = useState('');
//   const [reload, setReload] = useState(false);

//   const uploadImagesToCloudinary = async (files) => {
//     const imageUrl = [];
//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('upload_preset', 'feelhomeimage');

//       try {
//         const result = await axios.post(
//           'https://api.cloudinary.com/v1_1/ds0dvm4ol/image/upload?upload_preset=feelHome',
//           formData
//         );
//         imageUrl.push(result.data.secure_url);
//       } catch (error) {
//         console.error('Error uploading image:', error);
//       }
//     }
//     return imageUrl;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setReload(!reload);
//     setLoading('addingCategory');

//     try {
//       const uploadedImageUrls = await uploadImagesToCloudinary([selectedFile]);

//       const formData = new FormData();
//       formData.append('heading', heading);
//       formData.append('typeImage', uploadedImageUrls[0]);
//       const inputObject = Object.fromEntries(formData);
//       console.log(inputObject);
//       const response = await axiosInstance.post('/admin/addType', inputObject);
//       if (response.data.type) {
//         setType([
//           response.data.banner,
//           ...type,
//         ]);
//         toast.success('Type added successfully!');
//       }
//       setModalOpen(false);

//       setHeading('');
//       setSelectedFile(null);
//     } catch (error) {
//       setMessage('Error adding banner. Please try again.');
//       console.log(error);
//     }
//   };

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   return (
//     <>
//       <div style={{ background: 'white', minHeight: '100vh', padding: '20px' }}>
//         <div style={{ textAlign: 'center' }}>
//           <a
//             style={{
//               color: 'black',
//               cursor: 'pointer',
//               fontSize: '24px',
//             }}
//           >
//             Type Management
//           </a>
//         </div>
//         <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
//           <button className="btn btn-active btn-accent" onClick={() => setModalOpen(true)} style={{ marginRight: '10px' }}>
//             Add New Type
//           </button>
//         </div>

//         <div>
//           <table className="w-full mt-16 border border-red-500">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2 text-black">Image</th>
//                 <th className="px-4 py-2 text-black">Heading</th>
//                 <th className="px-4 py-2 text-black">Options</th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* Map through bannerData to populate the table rows */}
//             </tbody>
//           </table>
//         </div>

//         {modalOpen && (
//           <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
//             <div className="bg-white text-black font-semibold p-8 rounded-lg shadow-md text-center">
//               <h1 className="text-xl font-semibold mb-4">Add New Type</h1>
//               {message && <p>{message}</p>}
//               <form action="submit" method="POST" onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                   <label htmlFor="categoryImage" className="block">
//                     Image:
//                   </label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     id="categoryImage"
//                     onChange={handleFileChange}
//                     required
//                     className="border p-2 w-full"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label htmlFor="heading" className="block">Heading:</label>
//                   <input
//                     type="text"
//                     id="heading"
//                     value={heading}
//                     onChange={(e) => setHeading(e.target.value)}
//                     required
//                     className="border p-2 w-full"
//                   />
//                 </div>

//                 <div className="flex justify-center space-x-4 items-center">
//                   <button
//                     className="bg-gray-800 btn text-white"
//                     type="submit"
//                   >
//                     {loading !== 'addingBanner' ?
//                       'Add New Banners' :
//                       <>
//                         <p className="w-5 h-5 rounded-full border-4 border-t-transparent border-white animate-spin" />
//                         PROCEEDING
//                       </>
//                     }
//                   </button>
//                   <button
//                     className="btn btn-secondary bg-red-500 text-white hover:bg-red-600"
//                     onClick={() => setModalOpen(false)}
//                   >
//                     Close
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default TypeFeature;
