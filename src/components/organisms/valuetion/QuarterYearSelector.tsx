import React, { useState, useEffect, useRef } from 'react';

const QuarterYearSelector = ({ onSelect, currentYear, currentQuarter}: {
  onSelect: (data: { quarter: number; year: number; totalQuarters: number }) => void; currentYear:number; currentQuarter:number;
}) => {

    const [selectedQuarter, setSelectedQuarter] = useState(currentQuarter);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [isQuarterOpen, setIsQuarterOpen] = useState(false);
    const [isYearOpen, setIsYearOpen] = useState(false);
    const [start, setStart] = useState(true);

    const quarterRef = useRef<HTMLDivElement | null>(null);
    const yearRef = useRef<HTMLDivElement | null>(null);

    const quarters = [1, 2, 3, 4];
    const years = Array.from({ length: 31 }, (_, index) => currentYear + index);

    useEffect(()=> {
        let index = 0;
        let yearStart = 0;
        let cQuarter = currentQuarter;

        // Lần đầu tiên tăng thêm một quý so với quý hiện có => định giá cho quý tiếp theo. 
        // Nếu đã là quý 4 thì tăng thêm 1 năm, không tăng qu => định giá cho quý 1 năm tiếp theo.
        if (start && currentQuarter > 0 && currentQuarter < 4) {
            index = 1;
            setStart(false);
        };
        if (start && currentYear > 0 && currentQuarter === 4) {
            cQuarter = 1;
            yearStart = 1;
            setStart(false);
        };

        setSelectedQuarter(cQuarter + index);
        setSelectedYear(currentYear + yearStart);
    }, [currentYear, currentQuarter])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (
            quarterRef.current &&
            !quarterRef.current.contains(event.target as Node) &&
            yearRef.current &&
            !yearRef.current.contains(event.target as Node)
        ) {
            setIsQuarterOpen(false);
            setIsYearOpen(false);
        }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const calculateQuartersBetween = (
        currentQuarter: number,
        currentYear: number,
        targetQuarter: number,
        targetYear: number
    ) => {
        const yearDifference = targetYear - currentYear;
        const totalQuarters = yearDifference * 4 + (targetQuarter - currentQuarter);
        return totalQuarters;
    };

    const isFutureTime = (quarter: number, year: number) => {
        if (year > currentYear || (year === currentYear && quarter > currentQuarter)) {
        return true;
        }
        return false;
    };

    const handleQuarterSelect = (quarter: number) => {
        if (isFutureTime(quarter, selectedYear)) {
        setSelectedQuarter(quarter);
        setIsQuarterOpen(false);

        const totalQuarters = calculateQuartersBetween(
            currentQuarter,
            currentYear,
            quarter,
            selectedYear
        );

        onSelect({ quarter, year: selectedYear, totalQuarters });
        }
    };

    const handleYearSelect = (year: number) => {
        let updatedQuarter = selectedQuarter;

        if (year === currentYear) {
        updatedQuarter = currentQuarter;
        } else if (year !== selectedYear) {
        updatedQuarter = 1;
        }

        setSelectedQuarter(updatedQuarter);
        setSelectedYear(year);
        setIsYearOpen(false);

        const totalQuarters = calculateQuartersBetween(
        currentQuarter,
        currentYear,
        updatedQuarter,
        year
        );

        onSelect({ quarter: updatedQuarter, year, totalQuarters });
    };

    return (
        <div>
            <div className="mb-[14px] text-[14px] text-fintown-txt-2 mt-[20px]">
                Thời gian chiết khấu mong muốn
            </div>
            <div className="flex items-center gap-x-[20px]">
                {/* Quarter Selector */}
                <div className="relative" ref={quarterRef}>
                    <div
                        className="rounded border border-fintown-br dark:border-fintown-br-light flex items-center px-[16px] w-full max-w-[120px] justify-between cursor-pointer gap-x-[20px]"
                        onClick={() => {
                        setIsQuarterOpen(!isQuarterOpen);
                        setIsYearOpen(false);
                        }}
                    >
                        <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-[12px] py-[10px] font-[600]">
                        {`Quý ${selectedQuarter}`}
                        </div>
                        <i className="bx bx-chevron-down text-fintown-txt-1 dark:text-fintown-txt-1-light text-[14px]"></i>
                    </div>
                    {isQuarterOpen && (
                        <div className="absolute z-10 top-[-200%] w-full max-w-[120px] border border-fintown-br dark:border-fintown-br-light rounded mt-1 px-[5px] py-[10px] shadow-lg max-h-[200px] overflow-y-auto bg-fintown-bg-card dark:bg-fintown-bg-light text-fintown-txt-1 dark:text-fintown-txt-1-light">
                        {quarters.map((quarter) => (
                            <div
                            key={quarter}
                            className="px-[16px] py-[10px] text-[12px] hover:bg-fintown-hvr-btn-1 hover:dark:bg-fintown-hvr-btn-1-light cursor-pointer rounded"
                            onClick={() => handleQuarterSelect(quarter)}
                            >
                            {`Quý ${quarter}`}
                            </div>
                        ))}
                        </div>
                    )}
                </div>

                {/* Year Selector */}
                <div className="relative" ref={yearRef}>
                    <div
                        className="rounded border border-fintown-br dark:border-fintown-br-light flex items-center px-[16px] w-full max-w-[200px] justify-between cursor-pointer gap-x-[20px]"
                        onClick={() => {
                        setIsYearOpen(!isYearOpen);
                        setIsQuarterOpen(false);
                        }}
                    >
                        <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-[12px] py-[10px] font-[600]">
                        {`Năm ${selectedYear}`}
                        </div>
                        <i className="bx bx-chevron-down text-fintown-txt-1 dark:text-fintown-txt-1-light text-[14px]"></i>
                    </div>
                    {isYearOpen && (
                        <div className="absolute z-10 top-[-200%] w-full w-max border border-fintown-br dark:border-fintown-br-light rounded mt-1 shadow-lg max-h-[200px] overflow-y-auto custom-scrollbarmini2 bg-fintown-bg-card dark:bg-fintown-bg-light text-fintown-txt-1 dark:text-fintown-txt-1-light px-[5px] py-[10px] ">
                        {years.map((year) => (
                            <div
                            key={year}
                            className="px-[16px] py-[10px] text-[12px] hover:bg-fintown-hvr-btn-1 hover:dark:bg-fintown-hvr-btn-1-light cursor-pointer rounded"
                            onClick={() => handleYearSelect(year)}
                            >
                            {`Năm ${year}`}
                            </div>
                        ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuarterYearSelector;
