import React, { useState, useRef, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks/useAppStore';
import { fetchProfileSummaries, selectProfileSummaryData, selectProfileSummaryLoading } from '@/src/redux/ProfileSummary';
import { ProfileSummary } from '@/src/interfaces/ProfileSummary';
import { SpinerLoader } from '../common/Loader';

export default function StockSummaryTechChart({symbol} : {symbol:string}){
    const dispatch = useAppDispatch();
    const selectData = useAppSelector(selectProfileSummaryData);
    const selectLoading = useAppSelector(selectProfileSummaryLoading);
    const [NowData, setNowData] = useState<ProfileSummary | null>(null);
    const hasFetched = useRef(false);

    // Fetch API Lần đầu
    useEffect(() => {
        if (!hasFetched.current) {
            dispatch(fetchProfileSummaries({symbol}));
            hasFetched.current = true;
        }
    }, [dispatch]);

    // Lưu data đã fetch
    useEffect(() => {
        if (selectData !== null) {
        setNowData(selectData);
        console.log(selectData)
        }
    }, [selectData]);

    if (selectLoading) {
        return (
        <>
            <div className="flex items-center gap-x-[30px] justify-center w-[40%] border-b border-b-fintown-br flex w-full py-[16px]">
                < SpinerLoader />
            </div>
        </>
        )
    }

    return (
        <>
        <div className='border-b border-b-fintown-br flex w-full'>
            {/* Phần tử đầu tiên có width cố định */}
            <div className='flex items-center px-[24px] border-r border-r-fintown-br min-w-[430px] py-[16px]'>
                <div className='h-[40px] w-[40px] rounded-[50%] overflow-hidden bg-white mr-[13px]'>
                    <img className='h-full w-full object-contain' src={NowData?.logo} alt="" />
                </div>

                <div>
                    <div className='flex items-center'>
                        <p className='text-[16px] text-fintown-txt-1 font-bold mr-[11px]'>{NowData?.symbol}</p>
                        <i className='bx bxs-star text-[18px] text-fintown-txt-2 mr-[10px] cursor-pointer'></i>
                    </div>
                    <div className='text-[12px] font-[400] text-fintown-txt-2'>
                        {NowData?.companyName}
                    </div>
                </div>
            </div>
            
            {/* Các phần tử còn lại chia đều không gian */}
            <div className='flex flex-1'>
                <div className='flex-1 py-[16px] px-[16px] border-r border-r-fintown-br'>
                    <div className='text-fintown-txt-2 text-[12px] font-bold mb-[9px]'>Giá đóng cửa</div>
                    <div className='text-fintown-txt-1 text-[12px] font-bold'>{NowData?.close.toLocaleString('en-US')}</div>
                </div>

                <div className='flex-1 py-[16px] px-[16px] border-r border-r-fintown-br'>
                    <div className='text-fintown-txt-2 text-[12px] font-bold mb-[9px]'>Thay đổi 24h</div>
                    <div 
                    className={`font-bold text-[12px] ${
                        NowData?.delta !== undefined
                          ? NowData.delta > 0
                            ? 'text-fintown-stt-buy'
                            : NowData.delta < 0
                            ? 'text-fintown-stt-sell'
                            : 'text-fintown-txt-1'
                          : 'text-fintown-txt-1'
                      }`}
                    >{NowData?.delta}%</div>
                </div>

                <div className='flex-1 py-[16px] px-[16px] border-r border-r-fintown-br'>
                    <div className='text-fintown-txt-2 text-[12px] font-bold mb-[9px]'>Cao nhất 24h</div>
                    <div className='text-fintown-txt-1 text-[12px] font-bold'>{NowData?.high.toLocaleString('en-US')}</div>
                </div>

                <div className='flex-1 py-[16px] px-[16px] border-r border-r-fintown-br'>
                    <div className='text-fintown-txt-2 text-[12px] font-bold mb-[9px]'>Thấp nhất 24h</div>
                    <div className='text-fintown-txt-1 text-[12px] font-bold'>{NowData?.low.toLocaleString('en-US')}</div>
                </div>

                <div className='flex-1 py-[16px] px-[16px] '>
                    <div className='text-fintown-txt-2 text-[12px] font-bold mb-[9px]'>Khối lượng</div>
                    <div className='text-fintown-txt-1 text-[12px] font-bold'>{NowData?.tradingVolume.toLocaleString('en-US')}</div>
                </div>
            </div>
        </div>
        
        </>
    )
}