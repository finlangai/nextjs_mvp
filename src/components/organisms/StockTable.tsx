import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { fetchTickerList, selectTickerListsData, selectTickerListsLoading, selectTickerListsError } from '@/src/redux/TickerList';
import { TickerList } from '@/src/interfaces/TickerList';
import { BarsLoader, SpinerLoader } from '../common/Loader';
import Link from 'next/link';
import { selectLimitPage, setTotalPages } from '@/src/redux/TickerList';

const StockTable = () => {
    const dispatch = useAppDispatch();
    const selectTickerLists = useAppSelector(selectTickerListsData);
    const [NowData, setNowData] = useState<TickerList[] | null>(null);
    const hasFetched = useRef(false);
    const limitPagination = useAppSelector(selectLimitPage);
    const TickerListsLoading = useAppSelector(selectTickerListsLoading);

    // State để lưu trạng thái của các icon (up hoặc down)
    const [sortOrder, setSortOrder] = useState({
        marketcap: 'up',
        price: 'up',
        dailyDelta: 'up',
        weeklyDelta: 'up',
        yearlyDelta: 'up',
        pe: 'up',
        pb: 'up',
        roe: 'up',
        exchange: 'up',
        industry: 'up'
    });
    
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

    // Hàm xử lý sự kiện click
    const handleSortClick = (
        column: 'marketcap' | 'price' | 'dailyDelta' | 'weeklyDelta' | 'yearlyDelta' | 'pe' | 'pb' | 'roe' | 'exchange' | 'industry'
    ) => {
        // Thay đổi trạng thái icon
        const newSortOrder = sortOrder[column] === 'up' ? 'down' : 'up';
        setSortOrder((prevState) => ({
            ...prevState,
            [column]: newSortOrder,
        }));

        // Xác định thứ tự sortOrder để truyền vào API
        const sortOrderValue = newSortOrder === 'up' ? 'asc' : 'desc';

        // Gọi dispatch để set bộ lọc
        dispatch(fetchTickerList({ limit: limitPagination, offset: "", sortOn: column,  sortOrder: sortOrderValue}));
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

                    <th className="bg-fintown-bg-stn p-[12px] cursor-pointer">
                        <div 
                        onClick={() => handleSortClick('marketcap')}
                        className="flex justify-end items-center">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 mr-[5px]">Vốn hóa</p>
                            <i className={`bx ${sortOrder.marketcap === 'up' ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'} text-fintown-txt-1`}></i>
                        </div>
                    </th>

                    <th className="bg-fintown-bg-stn p-[12px] cursor-pointer">
                        <div 
                        onClick={() => handleSortClick('price')}
                        className="flex relative justify-end items-center">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 mr-[5px]">Giá</p>
                            <i className={`bx ${sortOrder.price === 'up' ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'} text-fintown-txt-1`}></i>
                        </div>
                    </th>

                    <th className="bg-fintown-bg-stn p-[12px] cursor-pointer">
                        <div 
                        onClick={() => handleSortClick('dailyDelta')}
                        className="flex relative justify-end items-center">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 mr-[5px]">Thay đổi giá</p>
                            <i className={`bx ${sortOrder.dailyDelta === 'up' ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'} text-fintown-txt-1`}></i>
                        </div>
                    </th>

                    <th className="bg-fintown-bg-stn p-[12px] cursor-pointer">
                        <div 
                        onClick={() => handleSortClick('weeklyDelta')}
                        className="flex relative justify-end items-center">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 mr-[5px]">7 ngày</p>
                            <i className={`bx ${sortOrder.dailyDelta === 'up' ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'} text-fintown-txt-1`}></i>
                        </div>
                    </th>

                    <th className="bg-fintown-bg-stn p-[12px] cursor-pointer">
                        <div 
                        onClick={() => handleSortClick('yearlyDelta')}
                        className="flex relative justify-end items-center">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 mr-[5px]">1 năm</p>
                            <i className={`bx ${sortOrder.yearlyDelta === 'up' ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'} text-fintown-txt-1`}></i>
                        </div>
                    </th>

                    <th className="bg-fintown-bg-stn p-[12px] cursor-pointer">
                        <div 
                        onClick={() => handleSortClick('pe')}
                        className="flex relative justify-end items-center">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 mr-[5px]">P/E</p>
                            <i className={`bx ${sortOrder.pe === 'up' ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'} text-fintown-txt-1`}></i>
                        </div>
                    </th>

                    <th className="bg-fintown-bg-stn p-[12px] cursor-pointer">
                        <div 
                        onClick={() => handleSortClick('pb')}
                        className="flex relative justify-end items-center">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 mr-[5px]">P/B</p>
                            <i className={`bx ${sortOrder.pb === 'up' ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'} text-fintown-txt-1`}></i>
                        </div>
                    </th>

                    <th className="bg-fintown-bg-stn p-[12px] cursor-pointer">
                        <div 
                        onClick={() => handleSortClick('roe')}
                        className="flex relative justify-end items-center">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 mr-[5px]">ROE</p>
                            <i className={`bx ${sortOrder.roe === 'up' ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'} text-fintown-txt-1`}></i>
                        </div>
                    </th>

                    <th className="bg-fintown-bg-stn p-[12px] cursor-pointer">
                        <div 
                        onClick={() => handleSortClick('exchange')}
                        className="flex relative justify-end items-center">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 mr-[5px]">Sàn</p>
                            <i className={`bx ${sortOrder.exchange === 'up' ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'} text-fintown-txt-1`}></i>
                        </div>
                    </th>

                    <th className="bg-fintown-bg-stn rounded-r-[10px] p-[12px] cursor-pointer">
                        <div 
                        onClick={() => handleSortClick('industry')}
                        className="flex relative justify-end items-center">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 mr-[5px]">Ngành</p>
                            <i className={`bx ${sortOrder.industry === 'up' ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'} text-fintown-txt-1`}></i>
                        </div>
                    </th>
                </tr>
            </thead>

            <tbody>
                {
                TickerListsLoading ? (
                    <div className="flex w-full justify-center items-center h-[428px]">
                        <SpinerLoader />
                    </div>
                ) : (
                    NowData?.map((val) => (
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
                    ))
                )
                }
            </tbody>
        </table>
    )
}

export default StockTable