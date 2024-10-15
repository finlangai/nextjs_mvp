
import { Criterias } from '@/src/interfaces/ForecastingOverallAssessment';

export interface SignalInterface {
    name: string;
    isPositive: boolean;
}

export interface finalStatusInterface {
    status: 'Rất tốt' | 'Tốt' | 'Xấu' | 'Rất xấu';
    value: number;
    color: string;
}

export function convertToSignals(criterias: Criterias): SignalInterface[] {
    if (criterias) {
        return Object.keys(criterias).map((key) => {
            const criteria = criterias[key];
            return {
                name: criteria.name,
                isPositive: criteria.status === "Tích cực"
            };
        }) 
    }
    return [];
};
  
export function finalStatus({ signals }: { signals: SignalInterface[] }) {
    if (signals) {
      const positiveSignals = signals.filter(signal => signal.isPositive).length;
      const negativeSignals = signals.length - positiveSignals;
  
      let status: 'Rất tốt' | 'Tốt' | 'Xấu' | 'Rất xấu';
      let value: number;
      let color: string;
  
      if (positiveSignals === signals.length) {
        status = 'Rất tốt';
        value = 90;
        color = 'rgb(138 71 255)';
      } else if (negativeSignals === signals.length) {
        status = 'Rất xấu';
        value = 10;
        color = 'rgb(255 0 0)';
      } else if (positiveSignals > negativeSignals) {
        status = 'Tốt';
        value = 60;
        color = '#00E396';
      } else {
        status = 'Xấu';
        value = 30;
        color = '#FF4560';
      }
  
      return {
        status,
        value,
        color
      };
    }
    return undefined;
}
  