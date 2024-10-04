import React, { useState, useRef, useEffect } from 'react';
import { ProfileSummary } from "@/src/interfaces/ProfileSummary";
import { selectProfileSummaryData } from '@/src/redux/ProfileSummary';
import { useAppSelector } from '@/src/redux/hooks/useAppStore';
import { SpinerLoader, BarsLoader } from '../common/Loader';
import Link from 'next/link';

const StockProfileSummary = () => {
    const selectProfileSummary = useAppSelector(selectProfileSummaryData);
    const [NowData, setNowData] = useState<ProfileSummary | null>(null);

    const [isOverflowing, setIsOverflowing] = useState(false);
    const overviewRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectProfileSummary !== null) {
            setNowData(selectProfileSummary);
        }
    }, [selectProfileSummary]);

    useEffect(() => {
        if (overviewRef.current) {
          setIsOverflowing(overviewRef.current.scrollHeight > overviewRef.current.clientHeight);
        }
    }, [NowData]);

    if (selectProfileSummary === null) {
        return (
            <>
            <div className='flex w-full justify-center min-w-[594px] items-center h-[428px]'>
                < BarsLoader/>
            </div>
            </>
        )
    };

    return (
        <>
        <div className="w-full">
            <div className='flex items-center mb-[5px]'>
                <div className='w-[40px] h-[40px] overflow-hidden rounded-full bg-white mr-[14px]'>
                    <img className='w-full h-full object-contain' src={NowData?.logo} alt="vcb" />
                </div>

                <h2 className='text-[40px] font-bold text-fintown-txt-1 mr-[14px]'>{NowData?.symbol}</h2>
                <p className='text-[24px] text-fintown-txt-1'>({NowData?.exchange})</p>
            </div>

            <h1 className='text-fintown-txt-1 text-[20px] mb-[20px]'>{NowData?.companyName}</h1>

            <button className='text-sm text-fintown-txt-1 rounded-[6px] py-[6px] px-[9px] bg-fintown-btn-2 mb-[20px]'>{NowData?.industry}</button>

            <div
                ref={overviewRef}
                className="text-sm text-fintown-txt-1 mb-[30px] text-justify overflow-hidden"
                style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 4,
                    marginBottom: "10px"
                }}
            >
                {NowData?.overview}
            </div>

            <div className='mb-[50px]'> 
                <Link href={`/dashboard/co-phieu/${NowData?.symbol}/ho-so-doanh-nghiep`} className="text-blue-500 text-sm underline">
                    Xem chi tiết
                </Link>
            </div>

            <div className='flex items-center gap-x-[10px]'>
                <a href={`https://${NowData?.website}`} target="_blank" rel="noopener noreferrer">
                    <button className='text-sm text-fintown-txt-1 rounded-[6px] py-[6px] px-[9px] bg-fintown-btn-2 flex items-center'>
                        <i className='bx bx-link-alt mr-[7px]'></i> 
                        <span>Website công ty</span>
                    </button>
                </a>


                <button className='text-sm text-fintown-txt-1 rounded-[6px] py-[6px] px-[9px] bg-fintown-btn-2 flex items-center'>
                    <i className='bx bx-tv mr-[7px]'></i>
                    <span>Biểu đồ kỹ thuật</span>
                </button>
            </div>
        </div>
        </>
    )
}

export default StockProfileSummary;