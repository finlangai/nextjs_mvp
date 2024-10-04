const ReportColumnChartCard = () => {
    return (
        <>
        <div className="bg-fintown-bg-card rounded-[20px] w-max py-[24px] px-[28px] ">
            <div className="text-fintown-txt-2 text-[18px] mb-[4px]">
                Báo cáo
            </div>
            <div className="text-fintown-txt-1 text-[22px] font-bold mb-[28px]">
                Kết quả kinh doanh
            </div>
            <div className="flex gap-x-[22px] items-end">
                <div className="w-[28px] h-[105px] rounded-t-[4px] rounded-t bg-fintown-chart-3"></div>
                <div className="w-[28px] h-[22px] rounded-t-[4px] rounded-t bg-fintown-chart-3"></div>
                <div className="w-[28px] h-[48px] rounded-t-[4px] rounded-t bg-fintown-chart-3"></div>
                <div className="w-[28px] h-[29px] rounded-t-[4px] rounded-t bg-fintown-chart-3"></div>
                <div className="w-[28px] h-[85px] rounded-t-[4px] rounded-t bg-fintown-chart-4"></div>
                <div className="w-[28px] h-[23px] rounded-t-[4px] rounded-t bg-fintown-chart-3"></div>
                <div className="w-[28px] h-[61px] rounded-t-[4px] rounded-t bg-fintown-chart-3"></div>
            </div>
        </div>
        </>
    )
}

const ForeCastingCard = () => {
    // Tạo dữ liệu mẫu cho biểu đồ
    const data1 = [30, 20, 40, 10, 50, 35, 45, 20, 25, 15]; // Đường đầu tiên
    const data2 = [50, 40, 30, 20, 10, 25, 15, 30, 35, 20]; // Đường thứ hai

    // Chiều rộng của biểu đồ
    const width = 287;
    const height = 58;
    
    // Tạo các điểm cho mỗi đường
    const points1 = data1.map((value, index) => `${(width / (data1.length - 1)) * index},${height - value}`).join(' ');
    const points2 = data2.map((value, index) => `${(width / (data2.length - 1)) * index},${height - value}`).join(' ');

    return (
        <>
            <div className="bg-fintown-bg-card rounded-[20px] w-max py-[24px] px-[28px]">
                <div className="flex items-center mb-[8px] justify-between">
                    <div className="text-sm text-fintown-txt-2">
                        Dự báo tăng trưởng
                    </div>
                    <div className="flex items-center">
                        <span className="text-fintown-pr9 text-sm mr-[5px]">+21.01%</span>
                        <i className='bx bx-trending-up text-fintown-pr9'></i>
                    </div>
                </div>
                <div className="flex items-center justify-between mb-[25px]">
                    <div className="text-base text-fintown-txt-1 font-bold">
                        Biên lợi nhuận ròng
                    </div>
                    <div className="text-fintown-txt-1 text-base font-bold">13,52%</div>
                </div>

                <div className="w-[287px] h-[58px] relative">
                    <svg width="287" height="58">
                        {/* Đường đầu tiên */}
                        <polyline 
                            points={points1} 
                            fill="none" 
                            stroke="white" 
                            strokeWidth="1" 
                        />
                        {/* Điểm của đường thứ hai */}
                        {data2.map((value, index) => (
                            <circle 
                                key={`point2-${index}`} 
                                cx={(width / (data2.length - 1)) * index} 
                                cy={height - value} 
                            />
                        ))}
                    </svg>
                </div>
                
            </div>
        </>
    );
};

const PeCard = () => {
    return (
        <>
            <div className="bg-fintown-bg-card rounded-[10px] w-max py-[15px] px-[25px] flex flex-col gap-y-[9px]">
                <div className="text-base text-fintown-txt-1 text-center">
                    P/E
                </div>
                <div className="text-fintown-txt-1 text-base font-bold text-center">13,52%</div>
                <div className="flex items-center">
                    <span className="text-fintown-pr9 text-sm mr-[5px]">+21.01%</span>
                    <i className='bx bx-trending-up text-fintown-pr9'></i>
                </div>
            </div>
        </>
    )
}

const ROACard = () => {
    return (
        <>
            <div className="bg-fintown-bg-card rounded-[10px] w-max py-[15px] px-[25px] flex flex-col gap-y-[9px]">
                <div className="text-base text-fintown-txt-1 text-center">
                    ROA
                </div>
                <div className="text-fintown-txt-1 text-base font-bold text-center">13,52%</div>
                <div className="flex items-center">
                    <span className="text-fintown-pr9 text-sm mr-[5px]">+21.01%</span>
                    <i className='bx bx-trending-up text-fintown-pr9'></i>
                </div>
            </div>
        </>
    )
}

export {ReportColumnChartCard, ForeCastingCard, PeCard, ROACard}