import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/src/redux/hooks/useAppStore';
import { selectSelectedButton } from '@/src/redux/StockPage/stockPageSlice';

const Breadcrumbs = ({symbol} : {symbol: string;}) => {

    const selectedButton = useAppSelector(selectSelectedButton);

    const [namePage, setNamePage] = useState<string>('');

    useEffect(() => {
        if (selectedButton === 0) {
            setNamePage('Chỉ số kỹ thuật');
        } else if (selectedButton === 1) {
            setNamePage('Báo cáo doanh nghiệp');
        } else if (selectedButton === 2) {
            setNamePage('Hồ sơ doanh nghiệp');
        } else if (selectedButton === 3) {
            setNamePage('Kết quả dự báo');
        } else if (selectedButton === 4) {
            setNamePage('Dữ liệu lịch sử');
        } else if (selectedButton === 5) {
            setNamePage('So sánh');
        }
    }, [selectedButton]);    

    return (
        <>
        <div className='flex items-center gap-x-[10px] px-[40px] pt-[40px] pb-[24px]'>
            <Link className='text-fintown-txt-1 text-base' href="/dashboard/co-phieu">Cổ phiếu</Link>
            <i className='bx bx-chevron-right text-fintown-txt-1 text-[24px]'></i>
            <Link className='text-fintown-txt-1 text-base' href={`/dashboard/co-phieu/${symbol}`}>{symbol}</Link>
            <i className='bx bx-chevron-right text-fintown-txt-1 text-[24px]'></i>
            <Link className='text-fintown-txt-1 text-base' href="/dashboard/co-phieu/HCM/bao-cao-doanh-nghiep">{namePage}</Link>
        </div>
        </>
    )
}

export default Breadcrumbs