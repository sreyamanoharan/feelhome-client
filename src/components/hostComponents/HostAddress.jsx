import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addAddress } from '../../store/slice/Host'
import { useDispatch, useSelector } from 'react-redux'
import HostNavbar from './HostNavbar'

const HostAddress = () => {
  const hostData = useSelector(state => state.Host);
  const [address, setAddress] = useState({ name: '', houseAddress: '', city: '', state: '', pin: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const reduxAddress = (e) => {
    e.preventDefault();
    dispatch(addAddress({ address }));
    navigate('/host/hostBasics');
  };

  const fields = [
    { label: 'Property Name',  id: 'name',         name: 'name',         value: address.name },
    { label: 'House Address',  id: 'houseAddress',  name: 'houseAddress', value: address.houseAddress },
    { label: 'City',           id: 'city',          name: 'city',         value: address.city },
    { label: 'State',          id: 'state',         name: 'state',        value: address.state },
    { label: 'Pin Code',       id: 'pin',           name: 'pin',          value: address.pin },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ fontFamily: '"Roboto Slab", serif' }}>
      <HostNavbar />
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-24">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 w-full max-w-2xl p-8 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: '"Roboto Slab", serif' }}>
            Confirm your address
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Make sure your address is accurate so guests can find your place easily.
          </p>

          <form onSubmit={reduxAddress}>
            <div className="space-y-4">
              {fields.map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    id={field.id}
                    name={field.name}
                    value={field.value}
                    onChange={handleAddressChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-all"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-xl text-sm transition-all shadow"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HostAddress;
