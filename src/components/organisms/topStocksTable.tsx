import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { fetchTopStocks, selectTopStockssData, selectTopStockssError, selectTopStockssLoading } from '@/src/redux/TopStocks';
import { TickerList } from '@/src/interfaces/TickerList';
import { SpinerLoader } from '../common/Loader';
import Link from 'next/link';
import TopStockTheadTable from './TopStockTheadTable';

export default function TopStocksTable() {
    const dispatch = useAppDispatch();
    const TopStockssData = useAppSelector(selectTopStockssData);
    const [NowData, setNowData] = useState<TickerList[] | null>(null);
    const hasFetched = useRef(false);
    const TopStockssLoading = useAppSelector(selectTopStockssLoading);

    // Fetch API Lần đầu
    useEffect(() => {
        if (!hasFetched.current) {
            dispatch(fetchTopStocks({ limit: 5, offset: "", sortOn: "marketcap",  sortOrder: "desc" }));
            hasFetched.current = true;
        }
    }, [dispatch]);
    
    // Lưu data đã fetch
    useEffect(() => {
        if (TopStockssData !== null) {
            setNowData(TopStockssData);
        }
    }, [TopStockssData]);


    return (
        <div className='min-h-[460px]'>
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

                < TopStockTheadTable />

                {
                    TopStockssLoading ? (
                        <tbody>
                        <tr>
                            <td colSpan={11}>
                                <div className="flex w-full justify-center items-center h-[428px]">
                                    <SpinerLoader />
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    ) : (
                        NowData?.map((val) => (
                        <tbody key={val.symbol}>
                            <tr
                                className="border-b border-fintown-lnr-1 hover:bg-fintown-hvr-btn-1"
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
        </div>
    )
}