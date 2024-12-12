"use client";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import { ReactNode } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store';
import DashboardHeader from '@/src/components/layout/DashboardHeader';
import Sidebar from '@/src/components/layout/Sidebar';
import SidebarUser from './sidebarUser';
import FooterDashboard from '@/src/components/layout/FooterDashboard';
export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isTechnicalChartPage = pathname.startsWith('/dashboard/bieu-do-ky-thuat');
    const router = useRouter();
  // const token = useSelector((state: RootState) => state.auth.token); // Lấy token từ Redux store

  // Kiểm tra trạng thái đăng nhập
  // useEffect(() => {
  //   if (!token) {
  //     // Nếu không có token, chuyển hướng người dùng về trang chủ
  //     router.push('/');
  //   }
  // }, [token, router]);
  return (
    <>
       <Sidebar />
       <DashboardHeader isTechnicalChart={isTechnicalChartPage} />
      <main className="ml-[70px] pt-[70px] bg-fintown-bg dark:bg-fintown-bg-light" id="main-dashboard">
        <div className="pt-[40px] pb-[174px] max-w-[1120px] ml-[110px] ">
          <div className="flex h-screen">
            <SidebarUser/>
            {children}
          </div>
        </div>
          <div>
            <FooterDashboard backgroundColor="bg-fintown-bg-stn dark:bg-fintown-bg-light" />
          </div>
      </main>
    </>
  );
}
