import React, { useState, useRef, useEffect } from 'react';
import ChangeStockInput from '@/src/components/organisms/ChangeStock';
import { fetchProfileSummaries, selectProfileSummaryData, selectProfileSummaryLoading } from '@/src/redux/ProfileSummary';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks/useAppStore';
import { ProfileSummary } from '@/src/interfaces/ProfileSummary';
import { SpinerLoader } from '../../common/Loader';

export default function ValuationHeader({ symbol }: { symbol: string }) {
    const dispatch = useAppDispatch();
    const selectData = useAppSelector(selectProfileSummaryData);
    const selectLoading = useAppSelector(selectProfileSummaryLoading);
    const [nowData, setNowData] = useState<ProfileSummary | null>(null);
    const hasFetched = useRef(false);

    // Fetch API lần đầu
    useEffect(() => {
        if (!hasFetched.current) {
            dispatch(fetchProfileSummaries({ symbol }));
            hasFetched.current = true;
        }
    }, [dispatch, symbol]);

    // Lưu data đã fetch
    useEffect(() => {
        if (selectData !== null) {
            setNowData(selectData);
        }
    }, [selectData]);

    if (selectLoading) {
        return (
            <div className="flex items-center gap-x-[30px] justify-center w-[40%] border-b border-b-fintown-br flex w-full py-[17px]">
                <SpinerLoader />
            </div>
        );
    }

    return (
        <>
            <div className='flex items-center justify-between'>
                <div className='flex items-center py-[16px] border-r border-fintown-br w-full justify-between'>
                    <div className='flex items-center'>
                        <div className='h-[50px] w-[50px] rounded-[50%] overflow-hidden bg-white mr-[13px]'>
                            <img className='h-full w-full object-contain' src={nowData?.logo} alt={nowData?.symbol} />
                        </div>

                        <div>
                            <p className='text-[16px] text-fintown-txt-1 font-bold'>
                                {nowData?.symbol}
                            </p>
                            <div className='text-[14px] font-[400] text-fintown-txt-2'>
                                {nowData?.companyName}
                            </div>
                        </div>
                    </div>

                    <div className='pr-[24px]'>
                        {/* <div className='text-[12px] font-bold text-fintown-txt-2'>Đổi cổ phiếu</div> */}
                        < ChangeStockInput symbol={symbol} />
                    </div>
                </div>
                <div className='px-[24px] py-[21px] min-w-[214px]'>
                    <div className='flex items-center justify-between mb-[7px]'>
                        <div className='text-left text-[12px] font-bold text-fintown-txt-2 mr-[7px]'>
                            Giá:
                        </div>
                        <div className='text-right text-[12px] text-fintown-txt-1'>
                            {nowData?.close.toLocaleString('en-US')}
                        </div>
                    </div>

                    <div className='flex items-center justify-between '>
                        <div className='text-left text-[12px] font-bold text-fintown-txt-2 mr-[7px]'>
                            Khối lượng:
                        </div>
                        <div className='text-right text-[12px] text-fintown-txt-1'>
                            {nowData?.tradingVolume.toLocaleString('en-US')}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}