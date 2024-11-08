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

    const handleScroll = (id:string) => {
        const section = document.getElementById(id);
        if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        }
    };

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

                if (containerRect.top <= 70) { 
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
            <div className='flex px-[40px]  mt-[50px] h-screen scroll-moot '  ref={containerRef}>
                <div className='min-w-[318px] ' id='siderbar'  ref={sidebarRef}>
                    <div className='min-w-[318px]'  style={sidebarStyle}>
                        <Link href={`/dashboard/co-phieu/{symbol}/ho-so-doanh-nghiep#overview`}>
                            <button className='text-fintown-txt-1 h-[48px] bg-fintown-btn-active-3 px-[20px] border-l-[5px] border-fintown-pr9 block w-full text-left'>Tổng quan</button>
                        </Link>

                        <Link href={`/dashboard/co-phieu/VCB/ho-so-doanh-nghiep#history`}>
                            <button className='text-fintown-txt-1 h-[48px] px-[20px] block w-full text-left'>Lịch sử phát triển</button>
                        </Link> 

                        <Link href={`/dashboard/co-phieu/VCB/ho-so-doanh-nghiep#promise`}>
                            <button className='text-fintown-txt-1 h-[48px] px-[20px] block w-full text-left'>Lời hứa</button>
                        </Link> 

                        <Link href={`/dashboard/co-phieu/VCB/ho-so-doanh-nghiep#businessrisk`}>
                            <button className='text-fintown-txt-1 h-[48px] px-[20px] block w-full text-left'>Thách thức</button>
                        </Link> 

                        <Link href={`/dashboard/co-phieu/VCB/ho-so-doanh-nghiep#keydevelopments`}>
                            <button className='text-fintown-txt-1 h-[48px] px-[20px] block w-full text-left'>Chiến lược kinh doanh</button>
                        </Link> 

                        <Link href={`/dashboard/co-phieu/VCB/ho-so-doanh-nghiep#basic`}>
                            <button className='text-fintown-txt-1 h-[48px] px-[20px] block w-full text-left'>Thông tin cơ bản</button>
                        </Link> 

                        <Link href={`/dashboard/co-phieu/VCB/ho-so-doanh-nghiep#listing`}>
                            <button className='text-fintown-txt-1 h-[48px] px-[20px] block w-full text-left'>Thông tin niêm yết</button>
                        </Link> 

                        <Link href={`/dashboard/co-phieu/VCB/ho-so-doanh-nghiep#holders`}>
                            <button className='text-fintown-txt-1 h-[48px] px-[20px] block w-full text-left'>Danh sách cổ đông</button>
                        </Link> 

                        <Link href={`/dashboard/co-phieu/VCB/ho-so-doanh-nghiep#officers`}>
                            <button className='text-fintown-txt-1 h-[48px] px-[20px] block w-full text-left'>Ban lãnh đạo</button>
                        </Link> 
                    </div>
                </div>

                <div className='pl-[40px] pb-[20px] flex flex-col gap-y-[100px] flex-1 overflow-y-auto custom-scrollbarmini scroll-moot border-l border-fintown-lnr-1'>
        
                    <CompanyDescription symbol={symbol} />

                    < HolderList symbol={symbol} />

                    <OfficersComponent symbol={symbol}/>

                </div>
            </div>
        </>
    );
}