"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useAppDispatch } from '@/src/redux/hooks/useAppStore';
import useSetSelectedButtonStockPage from '@/src/redux/hooks/useButtonstockPage';
import CompareChart from '@/src/components/charts/CompareChart';
import SlidingTabs from '@/src/components/common/SlidingTabs';
import AddItemsLeftBarCompare from '@/src/components/organisms/comparison/AddItemsLeftBarCompare';
import CompareItemsRow from '@/src/components/organisms/comparison/CompareItemsRow';
import CompareTable from '@/src/components/organisms/comparison/CompareTable';
import { fetchGetComparison } from '@/src/redux/Comparison';

interface Tab {
    id: number;
    label: string;
}

export default function SoSanhPage({ params }: { params: { symbol: string } }) {
    const { symbol } = params;
    const dispatch = useAppDispatch();
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
    const hasFetched = useRef(false);

    // Xác định UI của trang đang ở
    useSetSelectedButtonStockPage(5);

    // const tabs: Tab[] = [
    //     { id: 0, label: "So sánh đôi" },
    //     { id: 1, label: "So sánh tổng hợp" }
    // ];

    // const handleTabChange = (index: number) => {
    //     setActiveTabIndex(index);
    // };

    // Fetch API Lần đầu
    
    useEffect(() => {
        if (!hasFetched.current) {
            dispatch(fetchGetComparison(symbol));
            hasFetched.current = true;
        }
    }, [dispatch]);

    return (
        <>
        <div className='flex pb-[50px]'>
            <div className='pl-[40px] pt-[30px] pr-[26px]'>
                < AddItemsLeftBarCompare />
            </div>

            <div className='pt-[30px] pr-[34px]'>
                <CompareChart />
            </div>

            <div className='pt-[30px] w-full pr-[40px]'>
                {/* <div className='flex justify-between pb-[33px] items-center'>
                    <SlidingTabs onTabChange={handleTabChange} tabs={tabs} gap={"18px"} startIndex={0} fontsize={'14px'}/>
                    <div className='text-fintown-txt-1 text-[14px]'>*Kỳ tính toán: Quý 2 - 2024</div>
                </div> */}

                {/* < CompareItemsRow /> */}

                < CompareTable />
            </div>
        </div>
        </>
    );
}
