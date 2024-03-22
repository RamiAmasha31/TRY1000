import React from 'react';

const CustomAlertModal = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-white p-8 rounded-lg">
        <p className="text-lg text-black">{message}</p>
        <button onClick={onClose} className="px-4 py-2 bg-[#eba000] text-white rounded-md hover:bg-[#00df988d] focus:outline-none focus:bg-blue-600 mt-4">OK</button>
      </div>
    </div>
  );
};

export default CustomAlertModal;