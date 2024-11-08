export default function CompareTable() {
    return (
        <>
        <div className='text-fintown-txt-1 text-[12px] mb-[29px]'>
            Q-Rating là bộ chỉ số đánh giá toàn diện chất lượng doanh nghiệp theo thang điểm 1-10.
        </div>

        <div>
            <div className='flex items-center text-fintown-txt-1 text-[14px] pb-[15px] border-b border-b-fintown-br mb-[18px]'>
                <div className='min-w-[129px] w-full text-right'>
                    Q-Rating
                </div>

                <div className='min-w-[129px] w-full text-right'>
                    Hiệu quả sinh lời
                </div>

                <div className='min-w-[129px] w-full text-right'>
                    Khả năng thanh toán
                </div>

                <div className='min-w-[129px] w-full text-right'>
                    Doanh thu & Lợi nhuận
                </div>
            </div>
            <div className='flex items-center text-fintown-txt-1 text-[14px] pb-[15px] border-b border-b-fintown-br mb-[18px]'>
                <div className='min-w-[129px] w-full text-right flex items-center'>
                    <div className='flex items-center w-[75px] justify-between '>
                        <div className='text-fintown-txt-1 font-bold'>VCB</div>
                        <div className='min-h-[20px] min-w-[20px] max-h-[20px] max-w-[20px] rounded-[50%] overflow-hidden flex items-center justify-center bg-white'>
                            <img className='w-full h-full object-contain' src="/imgs/logo_cty/vcb.png" alt="" />
                        </div>
                    </div>
                    <div className='ml-auto'>
                        7.55
                    </div>
                </div>

                <div className='min-w-[129px] w-full text-right'>
                7.55
                </div>

                <div className='min-w-[129px] w-full text-right'>
                7.55
                </div>

                <div className='min-w-[129px] w-full text-right'>
                7.55
                </div>
            </div>
            <div className='flex items-center text-fintown-txt-1 text-[14px] pb-[15px] border-b border-b-fintown-br mb-[18px]'>
                <div className='min-w-[129px] w-full text-right flex items-center'>
                    <div className='flex items-center w-[75px] justify-between '>
                        <div className='text-fintown-txt-1 font-bold'>VCB</div>
                        <div className='min-h-[20px] min-w-[20px] max-h-[20px] max-w-[20px] rounded-[50%] overflow-hidden flex items-center justify-center bg-white'>
                            <img className='w-full h-full object-contain' src="/imgs/logo_cty/vcb.png" alt="" />
                        </div>
                    </div>
                    <div className='ml-auto'>
                        7.55
                    </div>
                </div>

                <div className='min-w-[129px] w-full text-right'>
                7.55
                </div>

                <div className='min-w-[129px] w-full text-right'>
                7.55
                </div>

                <div className='min-w-[129px] w-full text-right'>
                7.55
                </div>
            </div>
            <div className='flex items-center text-fintown-txt-1 text-[14px] pb-[15px] border-b border-b-fintown-br mb-[18px]'>
                <div className='min-w-[129px] w-full text-right flex items-center'>
                    <div className='flex items-center w-[75px] justify-between '>
                        <div className='text-fintown-txt-1 font-bold'>VCB</div>
                        <div className='min-h-[20px] min-w-[20px] max-h-[20px] max-w-[20px] rounded-[50%] overflow-hidden flex items-center justify-center bg-white'>
                            <img className='w-full h-full object-contain' src="/imgs/logo_cty/vcb.png" alt="" />
                        </div>
                    </div>
                    <div className='ml-auto'>
                        7.55
                    </div>
                </div>

                <div className='min-w-[129px] w-full text-right'>
                7.55
                </div>

                <div className='min-w-[129px] w-full text-right'>
                7.55
                </div>

                <div className='min-w-[129px] w-full text-right'>
                7.55
                </div>
            </div>
        </div>

        <div className='flex items-center gap-x-[5px] justify-end'>
            <button
                className={`
                    flex items-center justify-center w-[30px] h-[30px] rounded-[50%]
                    transition-all duration-300
                    bg-fintown-btn-2 cursor-pointer hover:opacity-80 bg-gray-300 cursor-not-allowed}
                `}
            >
                <i className={`bx bx-chevron-left text-[24px] text-white text-gray-500}`}></i>
            </button>
            <button
                className={`
                    flex items-center justify-center w-[30px] h-[30px] rounded-[50%]
                    transition-all duration-300
                    bg-fintown-btn-2 cursor-pointer hover:opacity-80 'bg-gray-300 cursor-not-allowed'}
                `}
            >
                <i className={`bx bx-chevron-right text-[24px] text-white text-gray-500}`}></i>
            </button>
        </div> 
        </>
    )
}