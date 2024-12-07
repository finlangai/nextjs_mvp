"use client";
import React from 'react';
import useSetSelectedButtonSiderBar from '@/src/redux/hooks/useButtonsiderBar';
import TopStocksTable from '@/src/components/organisms/dashboard/topStocksTable';
import Link from 'next/link';
import SectionCard from '@/src/components/organisms/dashboard/SectionCard';
import BannerDashboard from '@/src/components/organisms/dashboard/BannerDashboard';
import SectionMarketOverview from '@/src/components/organisms/dashboard/SectionMarketOverview.';

export default function Dashboard() {

  useSetSelectedButtonSiderBar(0);

  return (

    <div id="dashboard-page" className="pt-[50px]">

      <h1 className="font-bold text-[50px] text-fintown-txt-tit9-1 dark:text-fintown-txt-tit9-1-light px-[40px] mb-[43px]">Dashboard</h1>

      <section className="px-[40px] mb-[106px]">
        < BannerDashboard />
      </section>

      <section>
        <div className="overflow-hidden">
          < SectionCard endpoint={"revenue"} nameSection={""} dashboard={true} />
        </div>
      </section>

      <section className="px-[40px] mb-[106px]">
        <div className="flex justify-between items-center mb-[24px]">
          <h2 className="font-bold text-fintown-txt-1 dark:text-fintown-txt-1-light text-[40px]">Top cổ phiếu</h2>
          <Link href={'/dashboard/co-phieu'}>
            <button className="text-fintown-txt-1 text-sm bg-fintown-btn-2 rounded px-[18px] py-[6px] max-h-[32px]">
              Xem thêm
            </button>
          </Link>
        </div>
        <div id="top-stock-table-container" className="text-fintown-txt-1">
          < TopStocksTable />
        </div>
      </section>

      <section className="px-[40px] mb-[106px]">
        <div className="mb-[24px]">
          <h2 className="font-bold text-[40px] text-fintown-txt-1 dark:text-fintown-txt-1-light">Chỉ số thị trường</h2>
        </div>

        < SectionMarketOverview />

      </section>
    </div>

  );
}