import ValuetionChart from "../charts/valuetion/HistoryValuetionChart"

export default function PriceHistoryTab(){
    return(
        <>
            <div className="px-[27px] border-b border-b-fintown-br w-full flex items-center">
                <div className="flex items-center gap-x-[20px] pr-[19px] py-[15px]  w-max">
                    <button className="py-[5px] text-fintown-pr9 text-[12px] font-[600]">Đã qua</button>
                    <button className="py-[5px] text-fintown-txt-2 text-[12px] font-[600]">Sắp tới</button>
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
            
            <div className="px-[24px] py-[24px] border-b border-b-fintown-br">
                < ValuetionChart />
            </div>

            <div className="px-[24px] py-[24px] border-b border-b-fintown-br">
                <div className="font-bold text-[14px] text-fintown-txt-1 mb-[12px]">
                    Ghi chú của bạn:
                </div>

                <div className="text-[14px] text-fintown-txt-1">
                    Giá trị thực tế của cổ phiếu cao hơn giá trường, sẽ lên kế hoạch đầu tư ngay trong quý tới. Có thể tôi không nên xuống tiền ngay lúc này.
                </div>
            </div>
        </>
    )
}