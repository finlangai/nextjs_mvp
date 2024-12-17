'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const CallBackUrlPayMent = () => {
  const [outcome, setOutcome] = useState<string | null>(null);

  // Kiểm tra nếu đang ở client để sử dụng useSearchParams
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const outcomeParam = searchParams.get('outcome');
      setOutcome(outcomeParam);
    }
  }, []);

  const getMessage = () => {
    switch (outcome) {
      case 'REGISTRATION_SUCCESS':
        return {
          message: 'Chúc mừng! Bạn đã trở thành hội viên.',
          type: 'success'
        };
      case 'REGISTRATION_FAILED':
        return {
          message: 'Rất tiếc, việc thanh toán không thành công. Vui lòng thử lại.',
          type: 'error'
        };
      default:
        return {
          message: 'Đang xử lý...',
          type: 'info'
        };
    }
  };

  const { message, type } = getMessage();

  useEffect(() => {
    if (typeof window !== 'undefined' && outcome) {
      window.opener?.postMessage(outcome === 'REGISTRATION_SUCCESS' ? 'success' : 'failure', 'https://fintown.software');
    }
  }, [outcome]);

  const handleCloseTab = () => {
    if (typeof window !== 'undefined') {
      window.opener?.postMessage('tabClosed', 'https://fintown.software');
      window.close();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div
        className={`max-w-md p-8 rounded-lg shadow-xl text-center transform transition-all duration-500 ${type === 'success'
          ? 'bg-green-100 text-green-800 scale-105'
          : type === 'error'
            ? 'bg-red-100 text-red-800 scale-95'
            : 'bg-blue-100 text-blue-800'}`}
      >
        <h1 className="text-3xl font-semibold mb-4">{`Thanh toán kết thúc`}</h1>
        <p className="text-xl mb-6">{message}</p>

        <button
          className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          onClick={handleCloseTab} 
        >
          Đóng tab
        </button>
      </div>
    </div>
  );
};

export default CallBackUrlPayMent;
