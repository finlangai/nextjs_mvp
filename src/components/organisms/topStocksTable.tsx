import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { fetchTopStocks, selectTopStockssData, selectTopStockssError, selectTopStockssLoading } from '@/src/redux/TopStocks';
import { TickerList } from '@/src/interfaces/TickerList';
import { BarsLoader } from '../common/Loader';
import Link from 'next/link';

export default function TopStocksTable() {
    const dispatch = useAppDispatch();
    const TopStockssData = useAppSelector(selectTopStockssData);
    const [NowData, setNowData] = useState<TickerList[] | null>(null);
    const hasFetched = useRef(false);
    const TopStockssLoading = useAppSelector(selectTopStockssLoading);

    // Fetch API Lần đầu
    useEffect(() => {
        if (!hasFetched.current) {
            dispatch(fetchTopStocks({ limit: 5 }));
            hasFetched.current = true;
        }
    }, [dispatch]);
    
    // Lưu data đã fetch
    useEffect(() => {
        if (TopStockssData !== null) {
            setNowData(TopStockssData);
        }
    }, [TopStockssData]);

    if (TopStockssLoading) {
        return (
            <>
            <div className='flex w-full justify-center items-center h-[428px]'>
                < BarsLoader/>
            </div>
            </>
        )
    };

    return (
        <table className="table-fixed w-full">
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

            <thead>
                <tr>
                    <th className="bg-fintown-bg-stn rounded-l-[10px] p-[12px]">
                        <div className="text-left">
                            <span className="text-sm font-normal text-fintown-txt-1">Mã cổ phiếu</span>
                        </div>
                    </th>

                    <th className="bg-fintown-bg-stn p-[12px]">
                        <div className="flex relative justify-end">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 mr-[15px]">Vốn hóa</p>
                            <div className="flex flex-col text-[10px] gap-y-1.5 absolute right-2.5 top-0.5">
                                <i className='bx bx-caret-up w-0 h-0 text-fintown-txt-1'></i>
                                <i className='bx bx-caret-down w-0 h-0 text-fintown-txt-1'></i>
                            </div>
                        </div>
                    </th>

                    <th className="bg-fintown-bg-stn p-[12px]">
                        <div className="flex relative justify-end">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 mr-[15px]">Giá</p>
                            <div className="flex flex-col text-[10px] gap-y-1.5 absolute right-2.5 top-0.5">
                                <i className='bx bx-caret-up w-0 h-0 text-fintown-txt-1'></i>
                                <i className='bx bx-caret-down w-0 h-0 text-fintown-txt-1'></i>
                            </div>
                        </div>
                    </th>

                    <th className="bg-fintown-bg-stn p-[12px]">
                        <div className="flex relative justify-end">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 mr-[15px]">Thay đổi giá</p>
                            <div className="flex flex-col text-[10px] gap-y-1.5 absolute right-2.5 top-2.5">
                                <i className='bx bx-caret-up w-0 h-0 text-fintown-txt-1'></i>
                                <i className='bx bx-caret-down w-0 h-0 text-fintown-txt-1'></i>
                            </div>
                        </div>
                    </th>

                    <th className="bg-fintown-bg-stn p-[12px]">
                        <div className="flex relative justify-end">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 mr-[15px]">7 ngày</p>
                            <div className="flex flex-col text-[10px] gap-y-1.5 absolute right-2.5 top-0.5">
                                <i className='bx bx-caret-up w-0 h-0 text-fintown-txt-1'></i>
                                <i className='bx bx-caret-down w-0 h-0 text-fintown-txt-1'></i>
                            </div>
                        </div>
                    </th>

                    <th className="bg-fintown-bg-stn p-[12px]">
                        <div className="flex relative justify-end">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 mr-[15px]">1 năm</p>
                            <div className="flex flex-col text-[10px] gap-y-1.5 absolute right-2.5 top-0.5">
                                <i className='bx bx-caret-up w-0 h-0 text-fintown-txt-1'></i>
                                <i className='bx bx-caret-down w-0 h-0 text-fintown-txt-1'></i>
                            </div>
                        </div>
                    </th>

                    <th className="bg-fintown-bg-stn p-[12px]">
                        <div className="flex relative justify-end">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 mr-[15px]">P/E</p>
                            <div className="flex flex-col text-[10px] gap-y-1.5 absolute right-2.5 top-0.5">
                                <i className='bx bx-caret-up w-0 h-0 text-fintown-txt-1'></i>
                                <i className='bx bx-caret-down w-0 h-0 text-fintown-txt-1'></i>
                            </div>
                        </div>
                    </th>

                    <th className="bg-fintown-bg-stn p-[12px]">
                        <div className="flex relative justify-end">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 mr-[15px]">P/B</p>
                            <div className="flex flex-col text-[10px] gap-y-1.5 absolute right-2.5 top-0.5">
                                <i className='bx bx-caret-up w-0 h-0 text-fintown-txt-1'></i>
                                <i className='bx bx-caret-down w-0 h-0 text-fintown-txt-1'></i>
                            </div>
                        </div>
                    </th>

                    <th className="bg-fintown-bg-stn p-[12px]">
                        <div className="flex relative justify-end">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 mr-[15px]">ROE</p>
                            <div className="flex flex-col text-[10px] gap-y-1.5 absolute right-2.5 top-0.5">
                                <i className='bx bx-caret-up w-0 h-0 text-fintown-txt-1'></i>
                                <i className='bx bx-caret-down w-0 h-0 text-fintown-txt-1'></i>
                            </div>
                        </div>
                    </th>

                    <th className="bg-fintown-bg-stn p-[12px]">
                        <div className="flex relative justify-end">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 mr-[15px]">Sàn</p>
                            <div className="flex flex-col text-[10px] gap-y-1.5 absolute right-2.5 top-0.5">
                                <i className='bx bx-caret-up w-0 h-0 text-fintown-txt-1'></i>
                                <i className='bx bx-caret-down w-0 h-0 text-fintown-txt-1'></i>
                            </div>
                        </div>
                    </th>

                    <th className="bg-fintown-bg-stn rounded-r-[10px] p-[12px]">
                        <div className="flex relative justify-end">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 mr-[15px]">Ngành</p>
                            <div className="flex flex-col text-[10px] gap-y-1.5 absolute right-2.5 top-0.5">
                                <i className='bx bx-caret-up w-0 h-0 text-fintown-txt-1'></i>
                                <i className='bx bx-caret-down w-0 h-0 text-fintown-txt-1'></i>
                            </div>
                        </div>
                    </th>
                </tr>
            </thead>

            <tbody>

            {NowData?.map((val) => (       
                <tr className="border-b border-fintown-lnr-1 hover:bg-fintown-hvr-btn-1" key={val.symbol}>
                    <td className="py-[21px] px-[12px]">
                        <div className="flex">
                            <div className="overflow-hidden min-w-[40px] max-w-[40px] min-h-[40px] max-h-[40px] rounded-[50%] bg-white mr-[10px]">
                                <img className="w-full h-full object-contain" src={val.logo} alt={val.symbol} />
                            </div>
                            <div className='w-full'>
                                <Link href={`/dashboard/co-phieu/${val.symbol}`}>
                                    <p className="text-fintown-txt-1 text-sm hover:text-fintown-pr9 font-bold">{val.symbol}</p>
                                </Link>
                                <div className="text-fintown-txt-1 text-xs overflow-hidden whitespace-nowrap text-ellipsis mr-[20px]">
                                    {val.companyName}
                                </div>
                            </div>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">{val.marketCap.toLocaleString('en-US')}T</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">{val.price.toLocaleString('en-US')}</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p 
                                className={`text-right text-sm ${
                                val.dailyDelta > 0 ? 'text-fintown-stt-buy' : 
                                val.dailyDelta < 0 ? 'text-fintown-stt-sell' : 
                                'text-fintown-txt-1'
                            }`}>{val.dailyDelta}%</p>                        
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p 
                                className={`text-right text-sm ${
                                val.weeklyDelta > 0 ? 'text-fintown-stt-buy' : 
                                val.weeklyDelta < 0 ? 'text-fintown-stt-sell' : 
                                'text-fintown-txt-1'
                            }`}>{val.weeklyDelta}%</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p 
                            className={`text-right text-sm ${
                                val.yearlyDelta > 0 ? 'text-fintown-stt-buy' : 
                                val.yearlyDelta < 0 ? 'text-fintown-stt-sell' : 
                                'text-fintown-txt-1'
                            }`}
                            >
                            {val.yearlyDelta}%
                            </p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">{val.pe}</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">{val.pb}</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">{val.roe}</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">{val.exchange}</p>
                        </div>
                    </td>

                    <td className="py-[21px] px-[12px]">
                        <div>
                            <p className="text-fintown-txt-1 text-right text-sm">{val.industry}</p>
                        </div>
                    </td>
                </tr>
            ))}

            </tbody>
        </table>
    )
}