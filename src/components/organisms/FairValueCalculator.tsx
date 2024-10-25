import UpsideRangerSlider from "./UpsideRangeSlider"

export default function FairValueCalculator(){
    const stockPrice = 150.75;
    const upside = 60;
    return (
        <>
        <div className="px-[24px] py-[24px]">
            <div className="px-[24px] py-[24px] border border-fintown-br rounded-[8px] flex justify-between">
                <div className="w-full pr-[24px] ">
                    <div className="font-bold text-[14px] text-fintown-txt-1 mb-[12px]">
                        Giá trị thực:
                    </div>

                    <div className="flex items-end mb-[22px]">
                        <div className="font-bold text-[36px] text-fintown-txt-1 mr-[10px] leading-none">
                            105.500
                        </div>
                        <div className="text-[12px] text-fintown-txt-1 pb-[2px]">
                            VNĐ/cổ phiếu
                        </div>
                    </div>

                    <div>
                        < UpsideRangerSlider value={60}/>
                    </div>

                    <div className="text-[14px] text-fintown-txt-1 mb-[24px] pb-[17px] border-b border-fintown-br">
                        Upside hiện tại sau khi định giá là 20%, đây được xem là một mức định giá hấp dẫn. 
                    </div>

                    <div className="mb-[14px] text-[14px] text-fintown-txt-1">
                        Số năm chiết khấu
                    </div>

                    <div className="flex gap-x-[12px] flex-wrap gap-y-[12px] mb-[80px]">
                        <button className="text-[12px] text-fintown-txt-2 py-[7px] px-[23px] border border-fintown-br rounded">
                            1 năm
                        </button>

                        <button className="text-[12px] text-fintown-txt-2 py-[7px] px-[23px] border border-fintown-br rounded">
                            3 năm
                        </button>

                        <button className="text-[12px] text-fintown-txt-1 py-[7px] px-[23px] bg-fintown-btn-2 rounded">
                            5 năm
                        </button>

                        <button className="text-[12px] text-fintown-txt-2 py-[7px] px-[23px] border border-fintown-br rounded">
                            10 năm
                        </button>
                    </div>

                    <button className="text-[14px] text-fintown-txt-1 py-[12px] rounded-[8px] bg-fintown-pr9 w-full">
                        Tính toán
                    </button>
                </div>
                <div className="w-full max-w-[350px] flex flex-col justify-between">
                    <div>
                        <div className="font-bold text-[14px] text-fintown-txt-1 mb-[17px] ">
                        Các tham số
                        </div>

                        <div className="flex flex-col gap-y-[10px]">
                            <div className="border border-fintown-br py-[15px] px-[17px] rounded-[8px]">
                                <div className="text-[12px] text-fintown-txt-1 mb-[7px]">
                                    Dòng tiền tương lai dự kiến
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="text-[14px] text-fintown-txt-1 font-bold">
                                        D1
                                    </div>

                                    <div className="text-[14px] text-fintown-txt-1">
                                        10%
                                    </div>
                                </div>
                            </div>

                            <div className="border border-fintown-br py-[15px] px-[17px] rounded-[8px]">
                                <div className="text-[12px] text-fintown-txt-1 mb-[7px]">
                                    Dòng tiền tương lai dự kiến
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="text-[14px] text-fintown-txt-1 font-bold">
                                        D1
                                    </div>

                                    <div className="text-[14px] text-fintown-txt-1">
                                        10%
                                    </div>
                                </div>
                            </div>

                            <div className="border border-fintown-br py-[15px] px-[17px] rounded-[8px]">
                                <div className="text-[12px] text-fintown-txt-1 mb-[7px]">
                                    Dòng tiền tương lai dự kiến
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="text-[14px] text-fintown-txt-1 font-bold">
                                        D1
                                    </div>

                                    <div className="text-[14px] text-fintown-txt-1">
                                        10%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="text-[14px] text-fintown-txt-1 py-[12px] rounded-[8px] bg-fintown-btn-2 w-full">
                        Đặt lại
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}