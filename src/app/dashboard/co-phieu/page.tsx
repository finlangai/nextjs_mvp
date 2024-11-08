"use client";
import React from 'react';
import StockTable from "@/src/components/organisms/StockTable";
import useSetSelectedButtonSiderBar from '@/src/redux/hooks/useButtonsiderBar';
import TicketListPagination from '@/src/components/organisms/TicketListPagination';
import TicketOverview from '@/src/components/organisms/TicketOverview';

export default function CoPhieu(){

    useSetSelectedButtonSiderBar(2);

    return (
        <>
            < TicketOverview />

            <h1 className="text-[40px] font-bold text-fintown-txt-1 px-[40px]">Danh sách cổ phiếu</h1>

            <p className="text-sx text-fintown-txt-2 mb-[70px] px-[40px]">Danh sách này cung cấp cái nhìn tổng quan về biến động giá cả và các chỉ số  của của tất cả cổ phiếu trên thị trường hiện tại với dữ liệu có sẵn của Fintown. </p>
            
            <div className="px-[40px]">
                < StockTable/>
            </div>

            <div className="mb-[70px]"></div>

            <div className="w-full flex justify-end px-[40px]">
                < TicketListPagination />
            </div>

            <div className="mb-[100px]"></div>
        </>
    );
 }