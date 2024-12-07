import React, { useState, useRef, useEffect } from 'react';
import ChangeStockInput from '@/src/components/organisms/ChangeStock';
import { ProfileSummary } from "@/src/interfaces/ProfileSummary";
import { useAppSelector } from '@/src/redux/hooks/useAppStore';
import { selectProfileSummaryData } from '@/src/redux/ProfileSummary';

import { SpinerLoader, BarsLoader } from '../common/Loader';

const StockMetricsSummary = ({ symbol } : {symbol: string;}) => {
    const selectProfileSummary = useAppSelector(selectProfileSummaryData);
    const [NowData, setNowData] = useState<ProfileSummary | null>(null);

    useEffect(() => {
        if (selectProfileSummary !== null) {
            setNowData(selectProfileSummary);
        }
    }, [selectProfileSummary]);

    if (selectProfileSummary === null) {
        return (
            <>
            <div className='flex w-full justify-center min-w-[594px] w-[full] items-center h-[428px]'>
                < BarsLoader/>
            </div>
            </>
        )
    };

    return (
        <>
            <div className='w-full'>
                <div className='flex w-full'>
                    <div className='text-fintown-txt-2 text-sm mb-[17px]'>Giá kết phiên</div>
                    <div className='ml-auto '>
                        <ChangeStockInput symbol={symbol} />
                    </div>
                </div>

                <div className='flex items-center mb-[21px]'>
                    <div className='text-fintown-txt-1 dark:text-fintown-txt-1-light font-bold text-[40px] mr-[20px]'>{NowData?.close.toLocaleString('en-US')}</div>
                    <div
                        className={`flex items-center py-[7px] px-[7px] rounded-[8px] w-max ${
                            NowData?.delta === undefined
                            ? 'bg-fintown-stt-hold'   // Nếu delta là undefined, mặc định là hold
                            : NowData?.delta < 0
                            ? 'bg-fintown-stt-sell'   // Nếu delta < 0 thì background màu sell
                            : NowData?.delta > 0
                            ? 'bg-fintown-stt-buy'    // Nếu delta > 0 thì background màu buy
                            : 'bg-fintown-stt-hold'   // Nếu delta = 0 thì background màu hold
                        }`}
                    >
                        <i
                            className={`bx ${
                            NowData?.delta === undefined
                                ? ''                       // Không hiện icon nếu delta là undefined
                                : NowData?.delta < 0
                                ? 'bx-caret-down'          // Icon mũi tên xuống nếu delta < 0
                                : 'bx-caret-up'            // Icon mũi tên lên nếu delta > 0
                            } text-fintown-txt-1 dark:text-fintown-txt-1-light text-sx mr-[5px]`}
                        ></i>
                        <p className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-sm font-bold">
                            {NowData?.delta !== undefined ? `${NowData.delta}%` : 'N/A'}
                        </p>
                    </div>

                </div>

                <div className='flex items-center w-full gap-x-[27px] mb-[27px]'>
                    {/* Hiển thị giá trị Thấp nhất */}
                    <div className='flex items-center'>
                        <div className='text-fintown-txt-2 text-sx mr-[15px]'>Thấp nhất:</div>
                        <div className='text-fintown-txt-1 dark:text-fintown-txt-1-light text-sx font-bold'>
                        {NowData?.low !== undefined ? NowData.low.toLocaleString('en-US') : 'N/A'}
                        </div>
                    </div>

                    {/* Thanh tiến trình */}
                    <div className="w-full max-w-[356px] relative">
                        {/* Nền của thanh */}
                        <div className="h-[6px] w-full bg-fintown-btn-disable dark:bg-fintown-btn-active-2 rounded"></div>

                        {/* Thanh tiến trình dựa trên giá trị close */}
                        {NowData?.close !== undefined && NowData?.low !== undefined && NowData?.high !== undefined && (
                            <div
                            className="h-[6px] bg-fintown-btn-active-2 dark:bg-fintown-btn-disable rounded absolute inset-0"
                            style={{
                                width: `${((NowData.close - NowData.low) / (NowData.high - NowData.low)) * 100}%`,
                            }}
                            ></div>
                        )}

                        {/* Icon chỉ vị trí hiện tại */}
                        {NowData?.close !== undefined && NowData?.low !== undefined && NowData?.high !== undefined && (
                            <i
                            className="bx bxs-up-arrow text-fintown-btn-active-2 dark:text-fintown-btn-disable absolute top-[1px]"
                            style={{
                                left: `${((NowData.close - NowData.low) / (NowData.high - NowData.low)) * 100}%`,
                                transform: 'translateX(-50%)', // Giúp icon căn giữa tại vị trí
                            }}
                            ></i>
                        )}
                    </div>


                    {/* Hiển thị giá trị Cao nhất */}
                    <div className='flex items-center'>
                        <div className='text-fintown-txt-2 text-sx mr-[15px]'>Cao nhất:</div>
                        <div className='text-fintown-txt-1 dark:text-fintown-txt-1-light text-sx font-bold'>
                        {NowData?.high !== undefined ? NowData.high.toLocaleString('en-US') : 'N/A'}
                        </div>
                    </div>
                    </div>


                <hr className='w-full border-fintown-btn-disable mb-[27px]' />

                <div className='grid grid-cols-3 gap-4 gap-y-[24px] mb-[27px]'>
                    <div>
                        <div className='text-sx text-fintown-txt-2'>Vốn hóa</div>
                        <div className='text-sx text-fintown-txt-1 dark:text-fintown-txt-1-light'>{NowData?.marketCap.toLocaleString('en-US')} (Tỷ)</div>
                    </div>

                    <div>
                        <div className='text-sx text-fintown-txt-2'>P/E</div>
                        <div className='text-sx text-fintown-txt-1 dark:text-fintown-txt-1-light'>{NowData?.pe}</div>
                    </div>

                    <div>
                        <div className='text-sx text-fintown-txt-2'>ROE</div>
                        <div className='text-sx text-fintown-txt-1 dark:text-fintown-txt-1-light'>{NowData?.roe}%</div>
                    </div>

                    <div>
                        <div className='text-sx text-fintown-txt-2'>Khối lượng giao dịch</div>
                        <div className='text-sx text-fintown-txt-1 dark:text-fintown-txt-1-light'>{NowData?.tradingVolume.toLocaleString('en-US')}</div>
                    </div>

                    <div>
                        <div className='text-sx text-fintown-txt-2'>P/B</div>
                        <div className='text-sx text-fintown-txt-1 dark:text-fintown-txt-1-light'>{NowData?.pb}</div>
                    </div>

                    <div>
                        <div className='text-sx text-fintown-txt-2'>ROA</div>
                        <div className='text-sx text-fintown-txt-1 dark:text-fintown-txt-1-light'>{NowData?.roa}%</div>
                    </div>

                    <div>
                        <div className='text-sx text-fintown-txt-2'>Số lượng cổ phiếu lưu hành</div>
                        <div className='text-sx text-fintown-txt-1 dark:text-fintown-txt-1-light'>{NowData?.listingVolume.toLocaleString('en-US')}</div>
                    </div>

                    <div>
                        <div className='text-sx text-fintown-txt-2'>EPS</div>
                        <div className='text-sx text-fintown-txt-1 dark:text-fintown-txt-1-light'>{NowData?.eps.toLocaleString('en-US')}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StockMetricsSummary;