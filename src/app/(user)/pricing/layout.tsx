"use client";

import { usePathname } from 'next/navigation';
import Footer from '@/src/components/layout/Footer';
import { ReactNode } from 'react';
import DashboardHeader from '@/src/components/layout/DashboardHeader';
import Sidebar from '@/src/components/layout/Sidebar';



export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isTechnicalChartPage = pathname.startsWith('/dashboard/bieu-do-ky-thuat');
  return (
    <>
      <Sidebar />
      <DashboardHeader isTechnicalChart={isTechnicalChartPage} />

      <main className='mt-[70px]'>
        {children}
      </main>
      <div className='ml-[70px]'>
        <Footer backgroundColor="bg-fintown-bg-stn" />
      </div>
    </>
  );
}
