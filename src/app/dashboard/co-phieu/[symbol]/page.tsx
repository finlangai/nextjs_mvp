"use client";
import React from 'react';
import useSetSelectedButtonSiderBar from '@/src/redux/hooks/useButtonsiderBar';
import useSetSelectedButtonStockPage from '@/src/redux/hooks/useButtonstockPage';
import HistoricalPriceLineChart from '@/src/components/charts/PriceStockLineChart/HistoricalPriceLineChart';
import SectionCard from '@/src/components/organisms/SectionCard';
import PriceInsights from '@/src/components/organisms/PriceInsights';

export default function ChiSoKyThuatPage({ params }: { params: { symbol: string } }) {
  const { symbol } = params;
  useSetSelectedButtonSiderBar(3);
  useSetSelectedButtonStockPage(0);

  return (
    <>
      <div className="text-[24px] font-bold text-fintown-txt-1 mb-[40px] px-[40px]">
        Biểu đồ giá lịch sử
      </div>

      <div className="flex px-[40px] mb-[140px]">
          < HistoricalPriceLineChart symbol={symbol} />
          <div className="w-full max-w-[436px]">
              <PriceInsights symbol={symbol} />
          </div>
      </div>

      <div className="overflow-hidden">
        < SectionCard endpoint={"industry"} nameSection={"Cổ phiếu cùng ngành"} />
      </div>

      <div className="overflow-hidden">
        < SectionCard endpoint={"top-gainer"} nameSection={"Tăng giá mạnh nhất"} />
      </div>

    </>
  );
}