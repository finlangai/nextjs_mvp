import UpsideRangerSlider from "./UpsideRangeSlider"
import { useAppSelector } from '@/src/redux/hooks/useAppStore';
import { selectSelectedButton } from '@/src/redux/ValuetionPage/valuetionPageSlice';
import { selectValuationResultData, selectValuationResultLoading } from '@/src/redux/ValuationResult';
import { selectProfileSummaryClosePrice } from '@/src/redux/ProfileSummary';
import { SpinerLoader } from "../../common/Loader";
import { upsideCalculator } from "@/src/utils/upsideCalculator";

export default function ValuationResult() {
    const selectButton = useAppSelector(selectSelectedButton);
    const valuationResultData = useAppSelector(selectValuationResultData);
    const selectPrice = useAppSelector(selectProfileSummaryClosePrice) ?? 0;
    const valuationResultLoading = useAppSelector(selectValuationResultLoading);

    const result = valuationResultData
    ? upsideCalculator(selectButton, valuationResultData, selectPrice)
    : { upside: 0, adjustedPrice: 0 };
    // Tính toán giá cuối cùng dựa trên tỷ lệ tăng trưởng nếu selectButton > 4
    const adjustedPrice = result.adjustedPrice;
    // Tính toán upside
    const upside = result.upside;

    if (valuationResultLoading) {
        return (
            <>
                <div className="flex justify-center items-center h-[300px]">
                    < SpinerLoader />
                </div>
            </>
        )
    }

    return (
        <>
            <div className="flex items-end pb-[20px] border-b border-b-fintown-br">
                <div className="font-bold text-[36px] text-fintown-txt-1 mr-[10px] leading-none">
                    {
                        (selectButton > 4) && (
                            adjustedPrice.toLocaleString('en-US')
                        )
                    }
                    {
                        (selectButton < 5) && (
                            valuationResultData?.valuationResult?.toLocaleString('en-US')
                        )
                    }
                </div>
                <div className="text-[12px] text-fintown-txt-2 pb-[2px]">
                    VNĐ/cổ phiếu
                </div>
            </div>

            <div className={`pb-[10px] mb-[20px] border-b border-b-fintown-br mt-[20px]`}>
                <UpsideRangerSlider value={upside} />
            </div>

            <div
                className={`
                text-[14px] text-fintown-txt-2 text-justify overflow-hidden
                `}
            >
                Tỷ lệ sinh lợi tiềm năng sau khi định giá là
                <span className={`ml-[5px] ${upside < 0 ? 'text-red-500' :
                    upside === 0 ? 'text-slate-400' :
                        upside <= 10 ? 'text-orange-500' :
                            upside <= 25 ? 'text-yellow-500' :
                                upside < 50 ? 'text-green-500' :
                                    'text-purple-500'}`}>
                    {upside.toFixed(2)}%
                </span>{`
                    ${upside < 0 ? ', với kết quả âm bạn không nên nghĩ đến cổ phiếu này nữa. Việc có lợi nhuận từ những cổ phiếu có giá trị sinh lợi âm thật sự mong manh như mẫu giấy.' :
                    upside === 0 ? ', như vậy giá cổ phiếu hiện tại đã phản ánh chính xác giá trị thực tế, bạn không nên đầu tư lúc này vì khả năng sẽ không đem lại thu hoạch.' :
                    upside <= 5 ? ', bạn đang đứng trước khả năng có thể thu được lợi nhuận với cổ phiếu này. Tuy nhiên cần cân nhắc mức độ lợi nhuận có xứng đáng với chi phí thời gian bạn dành cho cổ phiếu này không.' :
                    upside <= 10 ? ', đây là mức sinh lời có thể xem là đạt ngưỡng trung bình phổ biến. Tuy nhiên nên cân nhắc chi phí thời gian trong lúc đợi chờ thu hoạch.' :
                    upside <= 25 ? ', mức sinh lời này được coi là khá tốt khi vượt qua ngưỡng sinh lợi trung bình phổ biến. Có thể cân nhắc đưa cổ phiếu này vào chiến lược đầu tư của bạn.' :
                    upside < 50 ? ', mức sinh lợi này thật sự không tồi, ở ngưỡng này bạn ít nhất đã cách được ba bậc thang so với việc thua lỗ. Chừa một chỗ cho cổ phiếu này trong danh mục sẽ không uổng phí.' :
                    '. Rất tuyệt vời, bạn sẽ đạt được ít nhất 50% lợi nhuận từ việc đầu tư, đây là một mức lợi nhuận mơ ước với bất kỳ ai.'}`
                }
            </div>
        </>
    );
}
