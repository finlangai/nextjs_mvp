import React from 'react';

const MarketSummary = () => {
  return (
    <div className="flex items-center gap-x-[30px]">
      <div className="flex items-center">
        <div className="mr-[5px] text-fintown-txt-2 text-[14px]">
          Số lượng cổ phiếu:
        </div>
        <div className="text-fintown-txt-1 text-[14px]">
          30
        </div>
      </div>

      <div className="flex items-center">
        <div className="mr-[5px] text-fintown-txt-2 text-[14px]">
          Vốn hóa:
        </div>
        <div className="text-fintown-txt-1 text-[14px]">
          6,721,328T
        </div>
      </div>

      <div className="flex items-center">
        <div className="mr-[5px] text-fintown-txt-2 text-[14px]">
          Tổng KLGD 24h:
        </div>
        <div className="text-fintown-txt-1 text-[14px]">
          6,721,328T
        </div>
      </div>

      <div className="flex items-center">
        <div className="mr-[5px] text-fintown-txt-2 text-[14px]">
          Tăng giá mạnh nhất 24h:
        </div>
        <div className="text-fintown-txt-1 text-[14px] mr-[5px]">
          VCB
        </div>
        <div className="mr-[5px]">
          <i className='bx bx-caret-up text-fintown-stt-buy'></i>
        </div>
        <div className="text-fintown-stt-buy text-[14px] mr-[5px]">
          5.56%
        </div>
      </div>
    </div>
  );
};

export default MarketSummary;
