import React, { useState, useEffect, useRef } from 'react';
import { Criterias } from '@/src/interfaces/ForecastingOverallAssessment';
import { useAppSelector } from '@/src/redux/hooks/useAppStore';
import { selectForecastingOverallAssessmentData } from '@/src/redux/ForecastingOverallAssessment';

const OverallSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [NowData, setNowData] = useState<Criterias | null>(null);
  const forecastingData = useAppSelector(selectForecastingOverallAssessmentData);

  const chunks = NowData ? Object.keys(NowData).map((key) => NowData[key]).reduce((acc: any[][], item, index) => {
    const chunkIndex = Math.floor(index / 3);
    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }
    acc[chunkIndex].push(item);
    return acc;
  }, [] as any[][]) : [];

  useEffect(() => {
    if (forecastingData?.criterias) {
      setNowData(forecastingData.criterias);
    }
  }, [forecastingData]);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.clientHeight);
      setSlideWidth(containerRef.current.clientWidth);
    }
  }, [NowData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % chunks.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [chunks.length]);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.clientHeight);
      setSlideWidth(containerRef.current.clientWidth);
    }
  }, [currentIndex]);

  return (
    <div>
      <div className='overflow-hidden mb-[20px]' style={{ height: containerHeight }}>
        <div
          className='slider-container flex gap-x-[20px]'
          style={{ transform: `translateX(-${currentIndex * (slideWidth + 20)}px)` }}
        >
          {chunks.map((chunk, chunkIndex) => (
            <div
              ref={chunkIndex === 0 ? containerRef : null}
              key={chunkIndex}
              className='slider flex flex-col gap-y-[23px] min-w-full'
            >
              {chunk.map((subCriteria, subIndex) => (
                <div key={subIndex} className='flex justify-between'>
                  <p className='text-fintown-txt-1 text-[14px] font-bold'>{subCriteria.name}</p>
                  <div className={`${subCriteria.status === "Tích cực" ? "text-fintown-stt-buy" : "text-fintown-stt-sell"} text-[14px] text-right`}>
                    {subCriteria.status}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className='flex items-center gap-x-[9px] justify-center'>
        {chunks.map((_, dotIndex) => (
          <div
            key={dotIndex}
            className={`h-[10px] w-[10px] rounded-[50%] cursor-pointer ${currentIndex === dotIndex ? 'bg-white' : 'bg-fintown-bg-stn'}`}
            onClick={() => setCurrentIndex(dotIndex)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default OverallSlider;
