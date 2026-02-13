-- Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('income', 'expense')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Metrics Snapshots Table (Stores history of KPIs, Trends, Cashflow)
CREATE TABLE IF NOT EXISTS metrics_snapshots (
    id SERIAL PRIMARY KEY,
    snapshot_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Events Log Table
CREATE TABLE IF NOT EXISTS events_log (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(100) NOT NULL,
    payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
