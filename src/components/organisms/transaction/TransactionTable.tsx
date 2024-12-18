import React, { useState, useEffect, useRef } from "react";
import { records } from "@/src/interfaces/CompanyTransactions";
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { BarsLoader } from '../../common/Loader';
import {
    fetchcompanyTransaction,
    selectcompanyTransactionLoading,
    selectcompanyTransactionError,
    selectcompanyTransactionRecords,
    selectcompanyTransactionTotal
} from "@/src/redux/CompanyTransactions";
import { convertUnixToDate } from "@/src/utils/convertUnixToDate";
import Pagination from "../Pagination";
import { selectLimitPage, setTotalPages, selectTotalPages } from '@/src/redux/HistoricalDataPage';

export default function TransactionTable({ symbol }: { symbol: string }) {
    const dispatch = useAppDispatch();
    const companyTransactionRecords = useAppSelector(selectcompanyTransactionRecords);
    const companyTransactionTotal = useAppSelector(selectcompanyTransactionTotal);
    const [NowData, setNowData] = useState<records[] | null>(null);
    const companyTransactionLoading = useAppSelector(selectcompanyTransactionLoading);
    const limitPagination = useAppSelector(selectLimitPage);
    const selectTotalpages = useAppSelector(selectTotalPages);

    // Fetch API Lần đầu
    const hasFetched = useRef(false);
    useEffect(() => {
        if (!hasFetched.current) {
            const offset = ``;
            dispatch(fetchcompanyTransaction({ symbol: symbol, limit: limitPagination, offset: offset, start_and_end: '' }));
            hasFetched.current = true;
        }
    }, [dispatch]);

    // Lưu data đã fetch
    useEffect(() => {
        if (companyTransactionRecords !== null) {
            setNowData(companyTransactionRecords);
        }
    }, [companyTransactionRecords]);

    // Set tổng số items để tạo ra danh sách trang
    useEffect(() => {
        if (typeof companyTransactionTotal === 'number' && companyTransactionTotal !== selectTotalpages) {
            const totalItems: number = companyTransactionTotal;
            const totalPages = Math.ceil(totalItems / limitPagination);
            dispatch(setTotalPages(totalPages));
            console.log(companyTransactionTotal, selectTotalpages)
        }
    }, [companyTransactionTotal]);

    if (companyTransactionLoading) {
        return (
            <>
                <div className='flex w-full justify-center items-center h-[428px]'>
                    < BarsLoader />
                </div>
            </>
        )
    };

    return (
        <>
            <div className='border border-fintown-br dark:border-fintown-br-light rounded-[8px] overflow-hidden mb-[40px]'>
                <table className='w-full '>
                    <thead className='bg-fintown-btn-2 dark:bg-fintown-btn-2-light border-b-[2px] border-fintown-pr9 '>
                        <tr className="h-[35px] text-fintown-txt-1 dark:text-fintown-txt-1-light">
                            <th className=' font-bold border-r border-b border-fintown-br dark:border-fintown-br-light text-[14px] text-center'>Tổ chức/người GD</th>
                            <th colSpan={2} className=' border-r border-b border-fintown-br dark:border-fintown-br-light font-bold text-[14px] text-center'>Người liên quan</th>
                            <th rowSpan={2} className=' border-r border-fintown-br dark:border-fintown-br-light font-bold text-[14px] text-center'>SLCP trước GD</th>
                            <th colSpan={4} className=' border-r border-b border-fintown-br dark:border-fintown-br-light font-bold text-[14px] text-center'>Đăng ký</th>
                            <th colSpan={3} className=' border-r border-b border-fintown-br dark:border-fintown-br-light font-bold text-[14px] text-center'>Kết quả</th>
                            <th rowSpan={2} className=' border-r border-fintown-br dark:border-fintown-br-light font-bold text-[14px] text-center'>SLCP sau GD</th>
                            <th rowSpan={2} className=' font-bold text-[14px] text-center'>Tỷ lệ(%)</th>
                        </tr>
                        <tr className="h-[35px] text-fintown-txt-1 dark:text-fintown-txt-1-light">
                            <td className=' text-[14px] border-r border-fintown-br dark:border-fintown-br-light text-center'>Chức vụ</td>
                            <td className=' text-[14px] border-r border-fintown-br dark:border-fintown-br-light text-center'>Tên</td>
                            <td className=' text-[14px] border-r border-fintown-br dark:border-fintown-br-light text-center'>Chức vụ</td>
                            <td className=' text-[14px] border-r border-fintown-br dark:border-fintown-br-light text-center'>Mua</td>
                            <td className=' text-[14px] border-r border-fintown-br dark:border-fintown-br-light text-center'>Bán</td>
                            <td className=' text-[14px] border-r border-fintown-br dark:border-fintown-br-light text-center'>Ngày BĐ</td>
                            <td className=' text-[14px] border-r border-fintown-br dark:border-fintown-br-light text-center'>Ngày KT</td>
                            <td className=' text-[14px] border-r border-fintown-br dark:border-fintown-br-light text-center'>Mua</td>
                            <td className=' text-[14px] border-r border-fintown-br dark:border-fintown-br-light text-center'>Bán</td>
                            <td className=' text-[14px] border-r border-fintown-br dark:border-fintown-br-light text-center'>Ngày TH</td>
                        </tr>
                    </thead>

                    <tbody>
                        {NowData && NowData?.map((val: records, index: number) => (
                            <tr key={index} className='border-b border-fintown-br dark:border-fintown-br-light text-fintown-txt-1 dark:text-fintown-txt-1-light text-[14px]'>
                                <td className="h-[60px] border-r border-b border-fintown-br dark:border-fintown-br-light px-[10px]">
                                    <p className='font-bold'>{val.transactioner.name}</p>
                                    <span className='text-[12px]'>{val.transactioner.position}</span>
                                </td>
                                <td className='text-center border-r border-fintown-br dark:border-fintown-br-light px-[8px]'>{val.related.name}</td>
                                <td className='text-center border-r border-fintown-br dark:border-fintown-br-light px-[8px]'>{val.related.position}</td>
                                <td className='text-center border-r border-fintown-br dark:border-fintown-br-light px-[8px]'>{val.volumeBeforeTransaction.toLocaleString('en-US')}</td>
                                <td className='text-center border-r border-fintown-br dark:border-fintown-br-light px-[8px]'>{val.plan.buyVolume.toLocaleString('en-US')}</td>
                                <td className='text-center border-r border-fintown-br dark:border-fintown-br-light px-[8px]'>{val.plan.sellVolume.toLocaleString('en-US')}</td>
                                <td className='text-center border-r border-fintown-br dark:border-fintown-br-light px-[8px]'>{convertUnixToDate(val.plan.beginDate)}</td>
                                <td className='text-center border-r border-fintown-br dark:border-fintown-br-light px-[8px]'>{convertUnixToDate(val.plan.endDate)}</td>
                                <td className='text-center border-r border-fintown-br dark:border-fintown-br-light px-[8px]'>{val.result.buyVolume.toLocaleString('en-US')}</td>
                                <td className='text-center border-r border-fintown-br dark:border-fintown-br-light px-[8px]'>{val.result.sellVolume.toLocaleString('en-US')}</td>
                                <td className='text-center border-r border-fintown-br dark:border-fintown-br-light px-[8px]'>{convertUnixToDate(val.result.executionDate)}</td>
                                <td className='text-center border-r border-fintown-br dark:border-fintown-br-light px-[8px]'>{val.volumeAfterTransaction.toLocaleString('en-US')}</td>
                                <td className='text-center px-[8px]'>{val.ownership}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            < Pagination symbol={symbol} />
        </>
    );
}