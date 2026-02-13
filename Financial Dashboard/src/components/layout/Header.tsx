import { Bell, Search } from 'lucide-react';

export function Header() {
    return (
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-semibold text-slate-800">Financial Overview</h1>
            </div>
            <div className="flex items-center gap-6">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="h-9 w-64 rounded-md border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                </div>
                <button className="relative rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                </button>
            </div>
        </header>
    );
}
