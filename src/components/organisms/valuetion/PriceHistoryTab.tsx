import HistoryValuetionChart from "../../charts/valuetion/HistoryValuetionChart"

export default function PriceHistoryTab() {
    return (
        <>
            <div className="border-b border-b-fintown-br w-full flex items-center items-stretch">

                <div className="w-full border-r border-r-fintown-br">
                    <div className="flex items-center gap-x-[24px] py-[18px] border-b border-b-fintown-br px-[27px] ">
                        <div className="flex items-center">
                            <div className="h-[10px] w-[10px] rounded-[50%] bg-white mr-[8px]"></div>
                            <div className="text-[14px] text-fintown-txt-2">Thời điểm định giá</div>
                        </div>

                        <div className="flex items-center">
                            <div className="h-[10px] w-[10px] rounded-[50%] bg-white mr-[8px]"></div>
                            <div className="text-[14px] text-fintown-txt-2">Kết quả định giá</div>
                        </div>

                        <div className="flex items-center">
                            <div className="h-[10px] w-[10px] rounded-[50%] bg-white mr-[8px]"></div>
                            <div className="text-[14px] text-fintown-txt-2">Giá cổ phiếu hiện tại</div>
                        </div>
                    </div>

                    <div className="mt-[40px] px-[24px]">
                        < HistoryValuetionChart />
                    </div>
                </div>

                <div className="min-w-[224px]">
                    <div className="h-[50%] border-b border-b-fintown-br flex items-center justify-center">
                        <div>
                            <div className="mb-[5px] text-[12px] text-fintown-txt-2 text-center">
                                Kết quả định giá
                            </div>
                            <div className="font-bold text-[30px] text-fintown-txt-1 text-center">
                                23,849
                            </div>
                        </div>
                    </div>

                    <div className="h-[50%] flex items-center justify-center">
                        <div>
                            <div className="mb-[5px] text-[12px] text-fintown-txt-2 text-center">
                                Tỷ lệ sinh lợi tiềm năng
                            </div>
                            <div className="font-bold text-[30px] text-fintown-txt-1 text-center">
                                75,5%
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-[24px] py-[24px] h-full">
                <div className="font-bold text-[14px] text-fintown-txt-1 mb-[12px] flex items-center">
                    <div className="mr-[5px]">Ghi chú của bạn</div>
                    <i className='bx bx-edit text-fintown-txt-2 mr-[10px] text-[18px] cursor-pointer'></i>
                </div>

                <div className="text-[14px] text-fintown-txt-2">
                    Giá trị thực tế của cổ phiếu cao hơn giá trường, sẽ lên kế hoạch đầu tư ngay trong quý tới. Có thể tôi không nên xuống tiền ngay lúc này.
                </div>
            </div>
        </>
    )
}