import { ArrowDownRight, ArrowUpRight, type LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface KpiCardProps {
    title: string;
    value: string;
    trend: number;
    trendLabel: string;
    icon: LucideIcon;
    color?: 'emerald' | 'blue' | 'indigo' | 'slate';
}

export function KpiCard({ title, value, trend, trendLabel, icon: Icon, color = 'emerald' }: KpiCardProps) {
    const isPositive = trend >= 0;

    const colorStyles = {
        emerald: 'bg-emerald-500/10 text-emerald-600',
        blue: 'bg-blue-500/10 text-blue-600',
        indigo: 'bg-indigo-500/10 text-indigo-600',
        slate: 'bg-slate-500/10 text-slate-600',
    };

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">{title}</p>
                    <h3 className="mt-2 text-3xl font-bold text-slate-900">{value}</h3>
                </div>
                <div className={cn("rounded-lg p-3", colorStyles[color])}>
                    <Icon className="h-6 w-6" />
                </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
                <span
                    className={cn(
                        "flex items-center text-sm font-medium",
                        isPositive ? "text-emerald-600" : "text-red-600"
                    )}
                >
                    {isPositive ? <ArrowUpRight className="mr-1 h-4 w-4" /> : <ArrowDownRight className="mr-1 h-4 w-4" />}
                    {Math.abs(trend)}%
                </span>
                <span className="text-sm text-slate-500">{trendLabel}</span>
            </div>
        </div>
    );
}
