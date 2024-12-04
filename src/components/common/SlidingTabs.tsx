import React, { useState, useRef, useEffect } from 'react';
import { selectHistorySelectedButton } from '@/src/redux/ValuetionPage/valuationHistorySlice';
import { useAppSelector } from '@/src/redux/hooks/useAppStore';
import { setSelectedButtonActive, selectSelectedButton } from '@/src/redux/SiderBar';

const SlidingTabs = (
  { onTabChange, tabs, gap, startIndex, fontsize } : 
  {onTabChange: (index: number, api: string) => void; tabs: any[]; gap: string; startIndex:number; fontsize: string;}
) => {
  const [activeTab, setActiveTab] = useState(startIndex);
  const selectedTabScenarios = useAppSelector(selectHistorySelectedButton);
  const selectedButton = useAppSelector(selectSelectedButton);

  const [indicatorStyle, setIndicatorStyle] = useState({
    transform: 'translateX(0px)'
  });
  
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const activeTabElement = tabRefs.current[activeTab];
    if (activeTabElement) {
      setIndicatorStyle({
        transform: `translateX(${activeTabElement.offsetLeft}px)`
      });
    }
  }, [activeTab]);

  const handleTabClick = (index: number, api: string): void => {
    setActiveTab(index);
    // Gọi callback khi tab thay đổi với cả `index` và `api`
    onTabChange(index, api);
  };

  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, tabs.length);
  }, [tabs.length]);

  // Ở TAB ĐỊNH GIÁ NẾU KÍCH HOẠT XEM CHI TIẾT MỘT KỊCH BẢN
  useEffect(()=>{
    if (selectedButton === 6) {
      setActiveTab(selectedTabScenarios);
    }
  }, [selectedTabScenarios])

  return (
    <div className="relative">
      <div className={`flex items-center gap-x-[${gap}] pb-[11px]`}>
        {tabs.map((tab, index) => (
          <div
            key={tab.id} ref={el => {if (el) {tabRefs.current[index] = el;}}}
            className={`font-bold text-[${fontsize}] cursor-pointer transition-colors duration-200 ${
              activeTab === index ? 'text-fintown-txt-1' : 'text-fintown-txt-2'
            }`}
            onClick={() => handleTabClick(index, tab.api)}
          >
            {
              tab.label === null  && (
                <div className=' flex justify-center w-[25px]'>
                  <i className='bx bxs-star text-[18px]'></i>
                </div>
              )
            }
            {
              tab.label !== null  && (
                tab.label
              )
            }
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
  );
};

export default SlidingTabs;
