'use client';
import { usePathname } from 'next/navigation';
import DashboardHeader from '@/src/components/layout/DashboardHeader';
import Sidebar from '@/src/components/layout/Sidebar';
import { ReactNode, useEffect, useState } from 'react';
import FooterDashboard from '@/src/components/layout/FooterDashboard';
// Danh sách các route không hiển thị footer
const routesWithoutFooter = [
  '/dashboard/co-phieu',
  '/dashboard/dinh-gia-co-phieu',
  '/dashboard/bieu-do-ky-thuat'
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Kiểm tra trạng thái dark mode từ localStorage khi component mount
  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);

  // Kiểm tra xem pathname có bắt đầu với bất kỳ route nào trong danh sách không
  const isRouteWithoutFooter = routesWithoutFooter.some(route => pathname.startsWith(route));
  const isStockProfilePage = pathname.startsWith('/dashboard/co-phieu/') && pathname.endsWith('/ho-so-doanh-nghiep');
  const isTechnicalChartPage = pathname.startsWith('/dashboard/bieu-do-ky-thuat');
  const shouldShowFooter = !(isRouteWithoutFooter || isStockProfilePage);

  return (
    <>
      <Sidebar />
      <DashboardHeader isTechnicalChart={isTechnicalChartPage} />
      <main className="ml-[70px] pt-[70px] bg-fintown-bg dark:bg-fintown-bg-light" id="main-dashboard">
        {children}

        {shouldShowFooter && (
          <div>
            <FooterDashboard backgroundColor="bg-fintown-bg-stn dark:bg-fintown-bg-light" />
          </div>
        )}
      </main>

    </>
  );
}
