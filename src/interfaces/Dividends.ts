export interface Legend {
    year: number;
    value: number;
}

export interface DividendRecord  {
    title: string;
    type: number; 
    recordDate: string;
    executionDate: string | null; 
}

export interface DividendData {
    cashLegend: Legend[];
    stockLegend: Legend[];
    records: DividendRecord [];
}
