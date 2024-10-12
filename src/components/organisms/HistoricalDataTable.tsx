import React, {useState, useEffect, useRef} from "react";
import { companyTransactions, records, total } from "@/src/interfaces/CompanyTransactions";
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { BarsLoader } from '../common/Loader';
import { 
    fetchcompanyTransaction, 
    selectcompanyTransactionLoading, 
    selectcompanyTransactionError,
    selectcompanyTransactionRecords,
    selectcompanyTransactionTotal
} from "@/src/redux/CompanyTransactions";
import { convertUnixToDate } from "@/src/utils/convertUnixToDate";

export default function HistoricalDataTable({symbol} : {symbol: string}) {
    const dispatch = useAppDispatch();
    const companyTransactionRecords = useAppSelector(selectcompanyTransactionRecords);
    const companyTransactionTotal = useAppSelector(selectcompanyTransactionTotal);
    const [NowData, setNowData] = useState<records[] | null>(null);
    const companyTransactionLoading = useAppSelector(selectcompanyTransactionLoading);
    const [total, setTotal] = useState<total | null>(null); 

    const hasFetched = useRef(false);
    useEffect(() => {
        if (!hasFetched.current) {
            dispatch(fetchcompanyTransaction({symbol: symbol, limit: 1000 }));
            hasFetched.current = true;
        }
    }, [dispatch]);

    useEffect(() => {
        if (companyTransactionRecords !== null) {
            setNowData(companyTransactionRecords);
            setTotal(companyTransactionTotal);
        }
    }, [companyTransactionRecords]);

    if (companyTransactionLoading) {
        return (
            <>
            <div className='flex w-full justify-center items-center h-[428px]'>
                < BarsLoader/>
            </div>
            </>
        )
    };

    return (
        <>
        <div className='border border-fintown-br rounded-[8px] overflow-hidden mb-[40px]'>
            <table className='w-full '>
                <thead className='bg-fintown-bg-stn border-b-[2px] border-fintown-pr9 '>
                    <tr className="h-[35px]">
                        <th className='text-fintown-txt-1 font-bold border-r border-b border-fintown-br text-[14px] text-center'>Tổ chức/người GD</th>
                        <th colSpan={2} className='text-fintown-txt-1 border-r border-b border-fintown-br font-bold text-[14px] text-center'>Người liên quan</th>
                        <th rowSpan={2} className='text-fintown-txt-1 border-r border-fintown-br font-bold text-[14px] text-center'>SLCP trước GD</th>
                        <th colSpan={4} className='text-fintown-txt-1 border-r border-b border-fintown-br font-bold text-[14px] text-center'>Đăng ký</th>
                        <th colSpan={3} className='text-fintown-txt-1 border-r border-b border-fintown-br font-bold text-[14px] text-center'>Kết quả</th>
                        <th rowSpan={2} className='text-fintown-txt-1 border-r border-fintown-br font-bold text-[14px] text-center'>SLCP sau GD</th>
                        <th rowSpan={2} className='text-fintown-txt-1 font-bold text-[14px] text-center'>Tỷ lệ(%)</th>
                    </tr>
                    <tr className="h-[35px]">
                        <td className='text-fintown-txt-1 text-[14px] border-r border-fintown-br text-center'>Chức vụ</td>
                        <td className='text-fintown-txt-1 text-[14px] border-r border-fintown-br text-center'>Tên</td>
                        <td className='text-fintown-txt-1 text-[14px] border-r border-fintown-br text-center'>Chức vụ</td>
                        <td className='text-fintown-txt-1 text-[14px] border-r border-fintown-br text-center'>Mua</td>
                        <td className='text-fintown-txt-1 text-[14px] border-r border-fintown-br text-center'>Bán</td>
                        <td className='text-fintown-txt-1 text-[14px] border-r border-fintown-br text-center'>Ngày BĐ</td>
                        <td className='text-fintown-txt-1 text-[14px] border-r border-fintown-br text-center'>Ngày KT</td>
                        <td className='text-fintown-txt-1 text-[14px] border-r border-fintown-br text-center'>Mua</td>
                        <td className='text-fintown-txt-1 text-[14px] border-r border-fintown-br text-center'>Bán</td>
                        <td className='text-fintown-txt-1 text-[14px] border-r border-fintown-br text-center'>Ngày TH</td>
                    </tr>
                </thead>

                <tbody>
                {NowData && NowData?.map((val: records, index: number) => (
                        <tr key={index} className='border-b border-fintown-br'>
                            <td className="h-[60px] border-r border-b border-fintown-br px-[10px]">
                                <p className='text-[14px] text-fintown-txt-1 font-bold'>{val.transactioner.name}</p>
                                <span className='text-[12px] text-fintown-txt-1'>{val.transactioner.position}</span>
                            </td>
                            <td className='text-[14px] text-fintown-txt-1 text-center border-r border-fintown-br px-[8px]'>{val.related.name}</td>
                            <td className='text-[14px] text-fintown-txt-1 text-center border-r border-fintown-br px-[8px]'>{val.related.position}</td>
                            <td className='text-[14px] text-fintown-txt-1 text-center border-r border-fintown-br px-[8px]'>{val.volumeBeforeTransaction.toLocaleString('en-US')}</td>
                            <td className='text-[14px] text-fintown-txt-1 text-center border-r border-fintown-br px-[8px]'>{val.plan.buyVolume.toLocaleString('en-US')}</td>
                            <td className='text-[14px] text-fintown-txt-1 text-center border-r border-fintown-br px-[8px]'>{val.plan.sellVolume.toLocaleString('en-US')}</td>
                            <td className='text-[14px] text-fintown-txt-1 text-center border-r border-fintown-br px-[8px]'>{convertUnixToDate(val.plan.beginDate)}</td>
                            <td className='text-[14px] text-fintown-txt-1 text-center border-r border-fintown-br px-[8px]'>{convertUnixToDate(val.plan.endDate)}</td>
                            <td className='text-[14px] text-fintown-txt-1 text-center border-r border-fintown-br px-[8px]'>{val.result.buyVolume.toLocaleString('en-US')}</td>
                            <td className='text-[14px] text-fintown-txt-1 text-center border-r border-fintown-br px-[8px]'>{val.result.sellVolume.toLocaleString('en-US')}</td>
                            <td className='text-[14px] text-fintown-txt-1 text-center border-r border-fintown-br px-[8px]'>{convertUnixToDate(val.result.executionDate)}</td>
                            <td className='text-[14px] text-fintown-txt-1 text-center border-r border-fintown-br px-[8px]'>{val.volumeAfterTransaction.toLocaleString('en-US')}</td>
                            <td className='text-[14px] text-fintown-txt-1 text-center px-[8px]'>{val.ownership}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* <div className="w-full flex justify-end">
            <div className="flex items-center gap-x-[12px]">
                <button className="flex items-center">
                    <i 
                    className='
                    bx bx-chevron-left
                    text-[30px] text-fintown-btn-disable 
                    h-[28px] w-[28px] rounded
                    hover:bg-fintown-hvr-btn-1'></i>
                </button>

                <button className="text-sx text-fintown-txt-1 bg-fintown-btn-active-1 h-[28px] w-[28px] rounded font-medium">1</button>
                <button className="text-sx text-fintown-txt-2 bg-fintown-btn-disable h-[28px] w-[28px] rounded font-medium">2</button>
                <button className="text-sx text-fintown-txt-2 bg-fintown-btn-disable h-[28px] w-[28px] rounded font-medium">3</button>
                <button className="text-sx text-fintown-txt-2 bg-fintown-btn-disable h-[28px] w-[28px] rounded font-medium">...</button>
                <button className="text-sx text-fintown-txt-2 bg-fintown-btn-disable h-[28px] w-[28px] rounded font-medium">53</button>

                <button className="flex items-center">
                    <i 
                    className='
                    bx bx-chevron-right
                    text-[30px] text-fintown-btn-disable 
                    h-[28px] w-[28px] rounded
                    hover:bg-fintown-hvr-btn-1'></i>
                </button>
            </div>
        </div> */}
        </>
    );
}