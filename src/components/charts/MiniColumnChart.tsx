import React from 'react';

const MiniColumnChart = () => {
  const categories = ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024'];
  const data = [24000, 27000, 29000, 32000, 31000, 30000];
  const maxDataValue = Math.max(...data);

  return (
    <>
      <div className='flex gap-x-[1px] border-b-[2px] border-fintown-btn-active-2'>
          <div className='w-[5px] h-[14px] bg-fintown-btn-active-2'></div>
          <div className='w-[5px] h-[14px] bg-fintown-btn-active-1'></div>
          <div className='w-[5px] h-[14px] bg-fintown-btn-active-1'></div>
          <div className='w-[5px] h-[14px] bg-fintown-btn-active-1'></div>
          <div className='w-[5px] h-[14px] bg-fintown-btn-active-1'></div>
          <div className='w-[5px] h-[14px] bg-fintown-btn-active-1'></div>
          <div className='w-[5px] h-[14px] bg-fintown-btn-active-1'></div>
          <div className='w-[5px] h-[14px] bg-fintown-btn-active-1'></div>
          <div className='w-[5px] h-[14px] bg-fintown-btn-active-1'></div>
      </div>
    </>
  );
};

export default MiniColumnChart;
