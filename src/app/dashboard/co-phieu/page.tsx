"use client";
import React from 'react';
import StockTable from "@/src/components/organisms/StockTable";
import useSetSelectedButtonSiderBar from '@/src/redux/hooks/useButtonsiderBar';

export default function CoPhieu() {
    useSetSelectedButtonSiderBar(2);

    return (
        <>
            <div className="flex items-center py-[20px] gap-x-[84px] border-b border-fintown-lnr-1 mb-[80px] px-[40px]">

                <div className="flex items-center ">
                    <div className="mr-[12px] text-sm text-fintown-txt-1">VỐN HÓA:</div>
                    <div className="text-sm text-fintown-txt-1 font-semibold">6,721,328T</div>
                </div>

                <div className="flex items-center ">
                    <div className="mr-[12px] text-sm text-fintown-txt-1">SỐ LƯỢNG CỔ PHIẾU:</div>
                    <div className="text-sm text-fintown-txt-1 font-semibold">30</div>
                </div>

                <div className="flex items-center ">
                    <div className="mr-[12px] text-sm text-fintown-txt-1">P/E:</div>
                    <div className="text-sm text-fintown-txt-1 font-semibold">13,25</div>
                </div>

                <div className="flex items-center ">
                    <div className="mr-[12px] text-sm text-fintown-txt-1">P/B:</div>
                    <div className="text-sm text-fintown-txt-1 font-semibold">1.69</div>
                </div>

            </div>

            <h1 className="text-[50px] font-bold text-fintown-txt-1 px-[40px]">Danh sách cổ phiếu</h1>

            <p className="text-sx text-fintown-txt-2 mb-[70px] px-[40px]">Danh sách này cung cấp cái nhìn tổng quan về biến động giá cả và các chỉ số  của của tất cả cổ phiếu trên thị trường hiện tại với dữ liệu có sẵn của Fintown. </p>
            
            <div className="px-[40px]">
                < StockTable/>
            </div>

            <div className="mb-[70px]"></div>

            {/* <div className="w-full flex justify-end px-[40px]">
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
            </div>

            <div className="mb-[100px]"></div> */}
        </>
    );
 }