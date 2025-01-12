// import React, { useState } from 'react';
// import axios from 'axios';

// const AddBanner = () => {
//   const [bannerImage, setBannerImage] = useState(null);
//   const [mainHeading, setMainHeading] = useState('');
//   const [description, setDescription] = useState('');
//   const [message, setMessage] = useState('');
//   const [banner, setBanner] = useState([]);

//   const handleFileChange = async (e) => {
  
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('bannerImage', bannerImage);
//     formData.append('mainHeading', mainHeading);
//     formData.append('description', description);
//     formData.append('imageUrls', JSON.stringify(banner)); // Pass the image URLs to the backend

//     axios.post('/api/addBanner', formData)
//       .then((response) => {
//         setMessage('Banner added successfully!');
//       })
//       .catch((error) => {
//         setMessage('Error adding banner. Please try again.');
//         console.error('Error adding banner:', error);
//       });
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'black' }}>
//       <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
//         <h1>Add New Banner</h1>
//         {message && <p>{message}</p>}
//         <form onSubmit={handleSubmit}>
//           <div style={{ marginBottom: '15px' }}>
//             <label htmlFor="bannerImage">Banner Image:</label>
//             <input type="file" accept="image/*" id="bannerImage" onChange={handleFileChange} required />
//           </div>
//           <div style={{ marginBottom: '15px' }}>
//             <label htmlFor="mainHeading">Main Heading:</label>
//             <input type="text" id="mainHeading" value={mainHeading} onChange={(e) => setMainHeading(e.target.value)} required />
//           </div>
//           <div style={{ marginBottom: '15px' }}>
//             <label htmlFor="description">Description:</label>
//             <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
//           </div>
//           <button className="btn btn-active btn-accent" type="submit" style={{ marginRight: '10px' }}>Add New Banners</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddBanner;
