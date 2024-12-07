"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useAppDispatch } from '@/src/redux/hooks/useAppStore';
import useSetSelectedButtonStockPage from '@/src/redux/hooks/useButtonstockPage';
import CompareChart from '@/src/components/charts/CompareChart';
import AddItemsLeftBarCompare from '@/src/components/organisms/comparison/AddItemsLeftBarCompare';
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
                < AddItemsLeftBarCompare symbol={symbol} />
            </div>

            <div className='pt-[30px] pr-[34px]'>
                <CompareChart />
            </div>

            <div className='pt-[30px] w-full pr-[40px]'>
                < CompareTable />
            </div>
        </div>
        </>
    );
}
