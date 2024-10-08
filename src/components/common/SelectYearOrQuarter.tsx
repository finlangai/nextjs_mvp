import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { selectSelectedButton } from '@/src/redux/ReportPage';
import { fetchFinancialStatements } from '@/src/redux/FinancialStatement';
import { fetchFinancialMetrics } from '@/src/redux/FinancialMetric';
import { 
    setLimitByDataQuarter,
    setLimitByDataYear
} from '@/src/redux/BtnNextPrevReportPage';

const SelectYearOrQuarter = ({ symbol, year, quarter }: { symbol: string; year: number; quarter: number }) => {
    const dispatch = useAppDispatch();
    
    // Lấy loại báo cáo tài chính & chỉ số tài chính
    const selectedButton = useAppSelector(selectSelectedButton);

    // Text button
    const [selectedOption, setSelectedOption] = useState<'Quý' | 'Năm'>('Quý');
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
    const handleOptionClick = async (option: 'Quý' | 'Năm') => {
        setSelectedOption(option);
        setIsOpen(false);

        if (option === 'Năm') {
           fetchData(year, 0).then(()=> {
                dispatch(setLimitByDataQuarter(null));
                dispatch(setLimitByDataYear(null));
           })
        } else if (option === 'Quý') {
            fetchData(year, quarter).then(()=> {
                dispatch(setLimitByDataQuarter(null));
                dispatch(setLimitByDataYear(null));
            });
        }
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
        setSelectedOption('Quý');
    }, [selectedButton] )

    return (
        <>
            <div className="relative" ref={dropdownRef}>
                <button 
                    className='flex items-center rounded-[8px] bg-fintown-btn-disable'
                    onClick={toggleDropdown}
                >
                    <div className='flex items-center gap-x-[30px] py-[8px] px-[16px]'>                
                        <div className='text-[14px] text-fintown-txt-1'>{selectedOption}</div>
                        <i className={`bx ${isOpen ? 'bx-caret-up' : 'bx-caret-down'} text-fintown-txt-1`}></i>
                    </div>
                </button>

                {isOpen && (
                    <div className="absolute w-full bg-fintown-btn-disable rounded-[6px] mt-[5px] py-[8px] px-[8px]">
                        <button 
                            className="bg-fintown-btn-disable hover:bg-fintown-hvr-btn-3 w-full rounded"
                            onClick={() => handleOptionClick('Quý')}
                        >
                            <div className='flex items-center py-[8px] px-[16px]'>                
                                <div className='text-xs text-fintown-txt-1 font-bold'>Quý</div>
                            </div>
                        </button>
                        <button 
                            className="bg-fintown-btn-disable hover:bg-fintown-hvr-btn-3 w-full rounded"
                            onClick={() => handleOptionClick('Năm')}
                        >
                            <div className='flex items-center py-[8px] px-[16px]'>                
                                <div className='text-xs text-fintown-txt-1 font-bold'>Năm</div>
                            </div>
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default SelectYearOrQuarter;
