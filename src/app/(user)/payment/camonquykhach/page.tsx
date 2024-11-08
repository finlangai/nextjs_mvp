// components/ChucMung.tsx
'use client'
import React from 'react';

const ChucMung = () => {

  const handleGoHome = () => {
    window.location.href = '/dashboard'; 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
      <div className="text-center p-10 rounded-lg shadow-xl bg-white bg-opacity-80 max-w-lg mx-auto">
        
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse mb-6">
          🎉 Chúc Mừng Bạn 🎉
        </h1>
        
        <p className="mt-5 text-xl text-gray-800 font-medium animate-fadeIn">
          Bạn đã là thành viên của fiin town.
        </p>
        
        <div className="mt-10">
          <button
            onClick={handleGoHome}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400"
          >
            Quay về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChucMung;
