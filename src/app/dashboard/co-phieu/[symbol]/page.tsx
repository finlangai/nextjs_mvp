"use client";
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import useSetSelectedButtonSiderBar from '@/src/redux/hooks/useButtonsiderBar';
import useSetSelectedButtonStockPage from '@/src/redux/hooks/useButtonstockPage';
import HistoricalPriceLineChart from '@/src/components/charts/PriceStockLineChart/HistoricalPriceLineChart';

import SectionCard from '@/src/components/organisms/SectionCard';

export default function ChiSoKyThuatPage({ params }: { params: { symbol: string } }) {
  const { symbol } = params;
  useSetSelectedButtonSiderBar(3);
  useSetSelectedButtonStockPage(0);

  return (
    <>
      <div className="text-[24px] font-bold text-fintown-txt-1 mb-[40px] px-[40px]">
        Biểu đồ giá lịch sử
      </div>

      < HistoricalPriceLineChart symbol={symbol} />

      <div className="overflow-hidden  mb-[106px]">
        <div className="text-[24px] font-bold text-fintown-txt-1 px-[40px] mb-[35px]">
          Cổ phiếu cùng ngành
        </div>
        < SectionCard endpoint={"industry"} />
      </div>

      <div className="overflow-hidden  mb-[106px]">
        <div className="text-[24px] font-bold text-fintown-txt-1 px-[40px] mb-[35px]">
          Top tăng giá mạnh nhất
        </div>
        < SectionCard endpoint={"top-gainer"} />
      </div>

    </>
  );
}