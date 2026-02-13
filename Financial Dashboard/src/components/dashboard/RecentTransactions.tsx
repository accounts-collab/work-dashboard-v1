import { MoreHorizontal } from 'lucide-react';
import { useTransactions } from '../../hooks/useTransactions';
import { Skeleton } from '../ui/Skeleton';
import { ErrorFallback } from '../ui/ErrorFallback';

export function RecentTransactions() {
    const { transactions, loading, error } = useTransactions();

    if (loading) {
        return <Skeleton className="h-[400px] w-full" />;
    }

    if (error) {
        return <ErrorFallback message={error} />;
    }

    return (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                <h3 className="text-lg font-bold text-slate-900">Recent Transactions</h3>
                <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">View All</button>
            </div>
            <div className="p-0">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            <th className="px-6 py-3">Transaction</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3 text-right">Amount</th>
                            <th className="px-6 py-3 text-right">Status</th>
                            <th className="px-6 py-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {transactions.map((t) => (
                            <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-medium text-slate-900 block">{t.name}</span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500">{t.date}</td>
                                <td className={`px-6 py-4 text-right font-medium ${t.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                                    {t.amount}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${t.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                                        }`}>
                                        {t.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-slate-600">
                                        <MoreHorizontal className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
