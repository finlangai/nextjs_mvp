export interface Value {
    period: string;
    year: number;  
    quarter: number; 
    value: number;  
}
  
export interface FinancialMetric {
    name: string; 
    unit: string | null; 
    isPercentage: boolean; 
    description: string;
    values: Value[]; 
}
  