import UpsideRangerSlider from "./UpsideRangeSlider"
import { useAppSelector } from '@/src/redux/hooks/useAppStore';
import { selectSelectedButton } from '@/src/redux/ValuetionPage/valuetionPageSlice';
import { selectValuationResultData, selectValuationResultLoading } from '@/src/redux/ValuationResult';
import { selectProfileSummaryClosePrice } from '@/src/redux/ProfileSummary';
import { SpinerLoader } from "../../common/Loader";
import { upsideCalculator } from "@/src/utils/upsideCalculator";
import { getPotentialClass } from "@/src/utils/getPotentialClass";
import { evaluateUpside } from "@/src/utils/evaluateUpside";

export default function ValuationResult() {
    const selectButton = useAppSelector(selectSelectedButton);
    const valuationResultData = useAppSelector(selectValuationResultData);
    const selectPrice = useAppSelector(selectProfileSummaryClosePrice) ?? 0;
    const valuationResultLoading = useAppSelector(selectValuationResultLoading);
    
    // Tính toán giá cuối cùng dựa trên tỷ lệ tăng trưởng nếu selectButton > 4
    const result = valuationResultData
    ? upsideCalculator(selectButton, valuationResultData, selectPrice)
    : { upside: 0, adjustedPrice: 0 };
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
                <span className={`ml-[5px] ${getPotentialClass(upside)}`}>
                    {upside.toFixed(2)}%
                </span>{`
                    ${evaluateUpside(upside)}`
                }
            </div>
        </>
    );
}
