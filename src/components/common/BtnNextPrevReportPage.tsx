"use client";

import React, {useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks/useAppStore';
import { selectSelectedButton } from '@/src/redux/ReportPage';
import { fetchFinancialStatements } from '@/src/redux/FinancialStatement';

import { fetchFinancialMetrics } from '@/src/redux/FinancialMetric';

import { 
  selectByDataBtnNext, 
  selectByDataBtnPrev, 

  setLimitByDataBtnNext,
  selectLimitSubscribeQuarter,
  selectLimitSubscribeYear,
  setLimitSubscribeQuarter,
  setLimitSubscribeYear,  
} from '@/src/redux/BtnNextPrevReportPage';

const BtnNextPrevReportPage = ({ symbol }: { symbol: string }) => {

  const dispatch = useAppDispatch();
  const selectedButton = useAppSelector(selectSelectedButton);
  
  // Lấy trạng thái button
  const isNextDisabledBtn = useAppSelector(selectByDataBtnNext);
  const isPrevDisabledBtn = useAppSelector(selectByDataBtnPrev);

  // Lấy subcrible
  const slectSubcribleYear = useAppSelector(selectLimitSubscribeYear)
  const selectSubcribleQuarter = useAppSelector(selectLimitSubscribeQuarter)

  // Fetch data từ api, nếu selectbutton == 4 tương đương đổi sang call api chỉ số tài chính
  // khác 4 call api báo cáo tài chính
  const fetchData = async (currentYear: number, currentQuarter:number) => {
    console.log('dang call', currentYear, currentQuarter)
    if (selectedButton === 4) {
      return await dispatch(fetchFinancialMetrics({ symbol, year: currentYear, quarter: currentQuarter }));
    };
    return await dispatch(fetchFinancialStatements({ type: selectedButton, symbol, year: currentYear, quarter: currentQuarter }));
  }
  
  const handleNext = () => {
    if (slectSubcribleYear === null || selectSubcribleQuarter === null) {
      return;
    }

    let newYear = slectSubcribleYear;
    let newQuarter = selectSubcribleQuarter;

    if (selectSubcribleQuarter === 0) {
      newYear = slectSubcribleYear + 1;
      dispatch(setLimitSubscribeYear(newYear));
    } else if (selectSubcribleQuarter === 4) {
      newYear = slectSubcribleYear + 1;
      newQuarter = 1;
      dispatch(setLimitSubscribeYear(newYear));
      dispatch(setLimitSubscribeQuarter(newQuarter));
    } else if (selectSubcribleQuarter < 4 && selectSubcribleQuarter > 0) {
      newQuarter = selectSubcribleQuarter + 1;
      dispatch(setLimitSubscribeQuarter(newQuarter));
    }

    fetchData(newYear, newQuarter);
  };

  const handlePrev = () => {
    if (slectSubcribleYear === null || selectSubcribleQuarter === null) {
      return;
    }

    dispatch(setLimitByDataBtnNext(false));

    let newYear = slectSubcribleYear;
    let newQuarter = selectSubcribleQuarter;
    
    if (selectSubcribleQuarter === 0) {
      newYear = slectSubcribleYear - 1;
      dispatch(setLimitSubscribeYear(newYear));
    } else if (selectSubcribleQuarter > 1) {
      newQuarter = selectSubcribleQuarter - 1;
      dispatch(setLimitSubscribeQuarter(newQuarter));
    } else if (selectSubcribleQuarter === 1) {
      newYear = slectSubcribleYear - 1;
      newQuarter = 4;
      dispatch(setLimitSubscribeYear(newYear));
      dispatch(setLimitSubscribeQuarter(newQuarter));
    }

    fetchData(newYear, newQuarter);
  };

  return (
    <>
      <div className='flex items-center gap-x-[10px]'>
        <button
          className={`h-[24px] w-[24px] rounded ${isPrevDisabledBtn ? 'bg-gray-300 cursor-not-allowed' : 'bg-fintown-btn-disable'} flex items-center justify-center`}
          onClick={handlePrev}
          disabled={isPrevDisabledBtn}>
          <i className='bx bx-chevron-left text-fintown-txt-1 text-[24px]'></i>
        </button>
        
        <button
          className={`h-[24px] w-[24px] rounded ${isNextDisabledBtn ? 'bg-gray-300 cursor-not-allowed' : 'bg-fintown-btn-disable'} flex items-center justify-center`}
          onClick={handleNext}
          disabled={isNextDisabledBtn}>
          <i className='bx bx-chevron-right text-fintown-txt-1 text-[24px]'></i>
        </button>
      </div>
    </>
  );
};

export default React.memo(BtnNextPrevReportPage);