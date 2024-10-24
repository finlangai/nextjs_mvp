import FairValueCalculator from "@/src/components/organisms/FairValueCalculator"

export default function DiscountCashFlowPage({ params }: { params: { symbol: string } }){
    return(
        <>
        <div className='w-full'>
            <div className='py-[30px] px-[24px] justify-between border-r border-b border-fintown-br'>
                <div className='text-[20px] font-bold text-fintown-txt-1 mb-[16px]'>
                    Mô hình chiết khấu dòng tiền (Discounted Cash Flow)
                </div>

                <div className="text-[14px] text-fintown-txt-1">
                    Công thức: P0 = Σ (FCFt) / (1 + r)^t
                </div>
            </div>

            <div className="px-[24px] py-[24px] border-b border-fintown-br">
                <div className="flex items-center gap-x-[18px] pb-[11px]">
                    <div className="text-fintown-txt-1 font-bold text-[14px] cursor-pointer">
                        Máy tính
                    </div>

                    <div className="text-fintown-txt-2 font-bold text-[14px] cursor-pointer">
                        Lịch sử định giá
                    </div>
                </div>
                <div className="w-[25px] h-[2px] bg-fintown-pr9"></div>
            </div>

            <div className="px-[24px] py-[24px]">
                < FairValueCalculator />
            </div>
        </div>
        </>
    )
}