import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HostNavbar from './HostNavbar';

const HostProps = () => {
  const [datas, setDatas] = useState([]);
  const navigate = useNavigate();

  const userId = useSelector((state) => state.User.userId);

  useEffect(() => {
    axiosInstance
      .get(`/host/getData/${userId}`)
      .then((res) => {
        setDatas(res.data.hostData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    
    <div
      className="bg-white pt-16 h-screen" 
      style={{ fontFamily: '"Roboto Slab", serif' }}
    >
      <div className="bg-white flex flex-col h-auto">

        {datas.length > 0 ?(      <div className="flex flex-wrap justify-center gap-6">
          {datas.map((data) => (
            <div className="card w-96 shadow-2xl mt-16 bg-white" key={data._id}>
              <div className="card-body items-center text-center">
                <h2 className="card-title">
                  <img
                    src={data?.images[0]}
                    alt={data?.selectedCategory}
                    className="rounded-lg w-full h-48 object-cover"
                  />
                </h2>
                <p>{data?.selectedCategory}</p>
                <div className="card-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/host/propDetails/${data._id}`)}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>):(

<p className="text-center text-xl mt-10">
You didn't add any properties yet.
</p>
        )}
  
      </div>
    </div>
  );
};

export default HostProps;
