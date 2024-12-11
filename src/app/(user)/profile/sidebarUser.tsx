'use client';

import React from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname từ next/navigation
import Link from 'next/link'; // Import Link từ next/link

export default function SidebarUser() {
  const pathname = usePathname(); 

  // Lấy phần cuối của URL
  const currentPath = pathname?.split('/').pop();

  return (
    <div>
      <div className="w-[311px] flex-col justify-center items-start gap-[45px] inline-flex h-[519px]">
        <div className="justify-center items-center inline-flex">
          <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-2xl font-bold">Quản Lý Tài Khoản</div>
        </div>
        <div className="w-[311px]  h-[580px] pr-12 pb-[478px] border-r border-[#2b3139] flex-col justify-start items-start gap-[54px] inline-flex">
          {/* Mục "Thông tin tài khoản" */}
          <Link href="/profile/information">
            <div
              className={`self-stretch h-12 pr-[37px] justify-start items-center gap-3 inline-flex`}
            >
              <div className={`w-12 h-12 px-3 py-3 rounded-[10px] justify-center items-center inline-flex ${currentPath === 'information' ? 'bg-[#25b770]' : 'bg-[#1e2329]'} hover:bg-[#2d3c45] transition-all duration-300`}>
                <svg className="" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" style={{ fill: "rgba(255, 255, 255, 1)" }}>
                  <path d="M12 2A10.13 10.13 0 0 0 2 12a10 10 0 0 0 4 7.92V20h.1a9.7 9.7 0 0 0 11.8 0h.1v-.08A10 10 0 0 0 22 12 10.13 10.13 0 0 0 12 2zM8.07 18.93A3 3 0 0 1 11 16.57h2a3 3 0 0 1 2.93 2.36 7.75 7.75 0 0 1-7.86 0zm9.54-1.29A5 5 0 0 0 13 14.57h-2a5 5 0 0 0-4.61 3.07A8 8 0 0 1 4 12a8.1 8.1 0 0 1 8-8 8.1 8.1 0 0 1 8 8 8 8 0 0 1-2.39 5.64z" />
                  <path d="M12 6a3.91 3.91 0 0 0-4 4 3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4zm0 6a1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2 1.91 1.91 0 0 1-2 2z" />
                </svg>
              </div>
              <div className="w-[166px] self-stretch flex-col justify-center items-start gap-1 inline-flex">
                <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-sm font-semibold">Thông tin tài khoản</div>
                <div className="text-[#848e9c] text-xs font-normal">Chỉnh sửa thông tin tài khoản</div>
              </div>
            </div>
          </Link>

          {/* Mục "Quyền hạn sử dụng" */}
          <Link href="/profile/permission">
            <div
              className={`self-stretch h-12 pr-[37px] justify-start items-center gap-3 inline-flex`}
            >
              <div
                className={`w-12 h-12 px-3 py-3 rounded-[10px] justify-center items-center inline-flex ${currentPath === 'permission' ? 'bg-[#25b770]' : 'bg-[#1e2329]'} hover:bg-[#2d3c45] transition-all duration-300`}
              >
                <i className="bx bx-cube text-[24px] text-white"></i>
              </div>
              <div className="w-[166px] self-stretch flex-col justify-center items-start gap-1 inline-flex">
                <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-sm font-semibold">Quyền hạn sử dụng</div>
                <div className="text-[#848e9c] text-xs font-normal">Xem các quyền hạn và nâng cấp gói</div>
              </div>
            </div>
          </Link>

          {/* Mục "Lịch sử thanh toán" */}
          <Link href="/profile/history">
            <div
              className={`self-stretch h-12 pr-[37px] justify-start items-center gap-3 inline-flex`}
            >
              <div
                className={`w-12 h-12 px-3 py-3 rounded-[10px] justify-center items-center inline-flex ${currentPath === 'history' ? 'bg-[#25b770]' : 'bg-[#1e2329]'} hover:bg-[#2d3c45] transition-all duration-300`}
              >
                <i className="bx bx-history text-[24px] text-white"></i>
              </div>
              <div className="w-[166px] self-stretch flex-col justify-center items-start gap-1 inline-flex">
                <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-sm font-semibold">Lịch sử thanh toán</div>
                <div className="text-[#848e9c] text-xs font-normal">Xem lại lịch sử chi trả của bạn</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
