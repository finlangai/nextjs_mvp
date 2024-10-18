import React, { useState, useEffect, useRef } from 'react';
import { useAppSelector } from '@/src/redux/hooks/useAppStore';
import { selectSelectedButton } from '@/src/redux/ReportPage';

interface SelectTableOrChartProps {
  onOptionChange: (option: 'Biểu đồ' | 'Bảng') => void;
}

const SelectTableOrChart: React.FC<SelectTableOrChartProps> = ({ onOptionChange }) => {
  const selectedButton = useAppSelector(selectSelectedButton);
  const [selectedOption, setSelectedOption] = useState<'Biểu đồ' | 'Bảng'>('Bảng');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: 'Biểu đồ' | 'Bảng') => {
    setSelectedOption(option);
    setIsOpen(false);
    onOptionChange(option);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedOption('Biểu đồ');
  }, [selectedButton]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button className="flex items-center rounded-[8px] bg-fintown-btn-disable" onClick={toggleDropdown}>
        <div className="flex items-center gap-x-[10px] py-[8px] px-[16px]">
          <div className="text-[14px] text-fintown-txt-1">{selectedOption}</div>
          <i className={`bx ${isOpen ? 'bx-caret-up' : 'bx-caret-down'} text-fintown-txt-1`}></i>
        </div>
      </button>
      {isOpen && (
        <div className="absolute w-full bg-fintown-btn-disable rounded-[6px] mt-[5px] py-[8px] px-[8px] z-30">
          <button
            className="bg-fintown-btn-disable hover:bg-fintown-hvr-btn-3 w-full rounded"
            onClick={() => handleOptionClick('Biểu đồ')}
          >
            <div className="flex items-center py-[8px] px-[16px] w-max">
              <div className="text-xs text-fintown-txt-1 font-bold">Biểu đồ</div>
            </div>
          </button>
          <button
            className="bg-fintown-btn-disable hover:bg-fintown-hvr-btn-3 w-full rounded"
            onClick={() => handleOptionClick('Bảng')}
          >
            <div className="flex items-center py-[8px] px-[16px]">
              <div className="text-xs text-fintown-txt-1 font-bold">Bảng</div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default SelectTableOrChart;
