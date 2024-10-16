export interface HistoricalData {
    year: number;
    value: number;
}

export interface ForecastData {
    year: number;
    value: number;
}

export interface Metric {
    name: string;
    isPercentage: boolean;
    unit: string | null;
    historical: HistoricalData[];
    forecast: ForecastData[];
}

export interface ForecastingCriteria {
    assessment: string;
    status: string;
    metrics: Metric[];
    title: string;
}