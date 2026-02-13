import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { type CashflowData } from '../types/api';
import { CanceledError } from 'axios';

export const useCashflow = () => {
    const [cashflow, setCashflow] = useState<CashflowData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCashflow = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get<CashflowData>('/metrics/cashflow');
            setCashflow(response.data);
            setError(null);
        } catch (err) {
            if (err instanceof CanceledError) return;
            setError('Failed to fetch cashflow data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCashflow();
    }, [fetchCashflow]);

    return { cashflow, loading, error, refetch: fetchCashflow };
};
