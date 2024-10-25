"use client";
import React, { useEffect, useRef, useState } from 'react';
import SelectViewType from '@/src/components/common/SelectViewType';
import UpsideChart from '@/src/components/charts/UpsideChart';
import useSetSelectedValuetionPage from '@/src/redux/hooks/useButtonValuetionPage';

export default function TongQuanPage({ params }: { params: { symbol: string } }){
    useSetSelectedValuetionPage(0);

    const [selectedOptions, setSelectedOptions] = useState<{[key: number]: 'Kiểu xem 1' | 'Kiểu xem 2' | 'Kiểu xem 3'}>({});
    const handleOptionChange = (index: number, option: 'Kiểu xem 1' | 'Kiểu xem 2' | 'Kiểu xem 3') => {
        setSelectedOptions(prev => ({
          ...prev,
          [index]: option
        }));
    };

    const stockPrice = 150.75;
    const upside = 25;

    return (
        <>
            <div className='w-full'>
                <div className='py-[30px] px-[24px] flex items-center justify-between border-r border-b border-fintown-br'>
                    <div className='text-[16px] font-bold text-fintown-txt-1'>
                        Các kết quả định giá so với giá trị thị trường của cổ phiếu
                    </div>
                    <div>
                        < SelectViewType onOptionChange={(option: 'Kiểu xem 1' | 'Kiểu xem 2' | 'Kiểu xem 3') => handleOptionChange(1, option)} />
                    </div>
                </div>

                <div className='px-[26px] py-[25px]'>
                    <div className='grid grid-cols-3 gap-4'>
                        <div className='border border-fintown-br aspect-square py-[18px] px-[24px]'>
                            <div className='text-fintown-txt-1 text-[14px] w-full text-center mb-[60px]'>
                                Giá trị thị trường
                            </div>
                            <div className='w-full flex justify-center'>
                                <div className='w-max'>
                                    <div className='text-fintown-txt-1 font-bold text-[36px] text-center'>
                                        141,583
                                    </div>

                                    <div className='text-[12px] text-fintown-txt-1 text-right'>
                                        VND
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='border border-fintown-br aspect-square py-[18px] px-[24px]'>
                            <div className='text-fintown-txt-1 text-[14px] w-full text-center '>
                                Chiết khấu dòng tiền (5Y)
                            </div>

                            <div className='w-full flex justify-center'>
                                < UpsideChart stockPrice={stockPrice} upside={upside} />
                            </div>

                            <div className='flex justify-center'>
                                <div className='flex items-end'>
                                    <div className='text-fintown-txt-1 font-bold text-[14px] mr-[10px]'>
                                        Giá trị thực:
                                    </div>
                                    <div className='text-[14px] text-fintown-txt-1 mr-[5px] font-bold'>
                                        142,520 VND
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='border border-fintown-br aspect-square py-[18px] px-[24px]'>
                            <div className='text-fintown-txt-1 text-[14px] w-full text-center '>
                                Chiết khấu cổ tức (5Y)
                            </div>

                            <div className='w-full flex justify-center'>
                                < UpsideChart stockPrice={stockPrice} upside={upside} />
                            </div>

                            <div className='flex justify-center'>
                                <div className='flex items-end'>
                                    <div className='text-fintown-txt-1 font-bold text-[14px] mr-[10px]'>
                                        Giá trị thực:
                                    </div>
                                    <div className='text-[14px] text-fintown-txt-1 mr-[5px] font-bold'>
                                        142,520 VND
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='border border-fintown-br aspect-square py-[18px] px-[24px]'>
                            <div className='text-fintown-txt-1 text-[14px] w-full text-center '>
                                Benjamin Graham (10Y)
                            </div>

                            <div className='w-full flex justify-center'>
                                < UpsideChart stockPrice={stockPrice} upside={upside} />
                            </div>

                            <div className='flex justify-center'>
                                <div className='flex items-end'>
                                    <div className='text-fintown-txt-1 font-bold text-[14px] mr-[10px]'>
                                        Giá trị thực:
                                    </div>
                                    <div className='text-[14px] text-fintown-txt-1 mr-[5px] font-bold'>
                                        142,520 VND
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='border border-fintown-br aspect-square py-[18px] px-[24px]'>
                            <div className='text-fintown-txt-1 text-[14px] w-full text-center '>
                                Hệ số P/E
                            </div>

                            <div className='w-full flex justify-center'>
                                < UpsideChart stockPrice={stockPrice} upside={upside} />
                            </div>

                            <div className='flex justify-center'>
                                <div className='flex items-end'>
                                    <div className='text-fintown-txt-1 font-bold text-[14px] mr-[10px]'>
                                        Giá trị thực:
                                    </div>
                                    <div className='text-[14px] text-fintown-txt-1 mr-[5px] font-bold'>
                                        142,520 VND
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='border border-fintown-br aspect-square py-[18px] px-[24px]'>
                            <div className='text-fintown-txt-1 text-[14px] w-full text-center '>
                            Hệ số P/B
                            </div>

                            <div className='w-full flex justify-center'>
                                < UpsideChart stockPrice={stockPrice} upside={upside} />
                            </div>

                            <div className='flex justify-center'>
                                <div className='flex items-end'>
                                    <div className='text-fintown-txt-1 font-bold text-[14px] mr-[10px]'>
                                        Giá trị thực:
                                    </div>
                                    <div className='text-[14px] text-fintown-txt-1 mr-[5px] font-bold'>
                                        142,520 VND
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>      
                </div>
            </div>
        </>
    )   
}