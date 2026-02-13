import { Coins, CreditCard, DollarSign, Wallet } from 'lucide-react';
import { useEffect, lazy, Suspense } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { KpiCard } from '../components/dashboard/KpiCard';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { useKpis } from '../hooks/useKpis';
import { useCashflow } from '../hooks/useCashflow';
import { Skeleton } from '../components/ui/Skeleton';

// Lazy load FinancialCharts
const FinancialCharts = lazy(() => import('../components/dashboard/FinancialCharts').then(module => ({ default: module.FinancialCharts })));

export const Dashboard = () => {
    const { kpis, loading: kpisLoading, error: kpisError, refetch: refetchKpis } = useKpis();
    const { cashflow, loading: cashflowLoading, error: cashflowError, refetch: refetchCashflow } = useCashflow();

    const loading = kpisLoading || cashflowLoading;
    const error = kpisError || cashflowError;

    useEffect(() => {
        // SSE Connection
        const eventSource = new EventSource('http://localhost:5000/api/events');

        eventSource.onopen = () => {
            console.log('SSE connection opened');
        };

        eventSource.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            console.log('SSE Event:', parsedData);

            if (parsedData.type === 'dashboard_update') {
                console.log('Dashboard update received, refreshing data...');
                refetchKpis();
                refetchCashflow();
            }
        };

        eventSource.onerror = (error) => {
            console.error('SSE Error:', error);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [refetchKpis, refetchCashflow]);

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex h-screen items-center justify-center text-slate-500">
                    Loading dashboard...
                </div>
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout>
                <div className="flex h-screen items-center justify-center text-red-500">
                    {error}
                </div>
            </DashboardLayout>
        );
    }

    const getIcon = (title: string) => {
        switch (title) {
            case "Total Revenue": return DollarSign;
            case "Total Expenses": return CreditCard;
            case "Net Profit": return Coins;
            case "Active Budget": return Wallet;
            default: return DollarSign;
        }
    };

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900">Dashboard</h2>
                <p className="text-slate-500">Welcome back, get an overview of your financial health.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {kpis.map((kpi) => (
                    <KpiCard
                        key={kpi.title}
                        title={kpi.title}
                        value={kpi.value}
                        trend={kpi.trend}
                        trendLabel={kpi.trendLabel}
                        icon={getIcon(kpi.title)}
                        color={kpi.color}
                    />
                ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 h-full">
                    <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
                        <FinancialCharts />
                    </Suspense>
                </div>
                <div className="h-full">
                    {cashflow && (
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm h-full">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Cash Flow</h3>
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                    <span className="text-slate-600">Inflow</span>
                                    <span className="font-bold text-emerald-600">{cashflow.inflow}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                    <span className="text-slate-600">Outflow</span>
                                    <span className="font-bold text-red-600">{cashflow.outflow}</span>
                                </div>
                                <div className="mt-4 pt-4 border-t border-slate-100">
                                    <div className="flex items-center justify-center">
                                        <div className="relative h-32 w-32 rounded-full border-8 border-slate-100 border-t-emerald-500 flex items-center justify-center">
                                            <span className="font-bold text-xl text-slate-800">{cashflow.percentage}%</span>
                                        </div>
                                    </div>
                                    <p className="text-center text-sm text-slate-500 mt-2">{cashflow.label}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-6">
                <RecentTransactions />
            </div>
        </DashboardLayout>
    );
};
