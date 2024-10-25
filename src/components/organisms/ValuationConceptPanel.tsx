export default function ValuationConceptPanel({containerHeight} : {containerHeight: number}) {
    return (
        <>
            <div className="flex flex-col h-full " >
                <div className='text-[16px] font-bold text-fintown-txt-1 pl-[30px] py-[30px]'>
                    Các mô hình định giá
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar mr-[30px] h-full" style={{ maxHeight: containerHeight - 80 }}>
                    <div className="ml-[30px] border-b border-fintown-br pb-[17px] mb-[20px] mr-[10px]">
                        <div className="flex items-center  mb-[10px]">
                            <div className="text-fintown-txt-1 text-[14px] font-bold w-full">
                                Chiết khấu dòng tiền
                            </div>
                            <i className='bx bx-chevron-down text-[24px] text-fintown-txt-1 pl-[20px] cusor-pointer'></i>
                        </div>
                        <div className="text-fintown-txt-1 text-[12px] text-justify">
                            Dòng tiền tự do (DFC – Discounted Free Cash Flow) là một khái niệm trong tài chính được sử dụng để đánh giá giá trị của một doanh nghiệp hoặc dự án bằng cách đánh giá khả năng sinh lời của doanh nghiệp dựa trên lợi nhuận và dòng tiền trong tương lai.
                        </div>
                    </div>

                    <div className="ml-[30px] border-b border-fintown-br pb-[17px] mb-[20px] mr-[10px]">
                        <div className="flex items-center  mb-[10px]">
                            <div className="text-fintown-txt-1 text-[14px] font-bold w-full">
                                Chiết khấu dòng tiền
                            </div>
                            <i className='bx bx-chevron-down text-[24px] text-fintown-txt-1 pl-[20px] cusor-pointer'></i>
                        </div>
                        <div className="text-fintown-txt-1 text-[12px] text-justify">
                            Dòng tiền tự do (DFC – Discounted Free Cash Flow) là một khái niệm trong tài chính được sử dụng để đánh giá giá trị của một doanh nghiệp hoặc dự án bằng cách đánh giá khả năng sinh lời của doanh nghiệp dựa trên lợi nhuận và dòng tiền trong tương lai.
                        </div>
                    </div>

                    <div className="ml-[30px] border-b border-fintown-br pb-[17px] mb-[20px] mr-[10px]">
                        <div className="flex items-center  mb-[10px]">
                            <div className="text-fintown-txt-1 text-[14px] font-bold w-full">
                                Chiết khấu dòng tiền
                            </div>
                            <i className='bx bx-chevron-down text-[24px] text-fintown-txt-1 pl-[20px] cusor-pointer'></i>
                        </div>
                        <div className="text-fintown-txt-1 text-[12px] text-justify">
                            Dòng tiền tự do (DFC – Discounted Free Cash Flow) là một khái niệm trong tài chính được sử dụng để đánh giá giá trị của một doanh nghiệp hoặc dự án bằng cách đánh giá khả năng sinh lời của doanh nghiệp dựa trên lợi nhuận và dòng tiền trong tương lai.
                        </div>
                    </div>

                    <div className="ml-[30px] border-b border-fintown-br pb-[17px] mb-[20px] mr-[10px]">
                        <div className="flex items-center  mb-[10px]">
                            <div className="text-fintown-txt-1 text-[14px] font-bold w-full">
                                Chiết khấu dòng tiền
                            </div>
                            <i className='bx bx-chevron-down text-[24px] text-fintown-txt-1 pl-[20px] cusor-pointer'></i>
                        </div>
                        <div className="text-fintown-txt-1 text-[12px] text-justify">
                            Dòng tiền tự do (DFC – Discounted Free Cash Flow) là một khái niệm trong tài chính được sử dụng để đánh giá giá trị của một doanh nghiệp hoặc dự án bằng cách đánh giá khả năng sinh lời của doanh nghiệp dựa trên lợi nhuận và dòng tiền trong tương lai.
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
            </div>
        </>
    )
}