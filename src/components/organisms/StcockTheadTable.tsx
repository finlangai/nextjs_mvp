import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { fetchTickerList, } from '@/src/redux/TickerList';
import { selectLimitPage } from '@/src/redux/TickerList';

export default function StockTheadTable(){
    const dispatch = useAppDispatch();
    const limitPagination = useAppSelector(selectLimitPage);

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
        <>
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
        </>
    )
}