import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { type TrendData } from '../types/api';
import { CanceledError } from 'axios';

export const useTrends = () => {
    const [trends, setTrends] = useState<TrendData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTrends = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get<TrendData[]>('/metrics/trends');
            setTrends(response.data);
            setError(null);
        } catch (err) {
            if (err instanceof CanceledError) return;
            setError('Failed to fetch trend data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTrends();
    }, [fetchTrends]);

    return { trends, loading, error, refetch: fetchTrends };
};
