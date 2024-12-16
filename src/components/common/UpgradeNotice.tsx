"use client";
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { SpinerLoader } from './Loader';

export default function UpgradeNotice({
  containerHeight,
  style,
}: {
  containerHeight: string;
  style?: React.CSSProperties;
}) {
    const [pricingData, setPricingData] = useState<PricingData>();
    const [selectedOption, setSelectedOption] = useState<'MONTHLY' | 'YEARLY' | null>(null);
    const [load, setLoad] = useState(true);

    // Tạo ref cho hai phần tử ẩn
    const monthlyLinkRef = useRef<HTMLAnchorElement>(null);
    const yearlyLinkRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        fetch('https://portal.fintown.software/api/general/pricing')
        .then((response) => response.json())
        .then((data) => {
            setPricingData(data);
            setLoad(false);
        })
        .catch(() => {
            setLoad(false);
        });
    }, []);

    // FORMAT HIỂN THỊ GIÁ
    const formatPrice = (price: any): string => {
        const formattedPrice = price >= 1000 ? (price / 1000).toFixed(0) + 'k' : price?.toString();
        return formattedPrice;
    };

    // CẬP NHẬT LỰA CHỌN
    const handleOptionClick = (option: 'MONTHLY' | 'YEARLY') => {
        setSelectedOption(option);
    };

    // LOGIC CHUYỂN TRANG DỰA TRÊN LỰA CHỌN
    const handleSubscribeClick = () => {
        if (selectedOption === "MONTHLY" && monthlyLinkRef.current) {
            monthlyLinkRef.current.click();
        } else if (selectedOption === "YEARLY" && yearlyLinkRef.current) {
            yearlyLinkRef.current.click();
        }
    };

    return (
        <div
        className="absolute right-0"
        style={{
            width: 'calc(100% - 265px - 70px)',
            minHeight: `${containerHeight}`,
            boxShadow: '0px -1.106px 0.553px 0px rgba(255, 255, 255, 0.10) inset',
            backdropFilter: 'blur(8px)',
            fill: 'linear-gradient(86deg, rgba(255, 255, 255, 0.00) -20.51%, rgba(255, 255, 255, 0.05) 26.82%, rgba(255, 255, 255, 0.00) 65.65%), rgba(0, 0, 0, 0.08)',
            top: 'calc(70px + 86px)',
            ...style,
        }}
        >
            {
                load 
                ? <div className='flex justify-center w-full h-[500px] items-center'>
                    <SpinerLoader/>
                    </div>
                : 
                <div className="p-[50px] max-w-max border border-fintown-br dark:border-fintown-br-light rounded-[8px] mx-auto mt-[60px]">
                    <div className="w-[710px] flex flex-col justify-start items-start">
                    {/* Header */}
                    <div className="pb-[27px] pr-[114px] border-b border-fintown-br dark:border-fintown-br-light flex flex-col justify-start items-start gap-[20px]">
                        <div className="w-full h-[40px] flex items-center gap-[4px]">
                        <img className="w-[40px] h-[40px]" src="/imgs/logo.png" alt="Logo" />
                        <div className="text-center text-fintown-txt-1 dark:text-fintown-txt-1-light text-[24px] font-bold">
                            fintown
                        </div>
                        </div>
                        <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-[16px] font-normal ">
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
                            <div key={index} className="w-[335px] flex justify-center items-start gap-[15px]">
                            <div className="w-[24px] h-[24px] bg-[#25B770] rounded-full flex justify-center items-center">
                                <i className="bx bx-check text-fintown-txt-1"></i>
                            </div>
                            <div className="w-[296px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-[14px] font-medium">
                                {feature}
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>

                    {/* Pricing Options */}
                    <div
                        className={`hover:border-[#0ECB81] h-[55px] w-full py-[20px] px-[36px] border ${
                        selectedOption === 'MONTHLY' ? 'border-[#0ECB81]' : 'border-fintown-br dark:border-fintown-br-light'
                        } rounded-lg flex items-center gap-[12px] mb-[20px] cursor-pointer`}
                        onClick={() => handleOptionClick('MONTHLY')}
                    >
                        <div className="w-[446px] flex items-center justify-between">
                        <div className="flex items-center">
                            <div
                            className={`w-[15px] h-[15px] rounded-full border ${
                                selectedOption === 'MONTHLY' ? 'bg-[#25B770] border-[#25B770]' : 'border-[#25B770]'
                            } mr-[10px]`}
                            />
                            <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-[14px] font-medium">
                            {pricingData?.MONTHLY.name}
                            </div>
                        </div>

                        <div>
                            <span className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-[14px] font-bold">
                            {formatPrice(pricingData?.MONTHLY.price)}
                            </span>
                            <span className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-[14px] font-medium">/</span>
                            <span className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-[12px] font-medium">tháng</span>
                        </div>
                        </div>
                    </div>

                    <div
                        className={`hover:border-[#0ECB81] h-[55px] w-full py-[20px] px-[36px] border ${
                        selectedOption === 'YEARLY' ? 'border-[#0ECB81]' : 'border-fintown-br dark:border-fintown-br-light'
                        } rounded-lg flex items-center gap-[12px] mb-[32px] cursor-pointer`}
                        onClick={() => handleOptionClick('YEARLY')}
                    >
                        <div className="w-[446px] flex items-center justify-between">
                        <div className="flex items-center">
                            <div
                            className={`w-[15px] h-[15px] rounded-full border ${
                                selectedOption === 'YEARLY' ? 'bg-[#25B770] border-[#25B770]' : 'border-[#25B770]'
                            } mr-[10px]`}
                            />
                            <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-[14px] font-medium">
                            {pricingData?.YEARLY.name}
                            </div>
                        </div>

                        <div>
                            <span className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-[14px] font-bold">
                            {formatPrice(pricingData?.YEARLY.originalPrice)}
                            </span>
                            <span className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-[14px] font-medium">/</span>
                            <span className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-[12px] font-medium">năm</span>
                        </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button
                        className="w-full h-[55px] py-[19px] bg-[#25B770] rounded-lg flex justify-center items-center"
                        onClick={handleSubscribeClick}
                    >
                        <div className="text-[#EAECEF] text-[14px] font-semibold">Đăng ký nâng cấp gói ngay</div>
                    </button>

                    <Link ref={monthlyLinkRef} href={`/payment/${pricingData?.MONTHLY?.programId}`} style={{ display: "none" }}>
                        Monthly Plan
                    </Link>
                    <Link ref={yearlyLinkRef} href={`/payment/${pricingData?.YEARLY?.programId}`} style={{ display: "none" }}>
                        Yearly Plan
                    </Link>
                    </div>
                </div>
            }

        </div>
    );
}
