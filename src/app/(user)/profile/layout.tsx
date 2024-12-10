"use client";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import { ReactNode } from 'react';
import SidebarUser from '@/src/components/layout/SidebarUser';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store';
import DashboardHeader from '@/src/components/layout/DashboardHeader';
import Sidebar from '@/src/components/layout/Sidebar';
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
      <main className='mt-[70px]'>
        <div className="pt-[40px] pb-[174px] max-w-[1120px] mr-auto ml-auto">
          <div className="flex h-screen">
            {/* Sidebar */}

            <SidebarUser />
            {children}
          </div>
        </div>
      </main>
      <div className='ml-[70px]'>
          <Footer />
        </div>
    </>
  );
}
