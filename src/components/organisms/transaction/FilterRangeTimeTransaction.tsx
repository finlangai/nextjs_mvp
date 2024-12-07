import React, { useState } from "react";
import BasicDateRangePicker from "../DateRangePicker";
import { Dayjs } from "dayjs";
import {
    fetchcompanyTransaction,
} from "@/src/redux/CompanyTransactions";
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { selectLimitPage, setRange, setCurrentPage } from '@/src/redux/HistoricalDataPage';

export default function FilterRangeTimeTransaction({ symbol }: { symbol: string }) {
    const dispatch = useAppDispatch();
    const limitPagination = useAppSelector(selectLimitPage);

    const [startDate, setStartDate] = useState<number | null>(null);
    const [endDate, setEndDate] = useState<number | null>(null);

    const handleStartDateChange = (date: Dayjs | null) => {
        if (date) {
            const unixTime = date.startOf('day').unix();
            setStartDate(unixTime);
        }
    };

    const handleEndDateChange = (date: Dayjs | null) => {
        if (date) {
            const unixTime = date.startOf('day').unix();
            setEndDate(unixTime);
        }
    };

    const clickFilter = () => {
        const offset = ``;
        const start_and_end = `&start=${startDate}&end=${endDate}`;
        dispatch(fetchcompanyTransaction({ symbol: symbol, limit: limitPagination, offset: offset, start_and_end: start_and_end }));
        dispatch(setRange(start_and_end));
        dispatch(setCurrentPage(1));
    }

    return (
        <div className='px-[40px] flex items-center gap-x-[26px] mb-[40px]'>
            <div className='flex items-center gap-x-[15px]'>
                {/* DatePicker cho ngày bắt đầu */}
                <BasicDateRangePicker onDateChange={handleStartDateChange} />
                <div className='text-fintown-txt-1 text-[14px] mt-[8px]'>đến</div>
                {/* DatePicker cho ngày kết thúc */}
                <BasicDateRangePicker onDateChange={handleEndDateChange} />
                <button
                    onClick={clickFilter}
                    disabled={startDate === null || endDate === null}
                    className={`flex items-center py-[14px] px-[20px] rounded-[10px] ${startDate === null || endDate === null
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-fintown-pr9'
                        } justify-center mt-[8px]`}
                >
                    <div className='text-fintown-txt-1 text-[14px]'>Xác nhận</div>
                </button>
            </div>
        </div>
    );
}
