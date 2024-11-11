import React, {useState, useEffect, useRef} from "react";
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { 
    setCurrentPage, 
    selectCurrentPage, 
    selectTotalPages, 
    selectLimitPage, 
    setOffset,
} from '@/src/redux/HistoricalDataPage';
import { fetchcompanyTransaction } from '@/src/redux/CompanyTransactions';

export default function Pagination({symbol} : {symbol: string}) {
    const dispatch = useAppDispatch();
    const currentPage = useAppSelector(selectCurrentPage);
    const totalPages = useAppSelector(selectTotalPages);
    const selectLimit = useAppSelector(selectLimitPage);

    const handlePageChange = (page: number) => {        
        const newOffset = (page - 1) * selectLimit;
        let offset = `&offset=${newOffset}`;

        if (newOffset === 0) {
            offset = ``;
        }

        dispatch(setCurrentPage(page));
        dispatch(setOffset(newOffset));

        dispatch(fetchcompanyTransaction({
            symbol: symbol, 
            limit: selectLimit, 
            offset: offset,
            start_and_end: ''
        }));
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                pageNumbers.push(
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`text-sx ${currentPage === i ? 'text-fintown-txt-1 bg-fintown-btn-active-1' : 'text-fintown-txt-2 bg-fintown-btn-disable'} h-[28px] w-[28px] rounded font-medium`}
                    >
                        {i}
                    </button>
                );
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                pageNumbers.push(
                    <button key={i} className="text-sx text-fintown-txt-2 bg-fintown-btn-disable h-[28px] w-[28px] rounded font-medium">
                        ...
                    </button>
                );
            }
        }
        return pageNumbers;
    };

    return (
        <div className="w-full flex justify-end">
            <div className="flex items-center gap-x-[12px]">
                <button
                    className="flex items-center"
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                >
                    <i className='bx bx-chevron-left text-[30px] text-fintown-btn-disable h-[28px] w-[28px] rounded hover:bg-fintown-hvr-btn-1'></i>
                </button>
                
                {renderPageNumbers()}
                
                <button
                    className="flex items-center"
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                >
                    <i className='bx bx-chevron-right text-[30px] text-fintown-btn-disable h-[28px] w-[28px] rounded hover:bg-fintown-hvr-btn-1'></i>
                </button>
            </div>
        </div>
    );
}