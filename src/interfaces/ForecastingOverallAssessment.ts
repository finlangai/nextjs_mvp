export interface Group {
    index: number;
    name: string;
    status: string;
}

export interface Criteria {
    insight: string;
    status: string;
    group: Group[];
    name: string;
}

export interface Criterias {
    [key: string]: Criteria; 
}

export interface ForecastingOverallAssessment {
    overall: string;
    criterias: Criterias;
}