"use client";
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedButtonActive, selectSelectedButton } from '@/src/redux/SiderBar';
import BtnSidebar from '../common/BtnSidebar';

export default function Sidebar() {
    const selectedButton = useSelector(selectSelectedButton);
    const dispatch = useDispatch();

    const handleClick = (buttonIndex: number | null) => {
        dispatch(setSelectedButtonActive({ button: buttonIndex }));
    };

    return (
        <div id="sidebar" className="fixed z-50 top-0 w-[70px] border-r h-screen border-fintown-br bg-fintown-bg">
            <div className="logo">
                <Link href="/" className="flex justify-center h-[70px] items-center">
                    <img className="w-[42px] h-[42px]" src="/imgs/logo.png" alt="logo fintown" />
                </Link>
            </div>

            <div id="central-container-sidebar" className="mt-[50px]">
                <Link href="/dashboard/" onClick={() => handleClick(0)}>
                    <BtnSidebar class_icon="bx bxs-grid" active={selectedButton === 0} />
                </Link>

                <Link href="/dashboard/" onClick={() => handleClick(1)}>
                    <BtnSidebar class_icon="bx bxs-user" active={selectedButton === 1} />
                </Link>

                <Link href="/dashboard/co-phieu" onClick={() => handleClick(2)}>
                    <BtnSidebar class_icon="bx bxs-spreadsheet" active={selectedButton === 2} />
                </Link>

                <Link 
                    href="/dashboard/co-phieu/VCB/bao-cao-doanh-nghiep" 
                    onClick={() => handleClick(3)}
                >
                    <BtnSidebar class_icon="bx bx-bar-chart" active={selectedButton === 3} />
                </Link>

                <Link href="/dashboard/co-phieu/VCB/ket-qua-du-bao" onClick={() => handleClick(4)}>
                    <BtnSidebar class_icon="bx bx-trending-up" active={selectedButton === 4} />
                </Link>

                <Link href="/dashboard/" onClick={() => handleClick(5)}>
                    <BtnSidebar class_icon="bx bx-chart" active={selectedButton === 5} />
                </Link>

                <Link href="/dashboard/" onClick={() => handleClick(6)}>
                    <BtnSidebar class_icon="bx bx-calculator" active={selectedButton === 6} />
                </Link>
            </div>
        </div>
    );
}
