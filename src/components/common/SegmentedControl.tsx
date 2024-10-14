export default function SegmentedControl(){
    return(
        <>
            <div className="px-[40px] border-b border-t border-fintown-br">
                <div className="flex h-[72px] items-center">
                    <div className="flex items-center gap-x-[48px]">
                        <div className="text-fintown-txt-1 text-[14px]"> 
                            Chọn chỉ số cần xem
                        </div>
                        <div className="min-h-[72px] w-[1px] bg-fintown-br"></div>
                    </div>

                    <div className="flex items-center gap-x-[15px] ml-[48px]">
                        <div className="w-[46px] min-h-[23px] rounded border border-fintown-br flex items-center cursor-pointer">
                            <div className="w-[22px] h-[22px] bg-fintown-pr9 rounded"></div>
                        </div>

                        <div className="text-fintown-txt-1 text-[14px]"> 
                            Hiệu quả sinh lời trên vốn
                        </div>
                    </div>

                    <div className="flex items-center gap-x-[15px] ml-[48px]">
                        <div className="w-[46px] min-h-[23px] rounded border border-fintown-br flex items-center cursor-pointer">
                            <div className="w-[22px] h-[22px] bg-fintown-pr9 rounded"></div>
                        </div>

                        <div className="text-fintown-txt-1 text-[14px]"> 
                           Lợi nhuận biên
                        </div>
                    </div>

                    <div className="flex items-center gap-x-[15px] ml-[48px]">
                        <div className="w-[46px] min-h-[23px] rounded border border-fintown-br flex items-center cursor-pointer">
                            <div className="w-[22px] h-[22px] bg-fintown-pr9 rounded"></div>
                        </div>

                        <div className="text-fintown-txt-1 text-[14px]"> 
                            EPS (Lợi nhuận trên một phần sở hữu)
                        </div>
                    </div>

                    <div className="flex items-center gap-x-[15px] ml-[48px]">
                        <div className="w-[46px] min-h-[23px] rounded border border-fintown-br flex items-center cursor-pointer">
                            <div className="w-[22px] h-[22px] bg-fintown-pr9 rounded"></div>
                        </div>

                        <div className="text-fintown-txt-1 text-[14px]"> 
                            ROS (Tỷ suất lợi nhuận trên doanh thu)
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}