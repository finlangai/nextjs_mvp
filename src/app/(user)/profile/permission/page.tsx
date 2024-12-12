"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/src/redux/store";
import { updateUserInformation, updateUserAvatar, fetchUserProfile } from "@/src/redux/auth/authSlice";
import { useFormik } from "formik"; 
import * as Yup from "yup";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Permission() {
  

    return (
      <div className="w-3/4 pl-10 pt-16 h-[614px]">
      <ToastContainer />
      <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-xl font-bold">Quyền hạn sử dụng</div>
      <div className="w-[900px] h-[519px] flex gap-10 py-10 items-stretch">
        <div className="grow shrink basis-0 self-stretch pb-[109px] rounded-[10px] h-[519px] border border-fintown-br dark:border-fintown-br-light flex-col justify-start items-center gap-[29px]">
          <div className="self-stretch h-[198px] pl-[27px] pr-[26px] py-[21px] border-b border-fintown-br dark:border-fintown-br-light flex justify-center items-center">
            <div className="w-[220px] h-[156px] flex flex-col justify-center items-center"> {/* Cập nhật flex-col */}
               <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-base font-semibold text-center"> {/* Căn giữa văn bản */}
                  Basic
               </div>
               <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-2xl font-semibold text-center  py-5 "> {/* Căn giữa văn bản */}
                  Miễn phí
               </div>
               <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium text-center"> {/* Căn giữa văn bản */}
                  Được nhận các đặt quyền cơ bản.
               </div>
               <div className="px-[67px] pt-[11px] pb-2.5 bg-[#848e9c] rounded-lg  flex justify-center items-center my-3"> {/* Căn giữa nội dung button */}
                  <div className="text-white text-xs font-medium">
                  Nâng cấp ngay
                  </div>
               </div>
            </div>
          </div>
          <div className="h-[183px] flex-col justify-end items-start gap-6 pt-5">
            <ul className="space-y-6">
               <li className="flex gap-[15px] h-[30px] ml-5">
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  style={{ fill: "#25b770" }} 
                  className="w-6 h-6"
                  >
                  <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
                  </svg>
                  <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium">
                  Nhận dữ liệu báo cáo tài chính của 30 công ty trong rổ VN30.
                  </div>
               </li>
               <li className="flex gap-[15px] h-[30px] ml-5">
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  style={{ fill: "#25b770" }} // Màu xanh lá
                  className="w-6 h-6"
                  >
                  <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
                  </svg>
                  <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium">
                  Nhận thông tin chi tiết về giá cổ phiếu hàng ngày.
                  </div>
               </li>
               <li className="flex gap-[15px] h-[30px] ml-5">
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  style={{ fill: "#25b770" }} // Màu xanh lá
                  className="w-6 h-6"
                  >
                  <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
                  </svg>
                  <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium">
                  Biểu đồ và các công cụ phân tích kỹ thuật.
                  </div>
               </li>
               <li className="flex gap-[15px] h-[30px] ml-5">
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  style={{ fill: "#25b770" }} // Màu xanh lá
                  className="w-6 h-6"
                  >
                  <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
                  </svg>
                  <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium">
                  So sánh và đánh giá sức khỏe tài chính của doanh nghiệp.
                  </div>
               </li>
            </ul>
         </div>


        </div>
        
        {/* Gói Professional - 1 năm */}
        <div className="w-[273px] h-[519px] rounded-[10px] border border-fintown-br dark:border-fintown-br-light flex flex-col">
  {/* Phần đầu - thông tin tài khoản */}
  <div className="w-[273px] h-[198px] px-[26px] py-[21px] border-b border-fintown-br dark:border-fintown-br-light flex flex-col justify-center items-center">
    <div className="w-[220px] h-[156px] flex flex-col justify-center items-center">
      <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-base font-semibold text-center">
        Professional - 1 năm
      </div>
      <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-2xl font-semibold text-center py-5">
        2,584k
      </div>
      <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium text-center">
        Được nhận các đặc quyền cơ bản.
      </div>
      <div className="px-[67px] pt-[11px] pb-2.5 bg-[#25b770] rounded-lg  flex justify-center items-center my-3">
        <div className="text-white text-xs font-medium">
          Nâng cấp ngay
        </div>
      </div>
    </div>
  </div>

  {/* Phần mô tả đặc quyền gói Basic */}
  <div className="w-[273px] h-[42px] px-6 pt-[13px] pb-3.5 border-b border-fintown-br dark:border-fintown-br-light flex justify-center items-center">
    <div className="w-[225px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs ml-2 font-medium">
      Đã bao gồm các đặc quyền gói Basic
    </div>
  </div>

  {/* Phần mô tả chi tiết các đặc quyền */}
  <div className="h-[207px] flex flex-col justify-start items-start gap-6 mt-5">
    <ul className="space-y-6">
      <li className="flex items-center gap-[15px] h-[45px] ml-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          style={{ fill: "#25b770" }}
          className="w-6 h-6"
        >
          <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
        </svg>
        <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium">
          Truy cập kết quả dự báo sức khỏe tài chính của các công ty 5 năm tới.
        </div>
      </li>
      <li className="flex items-center gap-[15px] h-[30px] ml-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          style={{ fill: "#25b770" }}
          className="w-6 h-6"
        >
          <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
        </svg>
        <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium">
          Nhận thông báo mới nhất khi kết quả dự báo vừa được cập nhật.
        </div>
      </li>
      <li className="flex items-center gap-[15px] h-[30px] ml-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          style={{ fill: "#25b770" }}
          className="w-6 h-6"
        >
          <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
        </svg>
        <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium">
          Đọc các phân tích sâu sắc từ AI giúp bổ sung lựa chọn đầu tư.
        </div>
      </li>
      <li className="flex items-center gap-[15px] h-[30px] ml-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          style={{ fill: "#25b770" }}
          className="w-6 h-6"
        >
          <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
        </svg>
        <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium">
          Sử dụng công cụ định giá và lưu trữ kịch bản không giới hạn.
        </div>
      </li>
    </ul>
  </div>
</div>


        {/* Gói Professional - 1 tháng */}
        <div className="w-[273px] h-[519px] rounded-[10px] border border-fintown-br dark:border-fintown-br-light flex flex-col">
  {/* Phần đầu - thông tin tài khoản */}
  <div className="w-[273px] h-[198px] px-[26px] py-[21px] border-b border-fintown-br dark:border-fintown-br-light flex flex-col justify-center items-center">
    <div className="w-[220px] h-[156px] flex flex-col justify-center items-center">
      <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-base font-semibold text-center">
        Professional - 1 tháng
      </div>
      <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-2xl font-semibold text-center py-5">
        499k
      </div>
      <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium text-center">
        Được nhận các đặc quyền cơ bản.
      </div>
      <div className="px-[67px] pt-[11px] pb-2.5 bg-[#25b770] rounded-lg  flex justify-center items-center my-3">
        <div className="text-white text-xs font-medium">
          Nâng cấp ngay
        </div>
      </div>
    </div>
  </div>

  {/* Phần mô tả đặc quyền gói Basic */}
  <div className="w-[273px] h-[42px] px-6 pt-[13px] pb-3.5 border-b border-fintown-br dark:border-fintown-br-light flex justify-center items-center">
    <div className="w-[225px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs ml-2 font-medium">
      Đã bao gồm các đặc quyền gói Basic
    </div>
  </div>

  {/* Phần mô tả chi tiết các đặc quyền */}
  <div className="h-[207px] flex flex-col justify-start items-start gap-6 mt-5">
    <ul className="space-y-6">
      <li className="flex items-center gap-[15px] h-[45px] ml-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          style={{ fill: "#25b770" }}
          className="w-6 h-6"
        >
          <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
        </svg>
        <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium">
          Truy cập kết quả dự báo sức khỏe tài chính của các công ty 5 năm tới.
        </div>
      </li>
      <li className="flex items-center gap-[15px] h-[30px] ml-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          style={{ fill: "#25b770" }}
          className="w-6 h-6"
        >
          <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
        </svg>
        <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium">
          Nhận thông báo mới nhất khi kết quả dự báo vừa được cập nhật.
        </div>
      </li>
      <li className="flex items-center gap-[15px] h-[30px] ml-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          style={{ fill: "#25b770" }}
          className="w-6 h-6"
        >
          <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
        </svg>
        <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium">
          Đọc các phân tích sâu sắc từ AI giúp bổ sung lựa chọn đầu tư.
        </div>
      </li>
      <li className="flex items-center gap-[15px] h-[30px] ml-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          style={{ fill: "#25b770" }}
          className="w-6 h-6"
        >
          <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
        </svg>
        <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium">
          Sử dụng công cụ định giá và lưu trữ kịch bản không giới hạn.
        </div>
      </li>
    </ul>
  </div>
</div>

      </div>
    </div>
    
    );
}
