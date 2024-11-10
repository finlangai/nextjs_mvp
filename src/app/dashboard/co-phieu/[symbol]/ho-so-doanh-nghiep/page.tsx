"use client";
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import useSetSelectedButtonSiderBar from '@/src/redux/hooks/useButtonsiderBar';
import useSetSelectedButtonStockPage from '@/src/redux/hooks/useButtonstockPage';
import CompanyDescription from '@/src/components/organisms/CompanyDescription';
import OfficersComponent from '@/src/components/organisms/Officers';
import HolderList from '@/src/components/organisms/Holder';

export default function HoSoDoanhNghiepPage ({ params }: { params: { symbol: string } }) {
    const { symbol } = params;

    // Xác định UI của trang đang ở
    useSetSelectedButtonSiderBar(3);
    useSetSelectedButtonStockPage(2);

    const sidebarRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isFixed, setIsFixed] = useState(false);
    const [sidebarStyle, setSidebarStyle] = useState({});

    useEffect(() => {
        const handleScroll = () => {
            if (sidebarRef.current && containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const sidebarRect = sidebarRef.current.getBoundingClientRect();
                const scrollY = window.scrollY;

                if (sidebarRect.top <= 70) { 
                    setIsFixed(true);
                    setSidebarStyle({
                        position: 'fixed',
                        top: '70px',
                        width: `${sidebarRef.current.offsetWidth}px`,
                        left: `${containerRect.left + 40}px`,
                        height: "100vh",
                        marginTop: "20px"
                    });
                } else {
                    setIsFixed(false);
                    setSidebarStyle({});
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        
        // Chạy một lần để set up initial position
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <>
            <div className='flex px-[40px] h-screen scroll-moot '  ref={containerRef}>
                <div className='min-w-[318px] pt-[50px]' id='siderbar'  ref={sidebarRef}>
                    <div className='min-w-[318px] pr-[24px] flex flex-col gap-y-[10px]'  style={sidebarStyle}>
                        <Link href={`/dashboard/co-phieu/VCB/ho-so-doanh-nghiep#overview`}>
                            <div className='cursor-pointer text-fintown-txt-1 text-[14px] font-bold w-full px-[17px] py-[14px] rounded-[8px] hover:bg-[#1E2127] bg-[#1E2127] text-left'>
                                Tổng quan
                            </div>
                        </Link>

                        <Link href={`/dashboard/co-phieu/VCB/ho-so-doanh-nghiep#history`}>
                            <div className='cursor-pointer text-fintown-txt-1 text-[14px] font-bold w-full px-[17px] py-[14px] rounded-[8px] hover:bg-[#1E2127] text-left'>Lịch sử phát triển</div>
                        </Link> 

                        <Link href={`/dashboard/co-phieu/VCB/ho-so-doanh-nghiep#promise`}>
                            <div className='cursor-pointer text-fintown-txt-1 text-[14px] font-bold w-full px-[17px] py-[14px] rounded-[8px] hover:bg-[#1E2127] text-left'>Lời hứa</div>
                        </Link> 

                        <Link href={`/dashboard/co-phieu/VCB/ho-so-doanh-nghiep#businessrisk`}>
                            <div className='cursor-pointer text-fintown-txt-1 text-[14px] font-bold w-full px-[17px] py-[14px] rounded-[8px] hover:bg-[#1E2127] text-left'>Thách thức</div>
                        </Link> 

                        <Link href={`/dashboard/co-phieu/VCB/ho-so-doanh-nghiep#keydevelopments`}>
                            <div className='cursor-pointer text-fintown-txt-1 text-[14px] font-bold w-full px-[17px] py-[14px] rounded-[8px] hover:bg-[#1E2127] text-left'>Chiến lược kinh doanh</div>
                        </Link> 

                        <Link href={`/dashboard/co-phieu/VCB/ho-so-doanh-nghiep#basic`}>
                            <div className='cursor-pointer text-fintown-txt-1 text-[14px] font-bold w-full px-[17px] py-[14px] rounded-[8px] hover:bg-[#1E2127] text-left'>Thông tin cơ bản</div>
                        </Link> 

                        <Link href={`/dashboard/co-phieu/VCB/ho-so-doanh-nghiep#listing`}>
                            <div className='cursor-pointer text-fintown-txt-1 text-[14px] font-bold w-full px-[17px] py-[14px] rounded-[8px] hover:bg-[#1E2127] text-left'>Thông tin niêm yết</div>
                        </Link> 

                        <Link href={`/dashboard/co-phieu/VCB/ho-so-doanh-nghiep#holders`}>
                            <div className='cursor-pointer text-fintown-txt-1 text-[14px] font-bold w-full px-[17px] py-[14px] rounded-[8px] hover:bg-[#1E2127] text-left'>Danh sách cổ đông</div>
                        </Link> 

                        <Link href={`/dashboard/co-phieu/VCB/ho-so-doanh-nghiep#officers`}>
                            <div className='cursor-pointer text-fintown-txt-1 text-[14px] font-bold w-full px-[17px] py-[14px] rounded-[8px] hover:bg-[#1E2127] text-left'>Ban lãnh đạo</div>
                        </Link> 
                    </div>
                </div>

                <div className='pl-[40px] mt-[50px] pb-[20px] flex flex-col flex-1 overflow-y-auto custom-scrollbarmini scroll-moot border-l border-fintown-lnr-1'>
        
                    <CompanyDescription symbol={symbol} />

                    < HolderList symbol={symbol} />

                    <OfficersComponent symbol={symbol}/>

                </div>
            </div>
        </>
    );
}