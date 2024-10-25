import ValuetionChart from "../charts/ValuetionChart"

export default function PriceHistoryTab(){
    return(
        <>
            <div className="px-[27px] border-b border-b-fintown-br w-full flex items-center">
                <div className="flex items-center gap-x-[20px] pr-[19px] py-[15px] border-r border-r-fintown-br w-max">
                    <button className="py-[5px] text-fintown-txt-2 text-[12px] font-[600]">1 năm</button>
                    <button className="py-[5px] text-fintown-txt-2 text-[12px] font-[600]">3 năm</button>
                    <button className="py-[5px] text-fintown-pr9 text-[12px] font-[600]">5 năm</button>
                    <button className="py-[5px] text-fintown-txt-2 text-[12px] font-[600]">10 năm</button>
                </div>

                <div className="ml-auto flex items-center gap-x-[24px]">
                    <div className="flex items-center">
                        <div className="h-[5px] w-[5px] rounded-[50%] bg-fintown-pr9 mr-[8px]"></div>
                        <div className="text-[12px] text-fintown-txt-1">Giá cổ phiếu thực tế</div>
                    </div>

                    <div className="flex items-center">
                        <div className="h-[5px] w-[5px] rounded-[50%] bg-white mr-[8px]"></div>
                        <div className="text-[12px] text-fintown-txt-1">Giá cổ phiếu định giá đã lưu trữ</div>
                    </div>
                </div>
            </div>
            
            <div className="px-[24px] py-[24px]">
                < ValuetionChart />
            </div>
        </>
    )
}