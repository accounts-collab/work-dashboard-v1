import { BarChart3, Home, PieChart, Settings, Wallet } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useState } from 'react';

const navigation = [
    { name: 'Dashboard', icon: Home, href: '#', current: true },
    { name: 'Analytics', icon: BarChart3, href: '#', current: false },
    { name: 'Reports', icon: PieChart, href: '#', current: false },
    { name: 'Transactions', icon: Wallet, href: '#', current: false },
    { name: 'Settings', icon: Settings, href: '#', current: false },
];

export function Sidebar() {
    const [active, setActive] = useState('Dashboard');

    return (
        <div className="flex h-screen w-64 flex-col bg-slate-900 text-white">
            <div className="flex h-16 items-center px-6">
                <span className="text-xl font-bold text-emerald-400">FinDash</span>
            </div>
            <div className="flex flex-1 flex-col gap-1 px-3 py-4">
                {navigation.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => setActive(item.name)}
                        className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                            active === item.name
                                ? 'bg-slate-800 text-emerald-400'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                    </button>
                ))}
            </div>
            <div className="border-t border-slate-800 p-4">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold">
                        JD
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">John Doe</span>
                        <span className="text-xs text-slate-500">Finance Manager</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
