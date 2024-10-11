export interface CompanyDescription {
    summary: {
        overview: string [] | null;
        historyDev: string [] | null;
        companyPromise: string[] | null;
        businessRisk: string [] | null;
        keyDevelopments: string[] | null;
    };
    fundamental: {
        sic: string;
        icbCode: string;
        internationName: string;
        headQuarters: string;
        phone: string;
        fax: string;
        email: string;
        taxIdNumber: string;
        employees: number;
        charterCapital: number
    };
    listingInfo: {
        exchange: string;
        dateOfListing: string;
        initialListingPrice: number;
        dateOfIssue: string;
        listingVolume: number
    }
}