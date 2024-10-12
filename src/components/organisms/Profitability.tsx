import SelectTableOrChart from "../common/SelectTableOrChart"
import ROIChart from "../charts/ROIChart"
import MarginalProfitChart from "../charts/MarginalProfitChart";
import EPSChart from "../charts/EPSChart";

interface ChartData {
    year: number;
    roce: number;
    roa: number;
    roe: number;
  }
  

// Dữ liệu mẫu
export const sampleHistoricalData: ChartData[] = [
    { year: 2019, roce: 10, roa: 8, roe: 12 },
    { year: 2020, roce: 11, roa: 9, roe: 13 },
    { year: 2021, roce: 12, roa: 9.5, roe: 14 },
    { year: 2022, roce: 13, roa: 10, roe: 15 },
    { year: 2023, roce: 14, roa: 10.5, roe: 16 },
  ];
  
  export const sampleForecastData: ChartData[] = [
    { year: 2024, roce: 15, roa: 11, roe: 17 },
    { year: 2025, roce: 16, roa: 11.5, roe: 18 },
    { year: 2026, roce: 17, roa: 12, roe: 19 },
    { year: 2027, roce: 18, roa: 12.5, roe: 20 },
    { year: 2028, roce: 19, roa: 13, roe: 21 },
  ];

export default function Profitability(){
    return (
        <>
        <div className="px-[40px]">
            <div className="text-fintown-txt-1 font-bold text-[40px] mb-[36px]">
                Hiệu quả sinh lời trên vốn
            </div>
            
            <div className="flex items-center w-full justify-between">
                <div className="text-fintown-txt-1 font-bold text text-[20px] mb-[36px]">
                    Dự báo 5 năm tiếp theo
                </div>

                <div className="flex items-center gap-x-[28px]">
                    {/* <div className="flex gap-x-[5px] items-center">
                        <div className="h-[9px] w-[9px] rounded-[50%] bg-fintown-chart-1"></div>
                        <div className="text-fintown-txt-1 text-[14px]">
                            ROA
                        </div>
                    </div> */}

                    <div className="flex gap-x-[5px] items-center">
                        <div className="h-[9px] w-[9px] rounded-[50%] bg-fintown-pr9"></div>
                        <div className="text-fintown-txt-1 text-[14px]">
                            ROE
                        </div>
                    </div>

                    <div className="flex gap-x-[5px] items-center">
                        <div className="h-[9px] w-[9px] rounded-[50%] bg-white"></div>
                        <div className="text-fintown-txt-1 text-[14px]">
                            ROCE
                        </div>
                    </div>

                    < SelectTableOrChart symbol="VNM" year={2020} quarter={4}/>

                </div>
            </div>

            <div className="mb-[64px]">
                < ROIChart historicalData={sampleHistoricalData} forecastData={sampleForecastData}/>
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
                Lợi nhuận biên
            </div>
            
            <div className="flex items-center w-full justify-between">
                <div className="text-fintown-txt-1 font-bold text text-[20px] mb-[36px]">
                    Dự báo 5 năm tiếp theo
                </div>

                <div className="flex items-center gap-x-[28px]">
                    <div className="flex gap-x-[5px] items-center">
                        <div className="h-[9px] w-[9px] rounded-[50%] bg-fintown-pr9"></div>
                        <div className="text-fintown-txt-1 text-[14px]">
                            Biên lợi nhuận gộp
                        </div>
                    </div>

                    <div className="flex gap-x-[5px] items-center">
                        <div className="h-[9px] w-[9px] rounded-[50%] bg-white"></div>
                        <div className="text-fintown-txt-1 text-[14px]">
                            Biên lợi nhuận ròng
                        </div>
                    </div>

                    < SelectTableOrChart symbol="VNM" year={2020} quarter={4}/>

                </div>
            </div>

            <div className="mb-[64px]">
                < MarginalProfitChart/>
            </div>

            <div className="px-[24px] py-[24px] rounded-[10px] border border-fintown-br">
                <div className="flex items-center gap-x-[14px] mb-[20px]">
                    <div className="text-[16px] text-fintown-txt-1 font-[600]">
                        Phân tích dự báo 
                    </div>
                    <div className="text-[12px] text-fintown-stt-buy py-[4px] font-bold px-[12px] rounded bg-[#0ecb5429]">
                        Tích cực
                    </div>
                </div>

                <div className="text-fintown-txt-1 text-[14px]">
                Biên lợi nhuận gộp của công ty VNM đã trải qua nhiều biến động trong giai đoạn 2013-2023. Trong giai đoạn này, biên lợi nhuận gộp đã tăng từ 36,13% năm 2013 lên 47,73% năm 2016, sau đó giảm nhẹ xuống 46,39% năm 2020 và tiếp tục giảm xuống 39,86% năm 2022. Tuy nhiên, năm 2023, biên lợi nhuận gộp đã tăng nhẹ lên 40,66%.
                Dự đoán cho giai đoạn 2024-2028 cho thấy biên lợi nhuận gộp sẽ tăng liên tục, từ 45,69% năm 2024 lên 47,75% năm 2028. Điều này cho thấy một xu hướng tăng trưởng tích cực trong biên lợi nhuận gộp của công ty VNM trong giai đoạn tới.
                </div>
            </div>
        </div>

        <div className="px-[40px] mb-[40px]">
            <div className="text-fintown-txt-1 font-bold text-[40px] mb-[36px]">
                EPS (Lợi nhuận trên một cổ phiếu)
            </div>
            
            <div className="flex items-center w-full justify-between">
                <div className="text-fintown-txt-1 font-bold text text-[20px] mb-[36px]">
                    Dự báo 5 năm tiếp theo
                </div>

                <div className="flex items-center gap-x-[28px]">
                    <div className="flex gap-x-[5px] items-center">
                        <div className="h-[9px] w-[9px] rounded-[50%] bg-fintown-pr9"></div>
                        <div className="text-fintown-txt-1 text-[14px]">
                           EPS
                        </div>
                    </div>

                    < SelectTableOrChart symbol="VNM" year={2020} quarter={4}/>

                </div>
            </div>

            <div className="mb-[64px]">
                < EPSChart/>
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