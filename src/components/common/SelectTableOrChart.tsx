import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { selectSelectedButton } from '@/src/redux/ReportPage';
import { fetchFinancialStatements } from '@/src/redux/FinancialStatement';
import { fetchFinancialMetrics } from '@/src/redux/FinancialMetric';

const SelectTableOrChart = ({ symbol, year, quarter }: { symbol: string; year: number; quarter: number }) => {
    const dispatch = useAppDispatch();
    
    // Lấy loại báo cáo tài chính & chỉ số tài chính
    const selectedButton = useAppSelector(selectSelectedButton);

    // Text button
    const [selectedOption, setSelectedOption] = useState<'Biểu đồ' | 'Bảng'>('Bảng');
    const [isOpen, setIsOpen] = useState(false);
    
    // Sử dụng useRef để tham chiếu đến div chứa dropdown
    const dropdownRef = useRef<HTMLDivElement>(null);

    // hàm thiết lập đóng mở dropdown
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // hàm call API
    const fetchData = async (currentYear: number, currentQuarter: number) => {
        if (selectedButton === 4) {
            await dispatch(fetchFinancialMetrics({ symbol, year: currentYear, quarter: currentQuarter }));
            return;
        }
        await dispatch(fetchFinancialStatements({ type: selectedButton, symbol, year: currentYear, quarter: currentQuarter }));
    };

    // Hàm xử lý logic cho từng lựa chọn
    const handleOptionClick = async (option: 'Biểu đồ' | 'Bảng') => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    // Sự kiện đóng dropdown khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup event khi component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(()=> {
        setSelectedOption('Biểu đồ');
    }, [selectedButton] )

    return (
        <>
            <div className="relative" ref={dropdownRef}>
                <button 
                    className='flex items-center rounded-[8px] bg-fintown-btn-disable'
                    onClick={toggleDropdown}
                >
                    <div className='flex items-center gap-x-[10px] py-[8px] px-[16px]'>                
                        <div className='text-[14px] text-fintown-txt-1'>{selectedOption}</div>
                        <i className={`bx ${isOpen ? 'bx-caret-up' : 'bx-caret-down'} text-fintown-txt-1`}></i>
                    </div>
                </button>

                {isOpen && (
                    <div className="absolute w-full bg-fintown-btn-disable rounded-[6px] mt-[5px] py-[8px] px-[8px]">
                        <button 
                            className="bg-fintown-btn-disable hover:bg-fintown-hvr-btn-3 w-full rounded"
                            onClick={() => handleOptionClick('Biểu đồ')}
                        >
                            <div className='flex items-center py-[8px] px-[16px] w-max'>                
                                <div className='text-xs text-fintown-txt-1 font-bold'>Biểu đồ</div>
                            </div>
                        </button>
                        <button 
                            className="bg-fintown-btn-disable hover:bg-fintown-hvr-btn-3 w-full rounded"
                            onClick={() => handleOptionClick('Bảng')}
                        >
                            <div className='flex items-center py-[8px] px-[16px]'>                
                                <div className='text-xs text-fintown-txt-1 font-bold'>Bảng</div>
                            </div>
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default SelectTableOrChart;
