export interface Comparison {
    rating: number; 
    trending: number; 
    dividend: number; 
    returns: number; 
    revenueProfit: number; 
    momentum: number; 
}

export interface Company {
    symbol: string; 
    comparison: Comparison; 
    logo: string; 
}

export type CompanyList = Company[];
  