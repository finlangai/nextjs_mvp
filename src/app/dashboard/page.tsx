"use client";
import React from 'react';
import MarketIndicatorChart from "../../components/charts/MarketIndicatorChart";
import useSetSelectedButtonSiderBar from '@/src/redux/hooks/useButtonsiderBar';
import TopStocksTable from '@/src/components/organisms/topStocksTable';
import Link from 'next/link';
import SectionCard from '@/src/components/organisms/SectionCard';
import BannerDashboard from '@/src/components/organisms/BannerDashboard';

export default function Dashboard() {

  useSetSelectedButtonSiderBar(0);
  
  return (

    <div id="dashboard-page" className="pt-[50px]">

      <h1 className="font-bold text-[50px] text-fintown-txt-tit9-1 px-[40px] mb-[43px]">Dashboard</h1>

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
          <h2 className="font-bold text-fintown-txt-1 text-[40px]">Top cổ phiếu</h2>
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
          <h2 className="font-bold text-fintown-txt-1 text-[40px]">Chỉ số thị trường</h2>
        </div>

        <div className="flex">
          <div className="min-w-[629px] max-w-[629px] mr-[76px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center">

                <div className="bg-fintown-btn-3 rounded-l-md px-[16px] py-[8.5px]">
                  <button className="text-fintown-txt-2 text-sm">1Y</button>
                  <div className="w-full h-1 rounded"></div>
                </div>

                <div className="bg-fintown-btn-3 px-[16px] py-[8.5px]">
                  <button className="text-fintown-txt-2 text-sm">3Y</button>
                  <div className="w-full h-1 rounded"></div>
                </div>

                <div className="bg-fintown-btn-3 px-[16px] py-[8.5px]">
                  <button className="text-fintown-txt-2 text-sm">5Y</button>
                  <div className="w-full h-1 rounded"></div>
                </div>

                <div className="bg-fintown-btn-3 rounded-r-md px-[16px] py-[8.5px]">
                  <button className="text-fintown-txt-1 text-sm">10Y</button>
                  <div className="w-full h-1 rounded bg-fintown-btn-active-2"></div>
                </div>

              </div>
              <div className="flex gap-x-7">
                {/* <div>
                  <button className="text-fintown-txt-1 text-base font-medium">VNINDEX</button>
                  <div className="w-full h-1 rounded"></div>
                </div> */}
                <div>
                  <button className="text-fintown-txt-1 text-base font-medium">VN30</button>
                  {/* <div className="w-full h-1 rounded bg-fintown-btn-active-2"></div> */}
                </div>
              </div>
            </div>
            <br />
            <div id="chart">
              <MarketIndicatorChart />
            </div>
          </div>
          {/* ========================================================== */}
          <div className="w-full" >
            <div className="flex items-center">
              <p className="text-fintown-txt-1 font-bold text-4xl">
                1,208.32
              </p>

              <div className="bg-fintown-stt-sell rounded text-xs text-fintown-txt-1 font-bold flex items-center px-[8px] py-[5px] ml-[12px]">
                <i className='bx bx-caret-down text-sm'></i>
                <span>5.62</span>
                <span>%</span>
              </div>

              <div className="bg-fintown-stt-sell rounded text-xs text-fintown-txt-1 font-bold flex items-center px-[8px] py-[5px] ml-[12px]">
                <span>-5.62</span>
                <span></span>
              </div>
            </div>

            <br></br>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-[43px] w-full">
              <div className="w-full">
                <p className="text-base text-fintown-txt-2 mb-3">Vốn hóa</p>
                <div className="text-2xl font-bold text-fintown-txt-1">6,822,217T</div>
              </div>

              <div className="w-full">
                <p className="text-base text-fintown-txt-2 mb-3">Doanh thu</p>
                <div className="text-2xl font-bold text-fintown-txt-1">4,240,914T</div>
              </div>

              <div className="w-full">
                <p className="text-base text-fintown-txt-2 mb-3">Lợi nhuận</p>
                <div className="text-2xl font-bold text-fintown-txt-1">475,813T</div>
              </div>

              <div className="w-full">
                <p className="text-base text-fintown-txt-2 mb-3">Chỉ số P/E</p>
                <div className="text-2xl font-bold text-fintown-txt-1">15,36</div>
              </div>

              <div className="w-full">
                <p className="text-base text-fintown-txt-2 mb-3">P/E trung bình</p>
                <div className="text-2xl font-bold text-fintown-txt-1">13,25</div>
              </div>

              <div className="w-full">
                <p className="text-base text-fintown-txt-2 mb-3">TBĐ 52 tuần</p>
                <div className="text-2xl font-bold text-fintown-txt-1">46.65%</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
}