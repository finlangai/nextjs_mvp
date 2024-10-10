"use client";

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
  return (
    <>
      <Sidebar />
      <DashboardHeader />
      <main className='mt-[70px]'>
        {children}
      </main>
      <div className='ml-[70px]'>
        <Footer backgroundColor="bg-fintown-bg-stn" />
      </div>
    </>
  );
}
