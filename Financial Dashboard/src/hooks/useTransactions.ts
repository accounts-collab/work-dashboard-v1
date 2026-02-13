import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { type Transaction } from '../types/api';
import { CanceledError } from 'axios';

export const useTransactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTransactions = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get<Transaction[]>('/transactions');
            setTransactions(response.data);
            setError(null);
        } catch (err) {
            if (err instanceof CanceledError) return;
            setError('Failed to fetch transactions');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    return { transactions, loading, error, refetch: fetchTransactions };
};
