import React, { useState, useRef, useEffect } from 'react';

interface Tab {
  id: number;
  label: string;
}

interface Props {
  onTabChange?: (index: number) => void;
}

const SlidingTabs: React.FC<Props> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({
    transform: 'translateX(0px)'
  });
  
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

  const tabs: Tab[] = [
    { id: 0, label: "Máy tính" },
    { id: 1, label: "Lịch sử định giá" }
  ];

  useEffect(() => {
    const activeTabElement = tabRefs.current[activeTab];
    if (activeTabElement) {
      setIndicatorStyle({
        transform: `translateX(${activeTabElement.offsetLeft}px)`
      });
    }
  }, [activeTab]);

  const handleTabClick = (index: number): void => {
    setActiveTab(index);
    // Gọi callback khi tab thay đổi
    onTabChange?.(index);
  };

  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, tabs.length);
  }, [tabs.length]);

  return (
    <div className="py-6">
      <div className="relative">
        <div className="flex items-center gap-x-[18px] pb-[11px]">
          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              ref={el => {
                if (el) {
                  tabRefs.current[index] = el;
                }
              }}
              className={`font-bold text-[14px] cursor-pointer transition-colors duration-200 ${
                activeTab === index ? 'text-fintown-txt-1' : 'text-fintown-txt-2'
              }`}
              onClick={() => handleTabClick(index)}
            >
              {tab.label}
            </div>
          ))}
        </div>
        
        <div
          className="absolute bottom-0 h-[2px] bg-fintown-pr9 transition-all duration-300 ease-in-out"
          style={{
            width: '25px',
            ...indicatorStyle
          }}
        />
      </div>
    </div>
  );
};

export default SlidingTabs;