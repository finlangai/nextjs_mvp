export interface PriceStock {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export interface PriceStockNoVolume {
    time: number;
    price: number;
}

export interface TimeRange {
    label: string;
    interval: string;
    start: number;
    end: number;
    limit: number;
}