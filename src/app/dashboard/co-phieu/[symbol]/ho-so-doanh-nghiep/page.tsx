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

    const [activeLink, setActiveLink] = useState("#overview");

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

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

    const linkClass = (link: string) => (
        `cursor-pointer text-fintown-txt-1 text-[14px] font-bold w-full px-[17px] py-[14px] rounded-[8px] text-left ${
            activeLink === link ? 'bg-[#1E2127]' : 'hover:bg-[#1E2127]'
        }`
    );

    return (
        <>
            <div className='flex px-[40px] h-screen scroll-moot' ref={containerRef}>
                <div className='min-w-[318px] pt-[50px]' id='siderbar' ref={sidebarRef}>
                    <div className='min-w-[318px] pr-[24px] flex flex-col gap-y-[10px]'  style={sidebarStyle}>
                        <Link href={`/dashboard/co-phieu/VCB/ho-so-doanh-nghiep#overview`}>
                            <div onClick={() => handleLinkClick("#overview")} className={linkClass("#overview")}>
                                Tổng quan
                            </div>
                        </Link>

                        <Link href={`/dashboard/co-phieu/VCB/ho-so-doanh-nghiep#history`}>
                            <div onClick={() => handleLinkClick("#history")} className={linkClass("#history")}>
                                Lịch sử phát triển
                            </div>
                        </Link>

                        <Link href={`/dashboard/co-phieu/VCB/ho-so-doanh-nghiep#promise`}>
                            <div onClick={() => handleLinkClick("#promise")} className={linkClass("#promise")}>
                                Lời hứa
                            </div>
                        </Link>

                        <Link href={`/dashboard/co-phieu/VCB/ho-so-doanh-nghiep#businessrisk`}>
                            <div onClick={() => handleLinkClick("#businessrisk")} className={linkClass("#businessrisk")}>
                                Thách thức
                            </div>
                        </Link>

                        <Link href={`/dashboard/co-phieu/VCB/ho-so-doanh-nghiep#keydevelopments`}>
                            <div onClick={() => handleLinkClick("#keydevelopments")} className={linkClass("#keydevelopments")}>
                                Chiến lược kinh doanh
                            </div>
                        </Link>

                        <Link href={`/dashboard/co-phieu/VCB/ho-so-doanh-nghiep#basic`}>
                            <div onClick={() => handleLinkClick("#basic")} className={linkClass("#basic")}>
                                Thông tin cơ bản
                            </div>
                        </Link>

                        <Link href={`/dashboard/co-phieu/VCB/ho-so-doanh-nghiep#listing`}>
                            <div onClick={() => handleLinkClick("#listing")} className={linkClass("#listing")}>
                                Thông tin niêm yết
                            </div>
                        </Link>

                        <Link href={`/dashboard/co-phieu/VCB/ho-so-doanh-nghiep#holders`}>
                            <div onClick={() => handleLinkClick("#holders")} className={linkClass("#holders")}>
                                Danh sách cổ đông
                            </div>
                        </Link>

                        <Link href={`/dashboard/co-phieu/VCB/ho-so-doanh-nghiep#officers`}>
                            <div onClick={() => handleLinkClick("#officers")} className={linkClass("#officers")}>
                                Ban lãnh đạo
                            </div>
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