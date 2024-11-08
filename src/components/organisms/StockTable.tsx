import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { fetchTickerList, selectTickerListsData, selectTickerListsLoading, selectTickerListsError } from '@/src/redux/TickerList';
import { TickerList } from '@/src/interfaces/TickerList';
import { SpinerLoader } from '../common/Loader';
import Link from 'next/link';
import { selectLimitPage, setTotalPages } from '@/src/redux/TickerList';
import StockTheadTable from './StcockTheadTable';

const StockTable = () => {
    const dispatch = useAppDispatch();
    const selectTickerLists = useAppSelector(selectTickerListsData);
    const [NowData, setNowData] = useState<TickerList[] | null>(null);
    const hasFetched = useRef(false);
    const limitPagination = useAppSelector(selectLimitPage);
    const TickerListsLoading = useAppSelector(selectTickerListsLoading);

    // Fetch API Lần đầu
    useEffect(() => {
        if (!hasFetched.current) {
            dispatch(fetchTickerList({ limit: limitPagination, offset: "", sortOn: "marketcap",  sortOrder: "desc" }));
            hasFetched.current = true;
        }
    }, [dispatch]);
    
    // Lưu data đã fetch
    useEffect(() => {
        if (selectTickerLists !== null) {
            setNowData(selectTickerLists);
        }
    }, [selectTickerLists]);

    // Set tổng số items để tạo ra danh sách trang
    useEffect(()=> {
        const total = 30;
        if (typeof total === 'number') {
            const totalItems: number = total;
            const totalPages = Math.ceil(totalItems / limitPagination);
            dispatch(setTotalPages(totalPages));
        }    
    }, []);

    return (
        <table className="table-fixed w-full relative">
            <colgroup>
                <col className="w-[230px]" />
                <col className="min-w-[90px]" />
                <col className="min-w-[90px]" />
                <col className="min-w-[105px]" />
                <col className="min-w-[90px]" />
                <col className="min-w-[90px]" />
                <col className="min-w-[90px]" />
                <col className="min-w-[90px]" />
                <col className="min-w-[90px]" />
                <col className="min-w-[90px]" />
                <col className="min-w-[105px]" />
            </colgroup>

            < StockTheadTable />

            {
                TickerListsLoading ? (
                    <div className="flex w-full justify-center items-center h-[428px] absolute">
                        <SpinerLoader />
                    </div>
                ) : (
                    NowData?.map((val) => (
                    <tbody>
                        <tr
                            className="border-b border-fintown-lnr-1 hover:bg-fintown-hvr-btn-1"
                            key={val.symbol}
                        >
                            <td className="py-[21px] px-[12px]">
                                <div className="flex">
                                    <div className="overflow-hidden min-w-[40px] max-w-[40px] min-h-[40px] max-h-[40px] rounded-[50%] bg-white mr-[10px]">
                                        <img
                                            className="w-full h-full object-contain"
                                            src={val.logo}
                                            alt={val.symbol}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <Link href={`/dashboard/co-phieu/${val.symbol}`}>
                                            <p className="text-fintown-txt-1 text-sm hover:text-fintown-pr9 font-bold">
                                                {val.symbol}
                                            </p>
                                        </Link>
                                        <div className="text-fintown-txt-1 text-xs overflow-hidden whitespace-nowrap text-ellipsis mr-[20px]">
                                            {val.companyName}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="py-[21px] px-[12px] text-fintown-txt-1 text-right text-sm">
                                {val.marketCap.toLocaleString('en-US')}T
                            </td>
                            <td className="py-[21px] px-[12px] text-fintown-txt-1 text-right text-sm">
                                {val.price.toLocaleString('en-US')}
                            </td>
                            <td
                                className={`py-[21px] px-[12px] text-right text-sm ${
                                    val.dailyDelta > 0
                                        ? 'text-fintown-stt-buy'
                                        : val.dailyDelta < 0
                                        ? 'text-fintown-stt-sell'
                                        : 'text-fintown-txt-1'
                                }`}
                            >
                                {val.dailyDelta}%
                            </td>
                            <td
                                className={`py-[21px] px-[12px] text-right text-sm ${
                                    val.weeklyDelta > 0
                                        ? 'text-fintown-stt-buy'
                                        : val.weeklyDelta < 0
                                        ? 'text-fintown-stt-sell'
                                        : 'text-fintown-txt-1'
                                }`}
                            >
                                {val.weeklyDelta}%
                            </td>
                            <td
                                className={`py-[21px] px-[12px] text-right text-sm ${
                                    val.yearlyDelta > 0
                                        ? 'text-fintown-stt-buy'
                                        : val.yearlyDelta < 0
                                        ? 'text-fintown-stt-sell'
                                        : 'text-fintown-txt-1'
                                }`}
                            >
                                {val.yearlyDelta}%
                            </td>
                            <td className="py-[21px] px-[12px] text-fintown-txt-1 text-right text-sm">
                                {val.pe}
                            </td>
                            <td className="py-[21px] px-[12px] text-fintown-txt-1 text-right text-sm">
                                {val.pb}
                            </td>
                            <td className="py-[21px] px-[12px] text-fintown-txt-1 text-right text-sm">
                                {val.roe}
                            </td>
                            <td className="py-[21px] px-[12px] text-fintown-txt-1 text-right text-sm">
                                {val.exchange}
                            </td>
                            <td className="py-[21px] px-[12px] text-fintown-txt-1 text-right text-sm">
                                {val.industry}
                            </td>
                        </tr>
                    </tbody>
                    ))
                )
            }
        </table>
    )
}

export default StockTable