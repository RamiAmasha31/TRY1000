// ReservationFormFields.js
import React from 'react';

const ReservationFormFields = ({ formData, handleInputChange }) => {
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor="name" className="text-sm font-semibold text-[#eba000]">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="px-3 py-2 border rounded-md focus:outline-none text-black" required />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-semibold text-[#eba000]">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="px-3 py-2 border rounded-md focus:outline-none text-black" required />
      </div>
      <div className="flex flex-col">
        <label htmlFor="phoneNumber" className="text-sm font-semibold text-[#eba000]">Phone Number:</label>
        <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="px-3 py-2 border rounded-md focus:outline-none text-black" required />
      </div>
    </>
  );
};

export default ReservationFormFields;
