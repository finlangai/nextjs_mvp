"use client";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import DashboardHeader from '@/src/components/layout/DashboardHeader';
import Sidebar from '@/src/components/layout/Sidebar';
import SidebarUser from './sidebarUser';
import FooterDashboard from '@/src/components/layout/FooterDashboard';
export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isTechnicalChartPage = pathname.startsWith('/dashboard/bieu-do-ky-thuat');
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
