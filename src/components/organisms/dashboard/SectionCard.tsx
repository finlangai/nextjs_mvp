import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { CardStock } from "@/src/interfaces/CardStock";
import {
    fetchIndustry,
    selectIndustry,
    fetchTopGainers,
    selectTopGainers,
    selectIndustryLoading,
    selectTopGainersLoading,
    fetchRevenue,
    selectRevenue,
    selectRevenueLoading
} from "@/src/redux/CardStock";
import { selectProfileSummaryData } from '@/src/redux/ProfileSummary';
import LineChart from '../../charts/CardStockChart';
import { BarsLoader } from '../../common/Loader';

export default function SectionCard({ endpoint, nameSection, dashboard }: { endpoint: string; nameSection: string; dashboard: boolean }) {
    const dispatch = useAppDispatch();
    const [stockData, setStockData] = useState<CardStock[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const selectIndustryData = useAppSelector(selectIndustry);
    const selectTopGainersData = useAppSelector(selectTopGainers);
    const selectProfileSummary = useAppSelector(selectProfileSummaryData);
    const selectRevenueData = useAppSelector(selectRevenue)
    const IndustryLoading = useAppSelector(selectIndustryLoading);
    const TopGainersLoading = useAppSelector(selectTopGainersLoading);
    const RevenueLoading = useAppSelector(selectRevenueLoading);

    const [slidePosition, setSlidePosition] = useState(0);
    const [canSlideMore, setCanSlideMore] = useState(true);
    const [canSlideBack, setCanSlideBack] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    // Theo dõi profile summary để lấy industry từ đó call api lấy data
    useEffect(() => {
        const industry: string | undefined = selectProfileSummary?.industry
        if (industry) {
            if (endpoint === "industry") {
                dispatch(fetchIndustry({ name: industry, limit: 4 }));
                setIsLoading(IndustryLoading);
            } else if (endpoint === "top-gainer") {
                dispatch(fetchTopGainers({ limit: 4 }));
                setIsLoading(TopGainersLoading);
            }
        }

    }, [selectProfileSummary]);


    useEffect(() => {
        if (dashboard) {
            if (endpoint === "revenue") {
                dispatch(fetchRevenue({ limit: 10 }));
                setIsLoading(RevenueLoading);
            }
        }
    }, [dashboard])

    // Cập nhật data cho cardstock
    useEffect(() => {
        if (endpoint === "industry") {
            const filteredData = selectIndustryData.filter(item => item.symbol !== selectProfileSummary?.symbol);
            setStockData(filteredData);
            setIsLoading(IndustryLoading);
        } else if (endpoint === "top-gainer") {
            const filteredData = selectTopGainersData.filter(item => item.symbol !== selectProfileSummary?.symbol);
            setStockData(filteredData);
            setIsLoading(TopGainersLoading);
        }
        else if (endpoint === "revenue") {
            setStockData(selectRevenueData);
            setIsLoading(RevenueLoading);
        }
    }, [selectIndustryData, selectTopGainersData, selectRevenueData]);

    // ===================SLLIDER=========================================
    const slideAmount = 200;
    useEffect(() => {
        checkSlideAbility();
        window.addEventListener('resize', checkSlideAbility);
        return () => window.removeEventListener('resize', checkSlideAbility);
    }, [slidePosition]);

    const checkSlideAbility = () => {
        if (containerRef.current && sliderRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const sliderWidth = sliderRef.current.scrollWidth;
            const currentPosition = slidePosition;

            setCanSlideMore(currentPosition + containerWidth < sliderWidth);
            setCanSlideBack(currentPosition > 0);
        }
    };

    const handleSlideLeft = () => {
        if (canSlideMore) {
            setSlidePosition(prev => prev + slideAmount);
        }
    };

    const handleSlideRight = () => {
        if (canSlideBack) {
            setSlidePosition(prev => Math.max(0, prev - slideAmount));
        }
    };


    // ==================RENDER============================================

    if (isLoading) {
        return (
            <>
                <div className='flex justify-center items-center max-h-[240px] min-h-[240px]'>
                    < BarsLoader />
                </div>
            </>
        )
    }

    if (stockData.length === 0) {
        return "";
    };

    return (
        <>
            <div className="text-[24px] font-bold text-fintown-txt-1 dark:text-fintown-txt-1-light px-[40px] mb-[35px]">
                {nameSection}
            </div>

            <div ref={containerRef} className='pl-[40px] relative mb-[106px]'>
                {
                    stockData.length >= 4 && (
                        <button
                            onClick={handleSlideLeft}
                            disabled={!canSlideMore}
                            className={`flex items-center justify-center w-[40px] h-[40px] absolute rounded-[50%] ml-[-18px] top-[40%] z-30 transition-all duration-300
                        ${canSlideMore
                                    ? 'bg-fintown-btn-2 dark:bg-fintown-btn-2-light cursor-pointer hover:opacity-80'
                                    : 'hidden'}`}
                        >
                            <i className={`bx bx-chevron-left text-[24px] ${canSlideMore ? 'text-fintown-txt-1 dark:text-fintown-txt-1-light' : 'text-gray-500'}`}></i>
                        </button>
                    )
                }

                {canSlideBack && (
                    <button
                        onClick={handleSlideRight}
                        disabled={!canSlideBack}
                        className={`flex items-center justify-center w-[40px] h-[40px] absolute rounded-[50%] right-[18px] top-[40%] z-30 transition-all duration-300
                        ${canSlideBack
                                ? 'bg-fintown-btn-2 dark:bg-fintown-btn-2-light cursor-pointer hover:opacity-80'
                                : 'bg-gray-300 cursor-not-allowed'}`}
                    >
                        <i className={`bx bx-chevron-right text-[24px] ${canSlideBack ? 'text-fintown-txt-1 dark:text-fintown-txt-1-light' : 'text-gray-500'}`}></i>
                    </button>
                )}

                <div
                    ref={sliderRef}
                    className="flex items-center gap-[20px]"
                    style={{
                        marginLeft: `-${slidePosition}px`,
                        transition: isDragging ? 'none' : 'margin-left 0.2s ease-in-out',
                        userSelect: 'none'
                    }}
                >
                    {
                        stockData.map((x) => (
                            <div key={x.symbol} className="rounded-xl border border-fintown-br dark:border-fintown-br-light max-w-[380px] max-h-[240px] min-w-[380px] ">
                                <div className="flex px-6 pt-[24px]">
                                    <div className="overflow-hidden min-w-[40px] max-w-[40px] h-[40px] rounded-full bg-white mr-[10px] border border-fintown-br dark:border-fintown-br-light">
                                        <img className="w-full h-full object-contain" src={x.logo} alt={x.symbol} />
                                    </div>
                                    <div className='w-full min-w-0'>
                                        <div className="flex">
                                            <Link href={`/dashboard/co-phieu/${x.symbol}/`}><p className="text-fintown-txt-1 dark:text-fintown-txt-1-light font-bold mr-[5px] hover:text-fintown-pr9">{x.symbol}</p></Link>
                                            <Link href={`/dashboard/co-phieu/${x.symbol}/`}><p className="text-fintown-txt-1 dark:text-fintown-txt-1-light">({x.exchange})</p></Link>
                                        </div>
                                        <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-sm overflow-hidden whitespace-nowrap text-ellipsis">{x.companyName}</div>
                                    </div>
                                </div>
                                <div className="flex items-center mt-[16px]">
                                    <p className="text-fintown-txt-1 dark:text-fintown-txt-1-light font-bold text-xl ml-[69px] mr-[10px]">{x.price.toLocaleString('en-US')}</p>
                                    <div
                                        className={`flex items-center py-[5px] px-[5px] rounded-[8px] w-max text-white ${x?.delta === undefined
                                            ? 'bg-fintown-stt-hold'   // Nếu delta là undefined, mặc định là hold
                                            : x?.delta < 0
                                                ? 'bg-fintown-stt-sell'   // Nếu delta < 0 thì background màu sell
                                                : x?.delta > 0
                                                    ? 'bg-fintown-stt-buy'    // Nếu delta > 0 thì background màu buy
                                                    : 'bg-fintown-stt-hold'   // Nếu delta = 0 thì background màu hold
                                            }`}
                                    >
                                        <i
                                            className={`bx ${x?.delta === undefined
                                                ? ''                       // Không hiện icon nếu delta là undefined
                                                : x?.delta < 0
                                                    ? 'bx-caret-down'          // Icon mũi tên xuống nếu delta < 0
                                                    : 'bx-caret-up'            // Icon mũi tên lên nếu delta > 0
                                                } text-fintown-txt-1 text-sx mr-[5px]`}
                                        ></i>
                                        <span>
                                            {
                                                x?.delta === 0 ? "0.00" : x.delta
                                            }

                                        </span>
                                        <span>%</span>
                                    </div>
                                </div>
                                <div>
                                    <LineChart data={x.quotes} />
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
        </>
    );
}
