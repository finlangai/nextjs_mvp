import SegmentedControl from "../../common/SegmentedControl";
import SelectTableOrChart from "../../common/SelectTableOrChart"
import FreeCashFlowGrowthRateChart from "../../charts/forecasting/FreeCashFlowGrowthRateChart";
import AssetGrowthRateChart from "../../charts/forecasting/AssetGrowthRateChart";
import EquityGrowthRateChart from "../../charts/forecasting/EquityGrowthRateChart";
import ReturnOnAssetsGrowthRateChart from "../../charts/forecasting/ReturnOnAssetsGrowthRateChart";

export default function AssetsAndEquity(){
    return (
        <>
            < SegmentedControl/>

            <div className="px-[40px]">
                <div className="text-fintown-txt-1 font-bold text-[40px] mb-[36px]">
                    Tỷ lệ tăng trưởng tài sản
                </div>

                <div className="flex items-center w-full justify-between">
                    <div className="text-fintown-txt-1 font-bold text text-[20px] mb-[36px]">
                        Dự báo 5 năm tiếp theo
                    </div>

                    <div className="flex items-center gap-x-[28px]">
                        <div className="flex gap-x-[5px] items-center">
                            <div className="h-[9px] w-[9px] rounded-[50%] bg-fintown-pr9"></div>
                            <div className="text-fintown-txt-1 text-[14px]">
                                Tỷ lệ tăng trưởng tài sản
                            </div>
                        </div>

                        < SelectTableOrChart symbol="VNM" year={2020} quarter={4} />

                    </div>
                </div>

                <div className="mb-[64px]">
                    < AssetGrowthRateChart />
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
                    Tỷ lệ tăng trưởng vốn chủ sở hữu
                </div>

                <div className="flex items-center w-full justify-between">
                    <div className="text-fintown-txt-1 font-bold text text-[20px] mb-[36px]">
                        Dự báo 5 năm tiếp theo
                    </div>

                    <div className="flex items-center gap-x-[28px]">
                        <div className="flex gap-x-[5px] items-center">
                            <div className="h-[9px] w-[9px] rounded-[50%] bg-fintown-pr9"></div>
                            <div className="text-fintown-txt-1 text-[14px]">
                                Tỷ lệ tăng trưởng vốn chủ sở hữu
                            </div>
                        </div>

                        < SelectTableOrChart symbol="VNM" year={2020} quarter={4} />

                    </div>
                </div>

                <div className="mb-[64px]">
                    < EquityGrowthRateChart />
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
                    Tỷ lệ tăng trưởng ROA
                </div>

                <div className="flex items-center w-full justify-between">
                    <div className="text-fintown-txt-1 font-bold text text-[20px] mb-[36px]">
                        Dự báo 5 năm tiếp theo
                    </div>

                    <div className="flex items-center gap-x-[28px]">
                        <div className="flex gap-x-[5px] items-center">
                            <div className="h-[9px] w-[9px] rounded-[50%] bg-fintown-pr9"></div>
                            <div className="text-fintown-txt-1 text-[14px]">
                                Tỷ lệ tăng trưởng ROA
                            </div>
                        </div>

                        < SelectTableOrChart symbol="VNM" year={2020} quarter={4} />

                    </div>
                </div>

                <div className="mb-[64px]">
                    < ReturnOnAssetsGrowthRateChart />
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