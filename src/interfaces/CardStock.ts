export interface quotes {
  time: number;
  price: number;
}

export interface CardStock {
    symbol: string;
    logo: string;
    companyName: string;
    delta: number;
    exchange: string;
    quotes: quotes[];
    price: number;
  }
  