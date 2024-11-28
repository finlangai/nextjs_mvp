import React, { useState, useRef, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks/useAppStore';
import { SpinerLoader } from '../common/Loader';
import DividendsChart from "../charts/DividendsChart"
import { fetchDividendData, selectCashLegend, selectStockLegend, selectDividendRecords, selectDividendDataLoading } from '@/src/redux/Dividends';

export default function DivendensTable({symbol} : {symbol: string}){
    const dispatch = useAppDispatch();
    const dividendRecords = useAppSelector(selectDividendRecords);
    const cashLegend = useAppSelector(selectCashLegend);
    const stockLegend = useAppSelector(selectStockLegend);
    const selectLoading = useAppSelector(selectDividendDataLoading);
    const hasFetched = useRef(false);

    // Fetch API Lần đầu
    useEffect(() => {
        if (!hasFetched.current) {
        dispatch(fetchDividendData(symbol));
        hasFetched.current = true;
        }
    }, [dispatch]);

    if (selectLoading) {
        return (
        <>
            <div className="flex items-center gap-x-[30px] justify-center w-[40%]">
                < SpinerLoader />
            </div>
        </>
        )
    }

    return (
        <>
        <div className="flex">
            <div className="w-full">
                <div className="h-[60px] flex items-center justify-between border-b border-b-fintown-br text-fintown-txt-2 text-[12px] text-fintown-txt-2 text-[12px]">
                    <div className="w-full max-w-[100px]">
                        GD KHQ
                    </div>

                    <div className="w-full max-w-[400px]">
                        Sự kiện
                    </div>

                    <div className="w-full max-w-[90px]">
                        Chi trả bằng
                    </div>

                    <div className="w-full max-w-[100px]">
                        Thực hiện
                    </div>
                </div>

                {
                    dividendRecords?.map((val) => (
                        <>
                            <div key={val?.recordDate} className="h-[60px] flex items-center justify-between border-b border-b-fintown-br text-[14px] text-fintown-txt-1 text-[12px]">
                                <div className="w-full max-w-[100px]">
                                    {val?.recordDate}
                                </div>

                                <div className="w-full max-w-[400px]">
                                    {val?.title}
                                </div>

                                <div className="w-full max-w-[90px]">
                                    <div className={`border-l-[5px] pl-[10px] ${val?.type === 1 ? 'border-l-[#FEDA33]' : 'border-l-[#25B770]'}`}>
                                        {val?.type === 1 ? 'Tiền' : 'Cổ tức'}
                                    </div>
                                </div>

                                <div className="w-full max-w-[100px]">
                                    {val?.executionDate || '-'}
                                </div>
                            </div>
                        </>
                    ))
                }
            </div>

            <div className="min-w-[400px] ml-[50px]">
                <div className="h-[60px] flex items-center justify-between border-b border-b-fintown-br text-fintown-txt-2 text-[12px] text-fintown-txt-2 text-[12px]">
                    <div className="w-full">
                        Cổ tức bằng tiền (đ)
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}