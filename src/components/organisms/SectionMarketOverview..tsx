import MarketIndicatorChart from "../charts/MarketIndicatorChart/MarketIndicatorChart";
import VN30Summary from "./VN30Summary";

export default function SectionMarketOverview() {

  return (
    <>
      <div>
        <div className='flex items-center pb-[20px] border-b border-b-fintown-br mb-[42px]'>
          <div className='flex items-center mr-[24px] border-r border-r-fintown-br pr-[20px]'>
            <div className='border border-fintown-br rounded-[50%] w-[30px] h-[30px] flex items-center justify-center mr-[10px] bg-fintown-txt-1'>
              <i className='bx bxs-star text-fintown-txt-2 text-[20px]' ></i>
            </div>

            <div className='text-fintown-txt-1 text-[16px] font-bold'>
              VN30
            </div>
          </div>

          <div className='flex items-center text-[14px] text-fintown-txt-2 gap-x-[22px] font-[500]'>
            <button className='text-fintown-pr9 hover:text-fintown-pr9'>1D</button>
            <button className='hover:text-fintown-pr9'>3M</button>
            <button className='hover:text-fintown-pr9'>1Y</button>
            <button className='hover:text-fintown-pr9'>YTD</button>
          </div>

          <div className="flex items-center ml-auto">
            <p className="text-fintown-txt-1 font-bold text-[24px]">
              1,208.32
            </p>

            <div className="bg-fintown-stt-sell rounded text-[14px] text-fintown-txt-1 flex items-center px-[8px] py-[4px] ml-[12px]">
              <i className='bx bx-caret-down text-sm'></i>
              <div className='text-[14px]'>5.62</div>
              <div>%</div>
            </div>

            <div className="bg-fintown-stt-sell rounded text-[14px] text-fintown-txt-1 flex items-center px-[8px] py-[4px] ml-[12px]">
              <div>-5.62</div>
              <div></div>
            </div>
          </div>
        </div>
        <div className='pb-[38px] mb-[24px] border-b border-b-fintown-br'>
          <MarketIndicatorChart />
        </div>
        < VN30Summary />
      </div>
    </>
  )
}