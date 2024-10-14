import PredictiveIndicatorCard from '@/src/components/organisms/forecasting/PredictiveIndicatorCard';
import PredictedClaimCard from '@/src/components/organisms/forecasting/PredictedClaimCard';

export default function OverallAssessment() {
    return (
        <>
            <div className="overflow-hidden">
                < PredictiveIndicatorCard/>
            </div>

            <div className='pl-[40px] text-[40px] font-bold text-fintown-txt-1 mb-[32px]'>
                Luận điểm
            </div>

            <div className="overflow-hidden">
                < PredictedClaimCard />
            </div>
        </>
    )
}