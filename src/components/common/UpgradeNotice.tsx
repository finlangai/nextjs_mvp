export default function UpgradeNotice({containerHeight} : {containerHeight: number}) {
    return (
        <div
            className="absolute right-0"
            style={{
                width: 'calc(100% - 265px - 70px)',
                minHeight: `${containerHeight}px`, 
                boxShadow: '0px -1.106px 0.553px 0px rgba(255, 255, 255, 0.10) inset',
                backdropFilter: 'blur(8px)',
                fill: 'linear-gradient(86deg, rgba(255, 255, 255, 0.00) -20.51%, rgba(255, 255, 255, 0.05) 26.82%, rgba(255, 255, 255, 0.00) 65.65%), rgba(0, 0, 0, 0.08)',
                top: "calc(70px + 86px)"
            }}
        >   
        <div className="p-[50px] max-w-max border border-fintown-br rounded-[8px] mx-auto mt-[60px]">
            <div className="w-[710px]  flex flex-col justify-start items-start">
                {/* Header */}
                <div className="pb-[27px] pr-[114px] border-b border-[#2B3139] flex flex-col justify-start items-start gap-[20px]">
                    <div className="w-full h-[40px] flex items-center gap-[4px]">
                        <img className="w-[40px] h-[40px]" src="/imgs/logo.png" alt="Logo" />
                        <div className="text-center text-white text-[24px] font-bold">fintown</div>
                    </div>
                    <div className="text-white text-[16px] font-normal">
                        Đăng ký để nhận nhiều phương án đầu tư hấp dẫn hơn từ dịch vụ của chúng tôi
                    </div>
                </div>

                {/* Features */}
                <div className="w-full h-[171px] py-[33px] flex justify-center items-center mb-[40px]">
                    <div className="w-full h-[106px] flex flex-wrap gap-y-[38px] gap-x-[40px]">
                        {[
                            'Truy cập kết quả dự báo sức khỏe tài chính của các công ty 5 năm tới.',
                            'Sử dụng công cụ định giá và lưu trữ kịch bản không giới hạn.',
                            'Đọc các phân tích sâu sắc từ AI giúp bổ sung lựa chọn đầu tư.',
                            'Nhận thông báo mới nhất khi kết quả dự báo vừa được cập nhật.',
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="w-[335px] flex justify-center items-start gap-[15px]"
                            >
                                <div className="w-[24px] h-[24px] bg-[#25B770] rounded-full flex justify-center items-center">
                                    <i className='bx bx-check text-fintown-txt-1' ></i>
                                </div>
                                <div className="w-[296px] text-[#EAECEF] text-[14px] font-medium">
                                    {feature}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pricing Options */}
                <div className="h-[55px] w-full py-[20px] px-[36px] border border-[#0ECB81] rounded-lg flex items-center gap-[12px] mb-[20px]">
                    <div className="w-[446px] flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-[15px] h-[15px] bg-[#25B770] rounded-full border border-[#25B770] mr-[10px]" />
                            <div className="text-[#EAECEF] text-[14px] font-medium">Gói hội viên theo tháng</div>
                        </div>

                        <div>
                            <span className="text-[#EAECEF] text-[14px] font-bold">422K</span>
                            <span className="text-[#EAECEF] text-[14px] font-medium">/</span>
                            <span className="text-[#EAECEF] text-[12px] font-medium">tháng</span>
                        </div>
                    </div>
                </div>

                <div className="h-[55px] w-full py-[20px] px-[36px] border border-fintown-br rounded-lg flex items-center gap-[12px] mb-[32px]">
                    <div className="w-[446px] flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-[15px] h-[15px] rounded-full border border-[#25B770] mr-[10px]" />
                            <div className="text-[#EAECEF] text-[14px] font-medium">Gói hội viên theo tháng</div>
                        </div>

                        <div>
                            <span className="text-[#EAECEF] text-[14px] font-bold">422K</span>
                            <span className="text-[#EAECEF] text-[14px] font-medium">/</span>
                            <span className="text-[#EAECEF] text-[12px] font-medium">tháng</span>
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <button className="w-full h-[55px] py-[19px] bg-[#25B770] rounded-lg flex justify-center items-center">
                    <div className="text-[#EAECEF] text-[14px] font-semibold">Đăng ký nâng cấp gói ngay</div>
                </button>
            </div>
        </div>

        </div>
    );
}
