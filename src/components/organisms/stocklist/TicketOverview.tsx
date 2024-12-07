import React, { useState, useRef, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks/useAppStore';
import { TickerListOverview } from '@/src/interfaces/TickerListOverview';
import { fetchTickerListOverview, selectTickerListOverviewData, selectTickerListOverviewError, selectTickerListOverviewLoading } from '@/src/redux/TickerListOverview';
import { SpinerLoader } from '../../common/Loader';

export default function TicketOverview(){
    const dispatch = useAppDispatch();
    const selectData = useAppSelector(selectTickerListOverviewData);
    const selectLoading = useAppSelector(selectTickerListOverviewLoading);
    const [NowData, setNowData] = useState<TickerListOverview | null>(null);
    const hasFetched = useRef(false);

    // Fetch API Lần đầu
    useEffect(() => {
        if (!hasFetched.current) {
        dispatch(fetchTickerListOverview());
        hasFetched.current = true;
        }
    }, [dispatch]);

    // Lưu data đã fetch
    useEffect(() => {
        if (selectData !== null) {
        setNowData(selectData);
        }
    }, [selectData]);

    if (selectLoading) {
        return (
        <>
            <div className="flex items-center gap-x-[30px] justify-center w-[40%]">
                {/* < SpinerLoader /> */}
            </div>
        </>
        )
    }

    return(
        <>
            <div className="flex items-center py-[20px] gap-x-[50px] border-b border-fintown-lnr-1 mb-[80px] px-[40px]">

                <div className="flex items-center ">
                    <div className="mr-[5px] text-fintown-txt-2 text-[14px]">
                        Vốn hóa:
                    </div>
                    <div className="text-fintown-txt-1 text-[14px]">
                        {NowData?.marketcap.toLocaleString('en-US')} tỷ
                    </div>
                </div>

                <div className="flex items-center ">
                    <div className="mr-[5px] text-fintown-txt-2 text-[14px]">
                        Số lượng cổ phiếu:
                    </div>
                    <div className="text-fintown-txt-1 text-[14px]">
                        {NowData?.total}
                    </div>                   
                </div>

                <div className="flex items-center ">
                    <div className="mr-[5px] text-fintown-txt-2 text-[14px]">
                        P/E:
                    </div>
                    <div className="text-fintown-txt-1 text-[14px]">
                        {NowData?.pe}
                    </div>                
                </div>

                <div className="flex items-center ">
                    <div className="mr-[5px] text-fintown-txt-2 text-[14px]">
                        P/B:
                    </div>
                    <div className="text-fintown-txt-1 text-[14px]">
                        {NowData?.pb}
                    </div>
                </div>

                </div>
        
        </>
    )
}