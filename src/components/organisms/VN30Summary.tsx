import React, { useState, useRef, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks/useAppStore';
import { TickerListOverview } from '@/src/interfaces/TickerListOverview';
import { fetchTickerListOverview, selectTickerListOverviewData, selectTickerListOverviewError, selectTickerListOverviewLoading } from '@/src/redux/TickerListOverview';
import { SpinerLoader } from '../common/Loader';

export default function VN30Summary () {
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
                < SpinerLoader />
            </div>
        </>
        )
    }

    return (
        <>
        <div className="w-full pb-[27px] border-b border-b-fintown-br" >
            <div className="flex justify-between w-full">
                <div>
                    <div className="text-[14px] text-fintown-txt-2 mb-[10px]">Vốn hóa</div>
                    <div className="flex items-end">
                        <div className="text-[20px] font-bold text-fintown-txt-1 mr-[10px]">
                            {NowData?.marketcap.toLocaleString('en-US')}
                        </div>
                        <div className="text-[12px] font-bold text-fintown-txt-2 pb-[4px]">
                            Tỷ
                        </div>
                    </div>
                </div>

                <div>
                    <div className="text-[14px] text-fintown-txt-2 mb-[10px]">Doanh thu</div>
                    <div className="flex items-end">
                        <div className="text-[20px] font-bold text-fintown-txt-1 mr-[10px]">
                        {NowData?.revenue.toLocaleString('en-US')}
                        </div>
                        <div className="text-[12px] font-bold text-fintown-txt-2 pb-[4px]">
                            Tỷ
                        </div>
                    </div>
                </div>

                <div>
                    <div className="text-[14px] text-fintown-txt-2 mb-[10px]">Lợi nhuận</div>
                    <div className="flex items-end">
                        <div className="text-[20px] font-bold text-fintown-txt-1 mr-[10px]">
                        {NowData?.earnings.toLocaleString('en-US')}
                        </div>
                        <div className="text-[12px] font-bold text-fintown-txt-2 pb-[4px]">
                            Tỷ
                        </div>
                    </div>
                </div>

                <div>
                    <div className="text-[14px] text-fintown-txt-2 mb-[10px]">Chỉ số P/E</div>
                    <div className="flex items-end">
                        <div className="text-[20px] font-bold text-fintown-txt-1 mr-[10px]">
                        {NowData?.pe}
                        </div>
                    </div>
                </div>

                <div>
                    <div className="text-[14px] text-fintown-txt-2 mb-[10px]">Chỉ số P/B</div>
                    <div className="flex items-end">
                        <div className="text-[20px] font-bold text-fintown-txt-1 mr-[10px]">
                        {NowData?.pb}
                        </div>
                    </div>
                </div>

                <div>
                    <div className="text-[14px] text-fintown-txt-2 mb-[10px]">TBĐ 52 tuần</div>
                    <div className="flex items-end">
                        <div className="text-[20px] font-bold text-fintown-txt-1 mr-[10px]">
                        {NowData?.avg_52w}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
