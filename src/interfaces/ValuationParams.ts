export interface FcfForecasts { 
    year: number;
    free_cash_flow: number;
}

export interface ValuationParams {
    earnings_per_share: number,
    price_to_earnings: number,
    earnings_per_share_growth_rate: number,
    book_value_per_share: number,
    price_to_book: number,
    r: number,
    D1: number,
    bonds_yield: number,
    fcf_forecasts: FcfForecasts[]
}