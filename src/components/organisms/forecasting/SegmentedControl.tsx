import React, { useState, useRef, useEffect } from 'react';
import { Group } from '@/src/interfaces/ForecastingOverallAssessment';
import ToggleComponent from './ToggleComponent';
import { selectSelectedButton } from '@/src/redux/ForecastingPage';
import { useAppSelector } from '@/src/redux/hooks/useAppStore';
import { selectForecastingCriteriaGroupByIndex } from '@/src/redux/ForecastingOverallAssessment';
import {
    selectForecastingToggleByGroup
} from '@/src/redux/ForecastingToggle';

export default function SegmentedControl({ symbol }: { symbol: string }) {
    const [marginLeft, setMarginLeft] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isSticky, setIsSticky] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const selectedButton = useAppSelector(selectSelectedButton);
    const selectedCriteria = useAppSelector((state) => selectForecastingCriteriaGroupByIndex(state, selectedButton - 1));
    const forecastingToggleByGroup = useAppSelector(selectForecastingToggleByGroup(selectedButton - 1));
    const metrics = forecastingToggleByGroup?.metrics;

    // SLIDER 
    const checkScrollability = () => {
        if (containerRef.current && contentRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const contentWidth = contentRef.current.scrollWidth;
            setCanScrollLeft(marginLeft < 0);
            setCanScrollRight(contentWidth + marginLeft > containerWidth);
        }
    };

    useEffect(() => {
        checkScrollability();
        window.addEventListener('resize', checkScrollability);
        const handleScroll = () => {
            if (stickyRef.current) {
                const { top } = stickyRef.current.getBoundingClientRect();
                setIsSticky(top <= 70); // 70px is the height of the main header
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('resize', checkScrollability);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [marginLeft, metrics]);

    const handleScroll = (direction: 'left' | 'right') => {
        const scrollAmount = 100;
        let newMarginLeft = direction === 'left' ? marginLeft + scrollAmount : marginLeft - scrollAmount;

        if (containerRef.current && contentRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const contentWidth = contentRef.current.scrollWidth;

            if (newMarginLeft > 0) {
                newMarginLeft = 0;
            } else if (contentWidth + newMarginLeft < containerWidth) {
                newMarginLeft = containerWidth - contentWidth;
            }

            setMarginLeft(newMarginLeft);
        }
    };

    return (
        <div ref={stickyRef} className="sticky top-[70px] z-40" style={{ top: '70px' }}>
            <div className={`${isSticky ? 'border-b-[3px] border-b-fintown-pr9 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]' : ''} bg-fintown-bg dark:bg-fintown-bg-light transition-all duration-300`}>
                <div className="pl-[40px] border-b border-t border-fintown-br dark:border-fintown-br-light overflow-hidden">
                    <div className="flex h-[72px] items-center">

                        <div className="flex items-center">
                            <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-[14px] whitespace-nowrap mr-[30px]">
                                Bật/tắt chỉ số cần xem
                            </div>
                            <div className='flex items-center gap-x-[5px] mr-[20px]'>
                                <button
                                    className={`
                                        flex items-center justify-center w-[30px] h-[30px] rounded-[50%]
                                        transition-all duration-300
                                        ${canScrollLeft ? 'bg-fintown-btn-2 dark:bg-fintown-btn-2-light cursor-pointer hover:opacity-80' : 'cursor-not-allowed'}
                                    `}
                                    onClick={() => canScrollLeft && handleScroll('left')}
                                    disabled={!canScrollLeft}
                                >
                                    <i className={`bx bx-chevron-left text-[24px] ${canScrollLeft ? 'text-fintown-txt-1 dark:text-fintown-txt-1-light' : 'text-fintown-txt-2'}`}></i>
                                </button>
                                <button
                                    className={`
                                        flex items-center justify-center w-[30px] h-[30px] rounded-[50%]
                                        transition-all duration-300
                                        ${canScrollRight ? 'bg-fintown-btn-2 dark:bg-fintown-btn-2-light cursor-pointer hover:opacity-80' : 'cursor-not-allowed'}
                                    `} 
                                    onClick={() => canScrollRight && handleScroll('right')}
                                    disabled={!canScrollRight}
                                >
                                    <i className={`bx bx-chevron-right text-[24px] ${canScrollRight ? 'text-fintown-txt-1 dark:text-fintown-txt-1-light' : 'text-fintown-txt-2'}`}></i>
                                </button>
                            </div>
                            <div className="min-h-[72px] w-[1px] bg-fintown-br dark:bg-fintown-br-light"></div>
                        </div>

                        <div className='flex items-center overflow-hidden' ref={containerRef}>
                            <div className='flex items-center transition-all duration-300 pl-[20px]' ref={contentRef} style={{ marginLeft: `${marginLeft}px` }}>
                                {selectedCriteria?.map((val: Group) => (
                                    val && (
                                        <div className="flex items-center gap-x-[15px] mr-[20px] w-max" key={val?.name}>
                                            < ToggleComponent index={val?.index} symbol={symbol} />
                                            <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-[14px] whitespace-nowrap">
                                                {val?.name}
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}