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
interface LastFetchInfo {
  button: number | null;
  year: number | null;
  quarter: number | null;
}

export default function BaoCaoDoanhNghiepPage({ params }: { params: { symbol: string } }) {
  const { symbol } = params;
  const dispatch = useAppDispatch();

  // Xác định UI của trang đang ở
  useSetSelectedButtonStockPage(1);

  // Button đổi loại báo cáo tài chính & chỉ số tài chính
  const handleButtonClick = (button: number, text: string) => {
    dispatch(setSelectedButtonAndText({ button, text }));
  };

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
      <div className='px-[40px] py-[22px] flex items-center gap-x-[50px] mb-[28px]'>
        <button
          className={`text-[14px] py-[10px] px-[16px] rounded-[7px] ${selectedButton === 1 ? 'bg-fintown-btn-active-3 text-fintown-pr9' : 'text-fintown-txt-2'}`}
          onClick={() => handleButtonClick(1, 'Cân đối kế toán')}>
          Cân đối kế toán
        </button>
        <button
          className={`text-[14px] py-[10px] px-[16px] rounded-[7px] ${selectedButton === 2 ? 'bg-fintown-btn-active-3 text-fintown-pr9' : 'text-fintown-txt-2'}`}
          onClick={() => handleButtonClick(2, 'Kết quả kinh doanh')}>
          Kết quả kinh doanh
        </button>
        <button
          className={`text-[14px] py-[10px] px-[16px] rounded-[7px] ${selectedButton === 3 ? 'bg-fintown-btn-active-3 text-fintown-pr9' : 'text-fintown-txt-2'}`}
          onClick={() => handleButtonClick(3, 'Lưu chuyển tiền tệ')}>
          Lưu chuyển tiền tệ
        </button>
        <button
          className={`text-[14px] py-[10px] px-[16px] rounded-[7px] ${selectedButton === 4 ? 'bg-fintown-btn-active-3 text-fintown-pr9' : 'text-fintown-txt-2'}`}
          onClick={() => handleButtonClick(4, 'Chỉ số tài chính')}>
          Chỉ số tài chính
        </button>
      </div>

      {/* =========================================FILTER============================================== */}

      <div className='px-[40px] flex items-center gap-x-[26px] mb-[20px]'>
        <div className='text-[14px] text-fintown-txt-1'>Xem theo</div>

        < SelectYearOrQuarter symbol={symbol} year={currentYear} quarter={currentQuarter} />

        {/* <div className='text-[14px] text-fintown-txt-1'>Thời gian</div>

        <button className='flex items-center rounded-[8px] bg-fintown-btn-disable'>
            <div className='flex items-center gap-x-[30px] py-[8px] px-[16px]'>                
              <div className='text-[14px] text-fintown-txt-1'>3 năm</div>
              <i className='bx bx-lock text-fintown-txt-1' ></i>
            </div>
        </button> */}

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