"use client";
import Footer from '@/src/components/layout/Footer';
import { ReactNode } from 'react';
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
