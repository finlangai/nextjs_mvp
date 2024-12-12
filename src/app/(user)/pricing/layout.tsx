"use client";

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import DashboardHeader from '@/src/components/layout/DashboardHeader';
import Sidebar from '@/src/components/layout/Sidebar';
import FooterDashboard from '@/src/components/layout/FooterDashboard';

export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isTechnicalChartPage = pathname.startsWith('/dashboard/bieu-do-ky-thuat');
  return (
    <>
      <Sidebar />
      <DashboardHeader isTechnicalChart={isTechnicalChartPage} />
      <main className='bg-fintown-bg dark:bg-fintown-bg-light'>
        abc
        {children}
        xyz
      </main>
      <div>
        <FooterDashboard backgroundColor="ml-[70px] bg-fintown-bg-stn dark:bg-fintown-bg-light" />
      </div>
    </>
  );
}
