"use client";

import { selectToken } from "@/src/redux/auth"; // Hàm selector để lấy token
import { useAppSelector } from "@/src/redux/hooks/useAppStore"; // Hook tùy chỉnh
import axios from "axios";
import React, { useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function History() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = useAppSelector(selectToken); 
  const [history , setHistory ] = useState('');
  useEffect(() => {
    if (!token) {
      console.error("Token không tồn tại");
      return;
    }
    axios
      .get(`${apiUrl}/general/user/subscription-logs`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      })
      .then((response) => {
         setHistory(response.data)
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [apiUrl, token]);
  return (
   <div className="w-3/4 pl-10 pt-16 h-[614px]">
            <ToastContainer />
   <div className="text-white text-xl font-bold">Lịch sử đăng kí gói</div>
      <div className="w-[932px] h-[495px] flex-col justify-center mt-5">
         <table className="table-auto w-full text-center border-separate border-spacing-y-[8px]">
            {/* Header */}
            <thead>
               <tr className="bg-[#1e2329] h-[56px]">
               <th className="text-[#eaecef] text-sm font-normal leading-tight">STT</th>
               <th className="text-[#eaecef] text-sm font-normal leading-tight">Tên gói</th>
               <th className="text-[#eaecef] text-sm font-normal leading-tight">Ngày bắt đầu</th>
               <th className="text-[#eaecef] text-sm font-normal leading-tight">Kết thúc</th>
               <th className="text-[#eaecef] text-sm font-normal leading-tight">Trạng thái</th>
               </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-[#2b3139]">
            {Array.isArray(history) && history.length > 0 ? (
               history.map((item, index) => (
                  <tr className="h-[56px]" key={index}>
                  <td className="text-[#eaecef] text-sm font-normal leading-tight">{index + 1}</td>
                  <td className="text-[#eaecef] text-sm font-normal leading-tight">{item.programName}</td>
                  <td className="text-[#eaecef] text-sm font-normal leading-tight">{item.startDate}</td>
                  <td className="text-[#eaecef] text-sm font-normal leading-tight">{item.endDate}</td>
                  <td className="text-[#eaecef] text-sm font-normal leading-tight">{item.status}</td>
                  </tr>
               ))
            ) : (
               // Hiển thị thông báo khi không có dữ liệu
               <tr>
                  <td colSpan={5} className="text-center text-[#eaecef] text-sm font-normal leading-tight">
                  Không có lịch sử.
                  </td>
               </tr>
            )}
            </tbody>

         </table>
      </div>
   </div>
  )
}
