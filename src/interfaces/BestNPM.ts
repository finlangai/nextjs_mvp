export interface HistoricalData {
    year: number;
    net_profit: number;
    revenue: number;
    npm: number;
}

export interface BestNPMData {
    symbol: string;
    company_name: string;
    logo: string;
    exchange: string;
    assessment: string;
    historical: HistoricalData[];
    netProfit: number;
}
