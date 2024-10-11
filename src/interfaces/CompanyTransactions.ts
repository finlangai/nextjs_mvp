export interface companyTransactions {
    ownership: number;
    volumeBeforeTransaction: number;
    volumeAfterTransaction: number;
    transactioner: {
        name: string;
        position: string
    };
    related: {
        name: string;
        position: string;
    };
    plan: {
        buyVolume: number;
        sellVolume: number;
        beginDate: number;
        endDate: number
    };
    result: {
        buyVolume: number;
        sellVolume: number;
        executionDate: number
    }
}