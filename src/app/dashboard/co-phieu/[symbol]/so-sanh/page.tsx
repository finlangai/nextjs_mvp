"use client";
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import useSetSelectedButtonSiderBar from '@/src/redux/hooks/useButtonsiderBar';
import useSetSelectedButtonStockPage from '@/src/redux/hooks/useButtonstockPage';
import CompareChart from '@/src/components/charts/CompareChart';
import SlidingTabs from '@/src/components/common/SlidingTabs';
import AddItemsLeftBarCompare from '@/src/components/organisms/AddItemsLeftBarCompare';
import CompareItemsRow from '@/src/components/organisms/CompareItemsRow';
import CompareTable from '@/src/components/organisms/forecasting/CompareTable';

interface Tab {
    id: number;
    label: string;
}

export default function SoSanhPage({ params }: { params: { symbol: string } }) {
    const { symbol } = params;
    const dispatch = useAppDispatch();
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

    // Xác định UI của trang đang ở
    useSetSelectedButtonSiderBar(3);
    useSetSelectedButtonStockPage(5);

    const tabs: Tab[] = [
        { id: 0, label: "So sánh đôi" },
        { id: 1, label: "So sánh tổng hợp" }
    ];

    const handleTabChange = (index: number) => {
        setActiveTabIndex(index);
    };

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
                <div className='flex justify-between pb-[33px] items-center'>
                    <SlidingTabs onTabChange={handleTabChange} tabs={tabs} gap={"18px"} startIndex={0} fontsize={'14px'}/>
                    <div className='text-fintown-txt-1 text-[14px]'>*Kỳ tính toán: Quý 2 - 2024</div>
                </div>

                < CompareItemsRow />

                < CompareTable />
            </div>
        </div>
        </>
    );
}
