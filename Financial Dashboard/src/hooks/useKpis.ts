import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { type KpiData } from '../types/api';
import { CanceledError } from 'axios';

export const useKpis = () => {
    const [kpis, setKpis] = useState<KpiData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchKpis = useCallback(async () => { // signal?
        // simple refetch without abortion logic for manual trigger or use simple logic
        setLoading(true);
        try {
            const response = await api.get<KpiData[]>('/metrics/kpis');
            setKpis(response.data);
            setError(null);
        } catch (err) {
            if (err instanceof CanceledError) return;
            setError('Failed to fetch KPI data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchKpis();
    }, [fetchKpis]);

    return { kpis, loading, error, refetch: fetchKpis };
};
