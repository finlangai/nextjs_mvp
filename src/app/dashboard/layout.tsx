"use client";
import { usePathname } from 'next/navigation';
import DashboardHeader from '@/src/components/layout/DashboardHeader';
import Sidebar from '@/src/components/layout/Sidebar';
import Footer from '@/src/components/layout/Footer';
import { ReactNode } from 'react';

// Danh sách các route không hiển thị footer
const routesWithoutFooter = ['/dashboard/co-phieu'];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // Kiểm tra khớp đường dẫn chính xác hơn cho /dashboard/co-phieu/{symbol}/ho-so-doanh-nghiep
  const shouldShowFooter = !pathname.match(/^\/dashboard\/co-phieu\/[^/]+\/ho-so-doanh-nghiep$/);

  return (
    <>
      <Sidebar />
      <DashboardHeader />
      <main className='ml-[70px] mt-[70px]'>
        {children}
      </main>
      {shouldShowFooter && (
        <div className='ml-[70px]'>
          <Footer backgroundColor="bg-fintown-bg-stn" />
        </div>
      )}
    </>
  );
}
