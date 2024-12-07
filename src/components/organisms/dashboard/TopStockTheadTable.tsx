import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { fetchTopStocks } from '@/src/redux/TopStocks';

type SortColumn = 'marketcap' | 'price' | 'dailyDelta' | 'weeklyDelta' | 'yearlyDelta' | 'pe' | 'pb' | 'roe' | 'exchange' | 'industry';
type SortDirection = 'up' | 'down';

export default function TopStockTheadTable() {
    const dispatch = useAppDispatch();

    // Thêm state để theo dõi cột đang được sắp xếp
    const [activeColumn, setActiveColumn] = useState<SortColumn | null>(null);
    
    // State để lưu trạng thái của các icon
    const [sortOrder, setSortOrder] = useState<Record<SortColumn, SortDirection>>({
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

    const handleSortClick = (column: SortColumn) => {
        // Nếu click vào cùng một cột, đảo ngược hướng sắp xếp
        // Nếu click vào cột khác, reset tất cả các cột về up và set cột mới
        const newSortOrder: Record<SortColumn, SortDirection> = {
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
        };

        if (activeColumn === column) {
            // Nếu click vào cùng cột, chỉ đảo ngược hướng sắp xếp của cột đó
            newSortOrder[column] = sortOrder[column] === 'up' ? 'down' : 'up';
        } else {
            // Nếu click vào cột khác, set cột mới là 'up'
            newSortOrder[column] = 'up';
        }

        setActiveColumn(column);
        setSortOrder(newSortOrder);

        // Xác định thứ tự sortOrder để truyền vào API
        const sortOrderValue = newSortOrder[column] === 'up' ? 'asc' : 'desc';

        // Gọi dispatch để set bộ lọc
        dispatch(fetchTopStocks({ 
            limit: 5, 
            offset: "", 
            sortOn: column, 
            sortOrder: sortOrderValue
        }));
    };

    return (
        <>
            <thead>
                <tr>
                    <th className="bg-fintown-btn-2 dark:bg-fintown-btn-2-light rounded-l-[10px] p-[12px]">
                        <div className="text-left">
                            <span className="text-sm font-normal text-fintown-txt-1 dark:text-fintown-txt-1-light ">Mã cổ phiếu</span>
                        </div>
                    </th>

                    <th className="bg-fintown-btn-2 dark:bg-fintown-btn-2-light p-[12px] cursor-pointer">
                        <div 
                        onClick={() => handleSortClick('marketcap')}
                        className="flex justify-end items-center">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 dark:text-fintown-txt-1-light mr-[5px]">Vốn hóa</p>
                            <i className={`bx ${sortOrder.marketcap === 'up' ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'} text-fintown-txt-1 dark:text-fintown-txt-1-light`}></i>
                        </div>
                    </th>

                    <th className="bg-fintown-btn-2 dark:bg-fintown-btn-2-light p-[12px] cursor-pointer">
                        <div 
                        onClick={() => handleSortClick('price')}
                        className="flex relative justify-end items-center">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 dark:text-fintown-txt-1-light mr-[5px]">Giá</p>
                            <i className={`bx ${sortOrder.price === 'up' ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'} text-fintown-txt-1 dark:text-fintown-txt-1-light`}></i>
                        </div>
                    </th>

                    <th className="bg-fintown-btn-2 dark:bg-fintown-btn-2-light p-[12px] cursor-pointer">
                        <div 
                        onClick={() => handleSortClick('dailyDelta')}
                        className="flex relative justify-end items-center">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 dark:text-fintown-txt-1-light mr-[5px]">Thay đổi giá</p>
                            <i className={`bx ${sortOrder.dailyDelta === 'up' ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'} text-fintown-txt-1 dark:text-fintown-txt-1-light`}></i>
                        </div>
                    </th>

                    <th className="bg-fintown-btn-2 dark:bg-fintown-btn-2-light p-[12px] cursor-pointer">
                        <div 
                        onClick={() => handleSortClick('weeklyDelta')}
                        className="flex relative justify-end items-center">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 dark:text-fintown-txt-1-light mr-[5px]">7 ngày</p>
                            <i className={`bx ${sortOrder.weeklyDelta === 'up' ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'} text-fintown-txt-1 dark:text-fintown-txt-1-light`}></i>
                        </div>
                    </th>

                    <th className="bg-fintown-btn-2 dark:bg-fintown-btn-2-light p-[12px] cursor-pointer">
                        <div 
                        onClick={() => handleSortClick('yearlyDelta')}
                        className="flex relative justify-end items-center">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 dark:text-fintown-txt-1-light mr-[5px]">1 năm</p>
                            <i className={`bx ${sortOrder.yearlyDelta === 'up' ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'} text-fintown-txt-1 dark:text-fintown-txt-1-light`}></i>
                        </div>
                    </th>

                    <th className="bg-fintown-btn-2 dark:bg-fintown-btn-2-light p-[12px] cursor-pointer">
                        <div 
                        onClick={() => handleSortClick('pe')}
                        className="flex relative justify-end items-center">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 dark:text-fintown-txt-1-light mr-[5px]">P/E</p>
                            <i className={`bx ${sortOrder.pe === 'up' ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'} text-fintown-txt-1 dark:text-fintown-txt-1-light`}></i>
                        </div>
                    </th>

                    <th className="bg-fintown-btn-2 dark:bg-fintown-btn-2-light p-[12px] cursor-pointer">
                        <div 
                        onClick={() => handleSortClick('pb')}
                        className="flex relative justify-end items-center">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 dark:text-fintown-txt-1-light mr-[5px]">P/B</p>
                            <i className={`bx ${sortOrder.pb === 'up' ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'} text-fintown-txt-1 dark:text-fintown-txt-1-light`}></i>
                        </div>
                    </th>

                    <th className="bg-fintown-btn-2 dark:bg-fintown-btn-2-light p-[12px] cursor-pointer">
                        <div 
                        onClick={() => handleSortClick('roe')}
                        className="flex relative justify-end items-center">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 dark:text-fintown-txt-1-light mr-[5px]">ROE</p>
                            <i className={`bx ${sortOrder.roe === 'up' ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'} text-fintown-txt-1 dark:text-fintown-txt-1-light`}></i>
                        </div>
                    </th>

                    <th className="bg-fintown-btn-2 dark:bg-fintown-btn-2-light p-[12px] cursor-pointer">
                        <div 
                        onClick={() => handleSortClick('exchange')}
                        className="flex relative justify-end items-center">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 dark:text-fintown-txt-1-light mr-[5px]">Sàn</p>
                            <i className={`bx ${sortOrder.exchange === 'up' ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'} text-fintown-txt-1 dark:text-fintown-txt-1-light`}></i>
                        </div>
                    </th>

                    <th className="bg-fintown-btn-2 dark:bg-fintown-btn-2-light rounded-r-[10px] p-[12px] cursor-pointer">
                        <div 
                        onClick={() => handleSortClick('industry')}
                        className="flex relative justify-end items-center">
                            <p className="text-sm font-normal text-right text-fintown-txt-1 dark:text-fintown-txt-1-light mr-[5px]">Ngành</p>
                            <i className={`bx ${sortOrder.industry === 'up' ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'} text-fintown-txt-1 dark:text-fintown-txt-1-light`}></i>
                        </div>
                    </th>
                </tr>
            </thead>
        </>
    )
}