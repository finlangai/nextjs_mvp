export interface Value {
    period: string;
    year: number;
    quarter: number;
    value: string | null;
}

export interface FinancialStatement {
    id: number;
    level: number;
    parent_id: number;
    name: string;
    expanded: boolean;
    values: Value[];
}

export interface FinancialStatementWithChildren extends FinancialStatement {
    children: FinancialStatementWithChildren[];
}
