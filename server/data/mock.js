// Mock Data Store

let kpiData = [
    { title: "Total Revenue", value: "$54,230.00", trend: 12.5, trendLabel: "vs last month", color: "emerald" },
    { title: "Total Expenses", value: "$12,450.00", trend: -2.4, trendLabel: "vs last month", color: "slate" },
    { title: "Net Profit", value: "$41,780.00", trend: 8.2, trendLabel: "vs last month", color: "indigo" },
    { title: "Active Budget", value: "$82,000.00", trend: 0.8, trendLabel: "remaining", color: "blue" }
];

const trendsData = [
    { name: 'Jan', revenue: 4000, expenses: 2400 },
    { name: 'Feb', revenue: 3000, expenses: 1398 },
    { name: 'Mar', revenue: 2000, expenses: 9800 },
    { name: 'Apr', revenue: 2780, expenses: 3908 },
    { name: 'May', revenue: 1890, expenses: 4800 },
    { name: 'Jun', revenue: 2390, expenses: 3800 },
    { name: 'Jul', revenue: 3490, expenses: 4300 },
];

const cashflowData = {
    inflow: "+$24,500",
    outflow: "-$12,200",
    percentage: 65,
    label: "Free Cash Flow"
};

const transactionsData = [
    { id: 1, name: 'Tech Solutions Inc', date: '2024-03-10', amount: '+ $12,500.00', status: 'Completed', type: 'income' },
    { id: 2, name: 'Office Supplies Ltd', date: '2024-03-09', amount: '- $450.00', status: 'Completed', type: 'expense' },
    { id: 3, name: 'Server Hosting', date: '2024-03-08', amount: '- $1,200.00', status: 'Pending', type: 'expense' },
    { id: 4, name: 'Consulting Client A', date: '2024-03-08', amount: '+ $5,000.00', status: 'Completed', type: 'income' },
    { id: 5, name: 'Software License', date: '2024-03-07', amount: '- $299.00', status: 'Completed', type: 'expense' },
];

const webhookEvents = [];

module.exports = {
    kpiData,
    trendsData,
    cashflowData,
    transactionsData,
    webhookEvents
};
