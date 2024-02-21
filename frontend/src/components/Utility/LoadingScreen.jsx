import React from 'react';

const LoadingScreen = ({ isLoading }) => {
  return (
    <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center ${isLoading ? '' : 'hidden'}`}>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        <p className="text-gray-900 text-lg mt-4">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;