import PredictiveIndicatorCard from '@/src/components/organisms/PredictiveIndicatorCard';
import PredictedClaimCard from '@/src/components/organisms/PredictedClaimCard';

export default function OverallAssessment() {
    return (
        <>
            <div className="overflow-hidden">
                < PredictiveIndicatorCard/>
            </div>

            <div className='pl-[40px] text-[24px] font-bold text-fintown-txt-1 mb-[32px]'>
                Luận điểm
            </div>

            <div className="overflow-hidden">
                < PredictedClaimCard />
            </div>
        </>
    )
}