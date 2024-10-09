"use client";
import React from 'react';
import StackedColumnChart from "../../components/charts/ColumnChart";
// import CardStock from "../../components/organisms/CardStock";
import MarketIndicatorChart from "../../components/charts/MarketIndicatorChart";
import StockTable from "../../components/organisms/StockTable";
import useSetSelectedButtonSiderBar from '@/src/redux/hooks/useButtonsiderBar';

export default function Dashboard() {

  useSetSelectedButtonSiderBar(0);
  
  return (

    <div id="dashboard-page" className="pt-[50px]">

      <h1 className="font-bold text-[50px] text-fintown-txt-tit9-1 px-[40px] mb-[43px]">Dashboard</h1>

      <section className="px-[40px] mb-[106px]">
        <div className="flex">
          <div id="left-stn" className="pr-[30px] w-[40%]">
            <div className="flex items-center mb-[16px]">
              <div
                className="rounded-[50%] w-[40px] h-[40px] overflow-hidden mr-[15px]"
              >
                <img
                  className="w-full h-full"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2NYGSDRblWMqocU-n1KHUA-lriZUpWs3tvA&s"
                  alt="logo PNJ"
                />
              </div>
              <div className="flex items-center text-fintown-txt-1">
                <h2 className="font-bold text-2xl mr-[5px]">PNJ</h2>
                <p className="text-xl">(HOSE)</p>
              </div>
            </div>

            <p className="text-base text-fintown-txt-1 font-semibold mb-[42px]">Công ty Cổ phần Vàng bạc Đá quý Phú Nhuận</p>

            <p className="text-base text-fintown-txt-2 font-semibold mb-[5px]">Lợi nhuận sau thuế</p>

            <div className="flex mb-[23px]">
              <p className="text-4xl font-bold text-fintown-txt-1 mr-[10px]">7,800.39 tỷ VND</p>
              <i className='bx bxs-up-arrow text-2xl text-fintown-stt-buy mb-[5px]'></i>
            </div>

            <p className="text-base text-fintown-txt-1 font-normal mb-[40px] max-w-[470px]">
              Biên lãi ròng trong năm 2023 của PNJ đạt 15.42%, tăng 1.96% so với cùng kỳ. Bên cạnh đó lợi nhuận sau thuế và doanh thu đang trên đà hồi phục.
            </p>

            <div className="flex items-center gap-x-7 mb-10 hidden">
              <div className="flex items-center gap-x-2.5">
                <div className="bg-fintown-pr9 w-[45px] h-[5px]"></div>
                <p className="text-fintown-txt-1">Biên lãi ròng</p>
              </div>

              <div className="flex items-center gap-x-2.5">
                <div className="bg-fintown-chart-1 rounded w-[40px] h-[21px]"></div>
                <p className="text-fintown-txt-1">LNST</p>
              </div>

              <div className="flex items-center gap-x-2.5">
                <div className="bg-fintown-chart-2 rounded w-[40px] h-[21px]"></div>
                <p className="text-fintown-txt-1">Doanh thu</p>
              </div>
            </div>

            <button className="bg-fintown-pr9 rounded-lg text-sm text-fintown-txt-1 py-[11px] px-[16px]">
              Xem kết quả dự báo
            </button>

          </div>

          <div id="right-stn" className="w-[60%]">
            <p className="text-fintown-txt-1 font-semibold text-2xl mb-[18px]">Doanh thu và lợi nhuận quá khứ</p>
            <div className="w-full">
              <StackedColumnChart />
            </div>
          </div>

        </div>
      </section>

      <section className="overflow-hidden px-[40px] mb-[106px]">
        <div id="container-card-stock" className="flex items-center overflow-hidden gap-[20px]">
          {/* <CardStock />
          <CardStock />
          <CardStock />
          <CardStock />
          <CardStock /> */}
        </div>
      </section>

      <section className="px-[40px] mb-[106px]">
        <div className="flex justify-between items-center mb-[24px]">
          <h2 className="font-bold text-fintown-txt-1 text-[40px]">Top cổ phiếu</h2>
          <button className="text-fintown-txt-1 text-sm bg-fintown-btn-2 rounded px-[18px] py-[6px] max-h-[32px]">
            Xem thêm
          </button>
        </div>
        <div id="top-stock-table-container" className="text-fintown-txt-1">
          <StockTable />
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
                <div>
                  <button className="text-fintown-txt-1 text-base font-medium">VNINDEX</button>
                  <div className="w-full h-1 rounded"></div>
                </div>
                <div>
                  <button className="text-fintown-txt-1 text-base font-medium">VN30</button>
                  <div className="w-full h-1 rounded bg-fintown-btn-active-2"></div>
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