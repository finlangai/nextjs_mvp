"use client";
import { usePathname } from 'next/navigation';
import DashboardHeader from '@/src/components/layout/DashboardHeader';
import Sidebar from '@/src/components/layout/Sidebar';
import Footer from '@/src/components/layout/Footer';
import { ReactNode } from 'react';

// Danh sách các route không hiển thị footer
const routesWithoutFooter = [
  '/dashboard/co-phieu',
  '/dashboard/dinh-gia-co-phieu'
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Kiểm tra xem pathname có bắt đầu với bất kỳ route nào trong danh sách không
  const isRouteWithoutFooter = routesWithoutFooter.some(route => pathname.startsWith(route));

  // Kiểm tra khớp đường dẫn chính xác hơn cho /dashboard/co-phieu/{symbol}/ho-so-doanh-nghiep
  const isStockProfilePage = pathname.startsWith('/dashboard/co-phieu/') && pathname.endsWith('/ho-so-doanh-nghiep');

  // Footer sẽ được hiển thị nếu không thuộc các route đặc biệt hoặc không phải là trang hồ sơ doanh nghiệp
  const shouldShowFooter = !(isRouteWithoutFooter || isStockProfilePage);

  return (
    <>
      <Sidebar />
      <DashboardHeader />
      <main className="ml-[70px] mt-[70px]">
        {children}
      </main>
      {shouldShowFooter && (
        <div className="ml-[70px]">
          <Footer backgroundColor="bg-fintown-bg-stn" />
        </div>
      )}
    </>
  );
}
