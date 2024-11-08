import React, { useState, useEffect, useRef } from 'react';
import { useAppSelector } from '@/src/redux/hooks/useAppStore';
import { selectSelectedButton } from '@/src/redux/ReportPage';

interface SelectViewTypeProps {
  onOptionChange: (option: 'Kiểu xem 1' | 'Kiểu xem 2' | 'Kiểu xem 3') => void;
}

const SelectViewType: React.FC<SelectViewTypeProps> = ({ onOptionChange }) => {
  const selectedButton = useAppSelector(selectSelectedButton);
  const [selectedOption, setSelectedOption] = useState<'Kiểu xem 1' | 'Kiểu xem 2' | 'Kiểu xem 3'>('Kiểu xem 1');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: 'Kiểu xem 1' | 'Kiểu xem 2' | 'Kiểu xem 3') => {
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
    setSelectedOption('Kiểu xem 1'); // Ví dụ: Đặt lại lựa chọn khi `selectedButton` thay đổi
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
            onClick={() => handleOptionClick('Kiểu xem 1')}
          >
            <div className="flex items-center py-[8px] px-[16px]">
              <div className="text-xs text-fintown-txt-1 font-bold">Kiểu xem 1</div>
            </div>
          </button>
          <button
            className="bg-fintown-btn-disable hover:bg-fintown-hvr-btn-3 w-full rounded"
            onClick={() => handleOptionClick('Kiểu xem 2')}
          >
            <div className="flex items-center py-[8px] px-[16px]">
              <div className="text-xs text-fintown-txt-1 font-bold">Kiểu xem 2</div>
            </div>
          </button>
          <button
            className="bg-fintown-btn-disable hover:bg-fintown-hvr-btn-3 w-full rounded"
            onClick={() => handleOptionClick('Kiểu xem 3')}
          >
            <div className="flex items-center py-[8px] px-[16px]">
              <div className="text-xs text-fintown-txt-1 font-bold">Kiểu xem 3</div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default SelectViewType;
