export interface KpiData {
    title: string;
    value: string;
    trend: number;
    trendLabel: string;
    color: 'emerald' | 'blue' | 'indigo' | 'slate';
}

export interface TrendData {
    name: string;
    revenue: number;
    expenses: number;
}

export interface CashflowData {
    inflow: string;
    outflow: string;
    percentage: number;
    label: string;
}

export interface Transaction {
    id: number;
    name: string;
    date: string;
    amount: string;
    status: 'Completed' | 'Pending';
    type: 'income' | 'expense';
}
