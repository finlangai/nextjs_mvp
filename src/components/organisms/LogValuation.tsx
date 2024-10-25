import LogSlidingTabs from "../common/LogSlidingTabs"

export default function LogValuation ({containerHeight} : {containerHeight: number}){
    return (
        <>
        <div className="border-b border-b-fintown-br">
            <div className="pl-[30px] pr-[40px] pt-[20px] flex items-center">
                <div className="text-[14px] font-bold text-fintown-txt-1 mr-[8px]">
                    Nhật ký định giá
                </div>
                <div className="text-[10px] text-fintown-txt-1 h-[20px] w-[20px] rounded-[2px] bg-[#656F79] flex items-center justify-center">
                    <span className="h-max">36</span>
                </div>
            </div>

            <div className="pl-[30px] pr-[40px] pt-[17px] flex items-center mb-[12px]">
                <div className="rounded border border-fintown-br flex items-center px-[10px] w-full max-w-[126px] justify-between mr-[14px] cursor-pointer">
                    <div className="text-fintown-txt-1 text-[12px] py-[9px]">
                        Tháng 7
                    </div>
                    <div>
                        <i className='bx bx-chevron-down text-fintown-txt-1'></i>
                    </div>
                </div>

                <div className="rounded border border-fintown-br flex items-center px-[10px] w-full justify-between cursor-pointer">
                    <div className="text-fintown-txt-1 text-[12px] py-[9px]">
                        2024
                    </div>
                    <div>
                        <i className='bx bx-chevron-down text-fintown-txt-1'></i>
                    </div>
                </div>
            </div>

            <div className="px-[30px] py-[8px]">
                < LogSlidingTabs />
            </div>
        </div>

        <div className="flex items-center pl-[30px] pr-[40px] py-[17px]">
            <div className="text-fintown-txt-1 text-[12px] mr-[5px]">
                Lịch sử định giá đã qua chiết khấu
            </div>
            <div>
                <i className='bx bx-info-circle text-fintown-txt-1 text-[14px]'></i>
            </div>
        </div>

        <div className="overflow-y-auto custom-scrollbar pl-[30px] pr-[10px] mr-[30px] h-full flex flex-col gap-y-[10px]" style={{ maxHeight: containerHeight - 163 }}>
            <div className="border-b border-b-fintown-br">
                <div className="flex items-center mb-[8px]">
                    <div className="flex items-center">
                        <div className="w-[10px] h-[10px] rounded-[50%] bg-fintown-stt-sell mr-[8px]"></div>
                        <div className="text-[14px] font-[600] text-fintown-txt-1">17/07/2024</div>
                    </div>
                    <button className="h-[26px] w-[26px] rounded bg-fintown-btn-2 flex items-center justify-center ml-auto">
                        <i className='bx bx-trash text-fintown-txt-2' ></i>
                    </button>
                </div>

                <div className="flex items-center mb-[12px]">
                    <div className="flex items-center mr-[20px]">
                        <div className="text-[12px] text-fintown-txt-1 mr-[5px]">
                            Upside: 
                        </div>
                        <div className="text-[12px] text-fintown-stt-sell">
                            -27%
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="text-[12px] text-fintown-txt-1 mr-[5px]">
                            GTT:
                        </div>
                        <div className="text-[12px] text-fintown-stt-sell">
                            154,422
                        </div>
                    </div>
                </div>

                <div className="text-[12px] text-fintown-txt-2 pb-[13px]">
                    Giá trị thực tế của cổ phiếu cao hơn giá trị trường.
                </div>
            </div>

            <div className="border-b border-b-fintown-br">
                <div className="flex items-center mb-[8px]">
                    <div className="flex items-center">
                        <div className="w-[10px] h-[10px] rounded-[50%] bg-fintown-stt-sell mr-[8px]"></div>
                        <div className="text-[14px] font-[600] text-fintown-txt-1">17/07/2024</div>
                    </div>
                    <button className="h-[26px] w-[26px] rounded bg-fintown-btn-2 flex items-center justify-center ml-auto">
                        <i className='bx bx-trash text-fintown-txt-2' ></i>
                    </button>
                </div>

                <div className="flex items-center mb-[12px]">
                    <div className="flex items-center mr-[20px]">
                        <div className="text-[12px] text-fintown-txt-1 mr-[5px]">
                            Upside: 
                        </div>
                        <div className="text-[12px] text-fintown-stt-sell">
                            -27%
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="text-[12px] text-fintown-txt-1 mr-[5px]">
                            GTT:
                        </div>
                        <div className="text-[12px] text-fintown-stt-sell">
                            154,422
                        </div>
                    </div>
                </div>

                <div className="text-[12px] text-fintown-txt-2 pb-[13px]">
                    Giá trị thực tế của cổ phiếu cao hơn giá trị trường.
                </div>
            </div>

            <div className="border-b border-b-fintown-br">
                <div className="flex items-center mb-[8px]">
                    <div className="flex items-center">
                        <div className="w-[10px] h-[10px] rounded-[50%] bg-fintown-stt-sell mr-[8px]"></div>
                        <div className="text-[14px] font-[600] text-fintown-txt-1">17/07/2024</div>
                    </div>
                    <button className="h-[26px] w-[26px] rounded bg-fintown-btn-2 flex items-center justify-center ml-auto">
                        <i className='bx bx-trash text-fintown-txt-2' ></i>
                    </button>
                </div>

                <div className="flex items-center mb-[12px]">
                    <div className="flex items-center mr-[20px]">
                        <div className="text-[12px] text-fintown-txt-1 mr-[5px]">
                            Upside: 
                        </div>
                        <div className="text-[12px] text-fintown-stt-sell">
                            -27%
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="text-[12px] text-fintown-txt-1 mr-[5px]">
                            GTT:
                        </div>
                        <div className="text-[12px] text-fintown-stt-sell">
                            154,422
                        </div>
                    </div>
                </div>

                <div className="text-[12px] text-fintown-txt-2 pb-[13px]">
                    Giá trị thực tế của cổ phiếu cao hơn giá trị trường.
                </div>
            </div>

            <div className="border-b border-b-fintown-br">
                <div className="flex items-center mb-[8px]">
                    <div className="flex items-center">
                        <div className="w-[10px] h-[10px] rounded-[50%] bg-fintown-stt-sell mr-[8px]"></div>
                        <div className="text-[14px] font-[600] text-fintown-txt-1">17/07/2024</div>
                    </div>
                    <button className="h-[26px] w-[26px] rounded bg-fintown-btn-2 flex items-center justify-center ml-auto">
                        <i className='bx bx-trash text-fintown-txt-2' ></i>
                    </button>
                </div>

                <div className="flex items-center mb-[12px]">
                    <div className="flex items-center mr-[20px]">
                        <div className="text-[12px] text-fintown-txt-1 mr-[5px]">
                            Upside: 
                        </div>
                        <div className="text-[12px] text-fintown-stt-sell">
                            -27%
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="text-[12px] text-fintown-txt-1 mr-[5px]">
                            GTT:
                        </div>
                        <div className="text-[12px] text-fintown-stt-sell">
                            154,422
                        </div>
                    </div>
                </div>

                <div className="text-[12px] text-fintown-txt-2 pb-[13px]">
                    Giá trị thực tế của cổ phiếu cao hơn giá trị trường.
                </div>
            </div>

            <div className="border-b border-b-fintown-br">
                <div className="flex items-center mb-[8px]">
                    <div className="flex items-center">
                        <div className="w-[10px] h-[10px] rounded-[50%] bg-fintown-stt-sell mr-[8px]"></div>
                        <div className="text-[14px] font-[600] text-fintown-txt-1">17/07/2024</div>
                    </div>
                    <button className="h-[26px] w-[26px] rounded bg-fintown-btn-2 flex items-center justify-center ml-auto">
                        <i className='bx bx-trash text-fintown-txt-2' ></i>
                    </button>
                </div>

                <div className="flex items-center mb-[12px]">
                    <div className="flex items-center mr-[20px]">
                        <div className="text-[12px] text-fintown-txt-1 mr-[5px]">
                            Upside: 
                        </div>
                        <div className="text-[12px] text-fintown-stt-sell">
                            -27%
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="text-[12px] text-fintown-txt-1 mr-[5px]">
                            GTT:
                        </div>
                        <div className="text-[12px] text-fintown-stt-sell">
                            154,422
                        </div>
                    </div>
                </div>

                <div className="text-[12px] text-fintown-txt-2 pb-[13px]">
                    Giá trị thực tế của cổ phiếu cao hơn giá trị trường.
                </div>
            </div>

            <div className="border-b border-b-fintown-br">
                <div className="flex items-center mb-[8px]">
                    <div className="flex items-center">
                        <div className="w-[10px] h-[10px] rounded-[50%] bg-fintown-stt-sell mr-[8px]"></div>
                        <div className="text-[14px] font-[600] text-fintown-txt-1">17/07/2024</div>
                    </div>
                    <button className="h-[26px] w-[26px] rounded bg-fintown-btn-2 flex items-center justify-center ml-auto">
                        <i className='bx bx-trash text-fintown-txt-2' ></i>
                    </button>
                </div>

                <div className="flex items-center mb-[12px]">
                    <div className="flex items-center mr-[20px]">
                        <div className="text-[12px] text-fintown-txt-1 mr-[5px]">
                            Upside: 
                        </div>
                        <div className="text-[12px] text-fintown-stt-sell">
                            -27%
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="text-[12px] text-fintown-txt-1 mr-[5px]">
                            GTT:
                        </div>
                        <div className="text-[12px] text-fintown-stt-sell">
                            154,422
                        </div>
                    </div>
                </div>

                <div className="text-[12px] text-fintown-txt-2 pb-[13px]">
                    Giá trị thực tế của cổ phiếu cao hơn giá trị trường.
                </div>
            </div>

            <div className="border-b border-b-fintown-br">
                <div className="flex items-center mb-[8px]">
                    <div className="flex items-center">
                        <div className="w-[10px] h-[10px] rounded-[50%] bg-fintown-stt-sell mr-[8px]"></div>
                        <div className="text-[14px] font-[600] text-fintown-txt-1">17/07/2024</div>
                    </div>
                    <button className="h-[26px] w-[26px] rounded bg-fintown-btn-2 flex items-center justify-center ml-auto">
                        <i className='bx bx-trash text-fintown-txt-2' ></i>
                    </button>
                </div>

                <div className="flex items-center mb-[12px]">
                    <div className="flex items-center mr-[20px]">
                        <div className="text-[12px] text-fintown-txt-1 mr-[5px]">
                            Upside: 
                        </div>
                        <div className="text-[12px] text-fintown-stt-sell">
                            -27%
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="text-[12px] text-fintown-txt-1 mr-[5px]">
                            GTT:
                        </div>
                        <div className="text-[12px] text-fintown-stt-sell">
                            154,422
                        </div>
                    </div>
                </div>

                <div className="text-[12px] text-fintown-txt-2 pb-[13px]">
                    Giá trị thực tế của cổ phiếu cao hơn giá trị trường.
                </div>
            </div>
        </div>

        <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar {
                width: 6px; /* Thon gọn thanh cuộn */
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background-color: #555; /* Màu thanh cuộn */
                border-radius: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
                background-color: transparent; /* Ẩn nền */
            }
        `}</style>
        </>
    )
}