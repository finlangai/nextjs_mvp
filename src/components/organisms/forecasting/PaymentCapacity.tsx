import SegmentedControl from "../../common/SegmentedControl";
import SelectTableOrChart from "../../common/SelectTableOrChart"
import LiquidityRatioChart from "../../charts/forecasting/LiquidityRatioChart";
import InterestCoverageRatioChart from "../../charts/forecasting/InterestCoverageRatioChart";
import DebtToAssetsRatioChart from "../../charts/forecasting/DebtToAssetsRatioChart";

export default function PaymentCapacity(){
    return (
        <>
            < SegmentedControl/>

            <div className="px-[40px]">
                <div className="text-fintown-txt-1 font-bold text-[40px] mb-[36px]">
                    Tỷ lệ thanh khoản
                </div>

                <div className="flex items-center w-full justify-between">
                    <div className="text-fintown-txt-1 font-bold text text-[20px] mb-[36px]">
                        Dự báo 5 năm tiếp theo
                    </div>

                    <div className="flex items-center gap-x-[28px]">
                        <div className="flex gap-x-[5px] items-center">
                            <div className="h-[9px] w-[9px] rounded-[50%] bg-fintown-chart-1"></div>
                            <div className="text-fintown-txt-1 text-[14px]">
                                Tỷ lệ hiện tại
                            </div>
                        </div>

                        <div className="flex gap-x-[5px] items-center">
                            <div className="h-[9px] w-[9px] rounded-[50%] bg-fintown-pr9"></div>
                            <div className="text-fintown-txt-1 text-[14px]">
                                Tỷ lệ thanh toán nhanh
                            </div>
                        </div>

                        <div className="flex gap-x-[5px] items-center">
                            <div className="h-[9px] w-[9px] rounded-[50%] bg-white"></div>
                            <div className="text-fintown-txt-1 text-[14px]">
                                Tỷ lệ tiền mặt
                            </div>
                        </div>

                        < SelectTableOrChart symbol="VNM" year={2020} quarter={4} />

                    </div>
                </div>

                <div className="mb-[64px]">
                    < LiquidityRatioChart />
                </div>

                <div className="px-[24px] py-[24px] rounded-[10px] border border-fintown-br">
                    <div className="flex items-center gap-x-[14px] mb-[20px]">
                        <div className="text-[16px] text-fintown-txt-1 font-[600]">
                            Phân tích dự báo
                        </div>
                        <div className="text-[12px] text-fintown-stt-sell py-[4px] font-bold px-[12px] rounded bg-[#cb0e0e29]">
                            Tiêu cực
                        </div>
                    </div>

                    <div className="text-fintown-txt-1 text-[14px]">
                        Tỷ lệ lợi nhuận trên vốn chủ sở hữu (ROE) của công ty VNM đã giảm dần từ năm 2017 đến năm 2023, từ 43,05% xuống 25,75%. Dự đoán cho 5 năm tới cho thấy ROE sẽ tiếp tục giảm, xuống còn 23,30% vào năm 2028.

                        Tương tự, tỷ suất lợi nhuận trên vốn được sử dụng (ROCE) cũng giảm dần từ năm 2017 đến năm 2023, từ 49,85% xuống 29,87%. Dự đoán cho 5 năm tới cho thấy ROCE sẽ tăng nhẹ lên 32,38% vào năm 2024, sau đó giảm dần xuống còn 26,91% vào năm 2028.

                        Tổng thể, hiệu quả sinh lời dựa trên vốn của công ty VNM đã giảm dần trong những năm gần đây và dự kiến sẽ tiếp tục giảm trong tương lai.
                    </div>
                </div>
            </div>

            <div className="px-[40px]">
                <div className="text-fintown-txt-1 font-bold text-[40px] mb-[36px]">
                    Tỷ số thanh toán lãi vay
                </div>

                <div className="flex items-center w-full justify-between">
                    <div className="text-fintown-txt-1 font-bold text text-[20px] mb-[36px]">
                        Dự báo 5 năm tiếp theo
                    </div>

                    <div className="flex items-center gap-x-[28px]">
                        <div className="flex gap-x-[5px] items-center">
                            <div className="h-[9px] w-[9px] rounded-[50%] bg-fintown-pr9"></div>
                            <div className="text-fintown-txt-1 text-[14px]">
                                Tỷ số thanh toán lãi vay
                            </div>
                        </div>

                        < SelectTableOrChart symbol="VNM" year={2020} quarter={4} />

                    </div>
                </div>

                <div className="mb-[64px]">
                    < InterestCoverageRatioChart />
                </div>

                <div className="px-[24px] py-[24px] rounded-[10px] border border-fintown-br">
                    <div className="flex items-center gap-x-[14px] mb-[20px]">
                        <div className="text-[16px] text-fintown-txt-1 font-[600]">
                            Phân tích dự báo
                        </div>
                        <div className="text-[12px] text-fintown-stt-sell py-[4px] font-bold px-[12px] rounded bg-[#cb0e0e29]">
                            Tiêu cực
                        </div>
                    </div>

                    <div className="text-fintown-txt-1 text-[14px]">
                        Lợi nhuận trên mỗi cổ phiếu của công ty VNM đã trải qua nhiều biến động trong giai đoạn 2013-2023. Năm 2013, lợi nhuận trên mỗi cổ phiếu đạt mức cao nhất là 7835.076328. Sau đó, lợi nhuận giảm dần trong các năm 2014-2016, nhưng tăng trở lại vào năm 2017. Tuy nhiên, lợi nhuận tiếp tục giảm trong giai đoạn 2018-2022, với mức thấp nhất là 4104.190518 vào năm 2022. Năm 2023, lợi nhuận tăng nhẹ lên 4315.572462.

                        Dự đoán cho giai đoạn 2024-2028 cho thấy lợi nhuận trên mỗi cổ phiếu sẽ tiếp tục giảm, với mức giảm dần đều qua các năm. Năm 2024, lợi nhuận dự kiến là 4095.389801, giảm xuống còn 2904.085176 vào năm 2028.
                    </div>
                </div>
            </div>

            <div className="px-[40px]">
                <div className="text-fintown-txt-1 font-bold text-[40px] mb-[36px]">
                    Tỷ số nợ trên tài sản
                </div>

                <div className="flex items-center w-full justify-between">
                    <div className="text-fintown-txt-1 font-bold text text-[20px] mb-[36px]">
                        Dự báo 5 năm tiếp theo
                    </div>

                    <div className="flex items-center gap-x-[28px]">
                        <div className="flex gap-x-[5px] items-center">
                            <div className="h-[9px] w-[9px] rounded-[50%] bg-fintown-pr9"></div>
                            <div className="text-fintown-txt-1 text-[14px]">
                                Tỷ số nợ trên tài sản
                            </div>
                        </div>

                        < SelectTableOrChart symbol="VNM" year={2020} quarter={4} />

                    </div>
                </div>

                <div className="mb-[64px]">
                    < DebtToAssetsRatioChart />
                </div>

                <div className="px-[24px] py-[24px] rounded-[10px] border border-fintown-br">
                    <div className="flex items-center gap-x-[14px] mb-[20px]">
                        <div className="text-[16px] text-fintown-txt-1 font-[600]">
                            Phân tích dự báo
                        </div>
                        <div className="text-[12px] text-fintown-stt-sell py-[4px] font-bold px-[12px] rounded bg-[#cb0e0e29]">
                            Tiêu cực
                        </div>
                    </div>

                    <div className="text-fintown-txt-1 text-[14px]">
                        Lợi nhuận trên mỗi cổ phiếu của công ty VNM đã trải qua nhiều biến động trong giai đoạn 2013-2023. Năm 2013, lợi nhuận trên mỗi cổ phiếu đạt mức cao nhất là 7835.076328. Sau đó, lợi nhuận giảm dần trong các năm 2014-2016, nhưng tăng trở lại vào năm 2017. Tuy nhiên, lợi nhuận tiếp tục giảm trong giai đoạn 2018-2022, với mức thấp nhất là 4104.190518 vào năm 2022. Năm 2023, lợi nhuận tăng nhẹ lên 4315.572462.

                        Dự đoán cho giai đoạn 2024-2028 cho thấy lợi nhuận trên mỗi cổ phiếu sẽ tiếp tục giảm, với mức giảm dần đều qua các năm. Năm 2024, lợi nhuận dự kiến là 4095.389801, giảm xuống còn 2904.085176 vào năm 2028.
                    </div>
                </div>
            </div>
        </>
    )
}