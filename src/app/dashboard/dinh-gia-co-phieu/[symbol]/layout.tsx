"use client";
import React, { useEffect, useRef, useState } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import ChangeStockInput from '@/src/components/organisms/ChangeStock';
import { selectSelectedButton } from '@/src/redux/ValuetionPage/valuetionPageSlice';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks/useAppStore';
import useSetSelectedButtonSiderBar from '@/src/redux/hooks/useButtonsiderBar';
import { setHistorySelectedButton, selectHistorySelectedButton } from '@/src/redux/ValuetionPage/valuationHistorySlice';
import LogValuation from '@/src/components/organisms/LogValuation';

export default function DinhGiaCoPhieuLayout({ children, params }: { children: React.ReactNode, params: { symbol: string } }){
    const symbol = params.symbol.toUpperCase();
    const isValidSymbol = /^[A-Z]{3}$/.test(symbol);
    if (!isValidSymbol) {
        redirect('/dashboard/'); 
    }

    const dispatch = useAppDispatch();
    const selectedButton = useAppSelector(selectSelectedButton);
    useSetSelectedButtonSiderBar(6);

    const selectedTabRight = useAppSelector(selectHistorySelectedButton);

    const containerRef = useRef<HTMLDivElement>(null);
    const [containerHeight, setContainerHeight] = useState<number>(0);

    useEffect(() => {
      // Lấy chiều cao của phần tử cha sau khi component đã render
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight);
      }
  
      // Thiết lập listener để cập nhật chiều cao khi có sự thay đổi kích thước
      const handleResize = () => {
        if (containerRef.current) {
          setContainerHeight(containerRef.current.clientHeight);
        }
      };
  
      window.addEventListener('resize', handleResize);
  
      // Dọn dẹp listener khi component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return (
        <>
            <div className='flex h' >
                <div className='w-full ' >
                    <div className='pl-[40px] border-r border-b border-fintown-br '>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center py-[16px] border-r border-fintown-br w-full justify-between'>
                                <div className='flex items-center'>
                                    <div className='h-[50px] w-[50px] rounded-[50%] overflow-hidden bg-white mr-[13px]'>
                                        <img className='h-full w-full object-contain' src="/imgs/logo_cty/vcb.png" alt="" />
                                    </div>

                                    <div>
                                        <p className='text-[16px] text-fintown-txt-1 font-bold'>
                                            VCB
                                        </p>
                                        <div className='text-[14px] font-[400] text-fintown-txt-2'>
                                            Công ty cổ phần vàng bạc đá quý Phú Nhuận
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
                                        419,142
                                    </div>
                                </div>

                                <div className='flex items-center justify-between '>
                                    <div className='text-left text-[12px] font-bold text-fintown-txt-2 mr-[7px]'>
                                        Khối lượng:
                                    </div>
                                    <div className='text-right text-[12px] text-fintown-txt-1'>
                                        1,721,200
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex border-r border-fintown-br'>

                        <div className='min-w-[265px] w-max pl-[40px] pt-[25px] pr-[24px] border-r border-fintown-br flex flex-col gap-y-[10px]'>
                            <Link href={`/dashboard/dinh-gia-co-phieu/${symbol}/chiet-khau-dong-tien`}>
                                <div
                                    className={`cursor-pointer text-fintown-txt-1 text-[14px] font-bold w-full px-[17px] py-[14px] rounded-[8px] ${
                                    selectedButton === 0 ? 'bg-[#1E2127]' : 'hover:bg-[#1E2127]'
                                    }`}
                                >
                                    Chiết khấu dòng tiền
                                </div>
                            </Link>

                            <div
                            className={`cursor-pointer text-fintown-txt-1 text-[14px] font-bold w-full px-[17px] py-[14px] rounded-[8px] ${
                                selectedButton === 1 ? 'bg-[#1E2127]' : 'hover:bg-[#1E2127]'
                            }`}
                            >
                            Chiết khấu cổ tức
                            </div>

                            <div
                            className={`cursor-pointer text-fintown-txt-1 text-[14px] font-bold w-full px-[17px] py-[14px] rounded-[8px] ${
                                selectedButton === 2 ? 'bg-[#1E2127]' : 'hover:bg-[#1E2127]'
                            }`}
                            >
                            Benjamin Graham
                            </div>

                            <div
                            className={`cursor-pointer text-fintown-txt-1 text-[14px] font-bold w-full px-[17px] py-[14px] rounded-[8px] ${
                                selectedButton === 3 ? 'bg-[#1E2127]' : 'hover:bg-[#1E2127]'
                            }`}
                            >
                            Hệ số P/B
                            </div>

                            <div
                            className={`cursor-pointer text-fintown-txt-1 text-[14px] font-bold w-full px-[17px] py-[14px] rounded-[8px] ${
                                selectedButton === 4 ? 'bg-[#1E2127]' : 'hover:bg-[#1E2127]'
                            }`}
                            >
                            Hệ số P/E
                            </div>
                        </div>

                        <div className='w-full' ref={containerRef} >
                            {children}
                        </div>

                    </div> 
                </div>

                <div className='min-w-[300px] max-w-[300px]'>
                    < LogValuation containerHeight={containerHeight} />
                </div>
            </div>
        </>
    )   
}