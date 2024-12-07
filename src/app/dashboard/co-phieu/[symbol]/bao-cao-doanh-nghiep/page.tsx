"use client";
import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { fetchFinancialStatements, selectFinancialStatementsData } from '@/src/redux/FinancialStatement';
import { fetchFinancialMetrics, selectFinancialMetricsData } from '@/src/redux/FinancialMetric';
import { setSelectedButtonAndText, selectSelectedButton } from '@/src/redux/ReportPage';
import useSetSelectedButtonStockPage from '@/src/redux/hooks/useButtonstockPage';
import FinancialStatementTable from '@/src/components/organisms/statement/FinancialStatementTable';
import BtnNextPrevReportPage from '@/src/components/common/BtnNextPrevReportPage';
import SelectYearOrQuarter from '@/src/components/common/SelectYearOrQuarter';
import SlidingTabs from "@/src/components/common/SlidingTabs";

interface LastFetchInfo {
  button: number | null;
  year: number | null;
  quarter: number | null;
}

interface Tab {
  id: number;
  label: string;
}

export default function BaoCaoDoanhNghiepPage({ params }: { params: { symbol: string } }) {
  const { symbol } = params;
  const dispatch = useAppDispatch();

  // Xác định UI của trang đang ở
  useSetSelectedButtonStockPage(1);

  // Button đổi loại báo cáo tài chính & chỉ số tài chính
  const handleTabChange = (index: number) => {
    // console.log(index)
    let text;
    switch (index + 1) { 
      case 1:
        text = 'Cân đối kế toán';
        dispatch(setSelectedButtonAndText({ button: index + 1, text }));
        break;

      case 2:
        text = 'Kết quả kinh doanh';
        dispatch(setSelectedButtonAndText({ button: index + 1, text }));
        break;

      case 3:
        text = 'Lưu chuyển tiền tệ';
        dispatch(setSelectedButtonAndText({ button: index + 1, text }));
        break;

      case 4:
        text = 'Chỉ số tài chính';
        dispatch(setSelectedButtonAndText({ button: index + 1, text }));
        break;

      default:
        break;
    }
  };

  const tabs: Tab[] = [
    { id: 1, label: "Cân đối kế toán" },
    { id: 2, label: "Kết quả kinh doanh" },
    { id: 3, label: "Lưu chuyển tiền tệ" },
    { id: 4, label: "Chỉ số tài chính" },
  ];

  // Thiết lập limit mặc định theo thời gian hiện tại, năm hiện tại && quý hiện tại
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentQuarter, setCurrentQuarter] = useState(4);

  // Lấy trang báo cáo đang ở, và data đã được call về từ API
  const selectedButton = useAppSelector(selectSelectedButton);
  const financialStatementsData = useAppSelector(selectFinancialStatementsData);
  const financialMetricsData = useAppSelector(selectFinancialMetricsData);

  // Đặt theo dõi việc call API
  const isLoadingRef = useRef(false);
  const lastFetchRef = useRef<LastFetchInfo>({ button: null, year: null, quarter: null });

  useEffect(() => {
    const fetchData = async () => {
      if (
        isLoadingRef.current ||
        (lastFetchRef.current.button === selectedButton &&
          lastFetchRef.current.year === currentYear &&
          lastFetchRef.current.quarter === currentQuarter)
      ) {
        return;
      }

      isLoadingRef.current = true;

      try {
        if (selectedButton === 4) {
          if (financialMetricsData.length === 0 ||
            lastFetchRef.current.button !== selectedButton ||
            lastFetchRef.current.year !== currentYear ||
            lastFetchRef.current.quarter !== currentQuarter) {
            await dispatch(fetchFinancialMetrics({ symbol, year: currentYear, quarter: currentQuarter }));
          }
        }
        else {
          const statementType = selectedButton;
          if (financialStatementsData.length === 0 ||
            lastFetchRef.current.button !== selectedButton ||
            lastFetchRef.current.year !== currentYear ||
            lastFetchRef.current.quarter !== currentQuarter) {
            await dispatch(fetchFinancialStatements({ type: statementType, symbol, year: currentYear, quarter: currentQuarter }));
          }
        }

        lastFetchRef.current = { button: selectedButton, year: currentYear, quarter: currentQuarter };
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        isLoadingRef.current = false;
      }
    };

    fetchData();
  }, [selectedButton, currentYear, currentQuarter, dispatch, symbol, financialStatementsData.length]);

  return (
    <>
      <div className='px-[40px] py-[22px] mb-[28px] text-fintown-txt-2'>
        <SlidingTabs onTabChange={handleTabChange} tabs={tabs} gap={"50px"} startIndex={0} fontsize='14px'/>
      </div>

      {/* =========================================FILTER============================================== */}

      <div className='px-[40px] flex items-center gap-x-[26px] mb-[20px]'>
        <div className='text-[14px] text-fintown-txt-1'>Xem theo</div>

        < SelectYearOrQuarter symbol={symbol} year={currentYear} quarter={currentQuarter} />

        {selectedButton !== 4 && (
          <div className='text-[14px] text-fintown-txt-1'>Đơn vị: Tỷ đồng</div>
        )}

        {/* Nút prev/next */}
        <div className='ml-auto '>
          < BtnNextPrevReportPage symbol={symbol} />
        </div>

      </div>

      {/* =========================================TABLE============================================== */}

      <FinancialStatementTable />

      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </>

  );
}