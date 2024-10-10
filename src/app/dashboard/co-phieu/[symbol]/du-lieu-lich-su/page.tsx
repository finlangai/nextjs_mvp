"use client";
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import useSetSelectedButtonSiderBar from '@/src/redux/hooks/useButtonsiderBar';

export default function BaoCaoDoanhNghiepPage({ params }: { params: { symbol: string } }) {
    const { symbol } = params;

    const dispatch = useAppDispatch();

    // Xác định UI của trang đang ở
    useSetSelectedButtonSiderBar(4);

    const handleButtonClick = (button: number, text: string) => {
        // dispatch(setSelectedButtonAndText({ button, text }));
    };

    return (
        <>
            <div className='px-[40px] py-[22px] flex items-center gap-x-[50px] mb-[28px]'>
                {/* <button 
                    className={`text-[14px] py-[10px] px-[16px] rounded-[7px] ${selectedButton === 1 ? 'bg-fintown-btn-active-3 text-fintown-pr9' : 'text-fintown-txt-2'}`} 
                    onClick={() => handleButtonClick(1, 'Cân đối kế toán')}>
                    Cân đối kế toán
                </button>
                <button 
                    className={`text-[14px] py-[10px] px-[16px] rounded-[7px] ${selectedButton === 2 ? 'bg-fintown-btn-active-3 text-fintown-pr9' : 'text-fintown-txt-2'}`} 
                    onClick={() => handleButtonClick(2, 'Kết quả kinh doanh')}>
                    Kết quả kinh doanh
                </button>
                <button 
                    className={`text-[14px] py-[10px] px-[16px] rounded-[7px] ${selectedButton === 3 ? 'bg-fintown-btn-active-3 text-fintown-pr9' : 'text-fintown-txt-2'}`} 
                    onClick={() => handleButtonClick(3, 'Lưu chuyển tiền tệ')}>
                    Lưu chuyển tiền tệ
                </button> */}
            </div>
        </>
    )
}
