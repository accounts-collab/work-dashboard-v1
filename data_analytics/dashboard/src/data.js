export const dashboardData = {
  summary: {
    activeSubscriptions: 177,
    cancelledSubscriptions: 390,
    totalSubscriptions: 567,
    mrr: 178418.94,
    arr: 2141027.28,
    churnRate: 68.78,
    successPayments: 3615577.45,
    paymentSuccessRate: 47.9
  },
  regional: [
    { country: 'India (IN)', active: 21, cancelled: 21, churn: 50.0, mrr: 151548.22, currency: 'INR' },
    { country: 'United States (US)', active: 44, cancelled: 103, churn: 70.1, mrr: 8050.25, currency: 'USD' },
    { country: 'United Kingdom (GB)', active: 18, cancelled: 66, churn: 78.6, mrr: 3237.00, currency: 'USD' },
    { country: 'Canada (CA)', active: 13, cancelled: 25, churn: 65.8, mrr: 1415.00, currency: 'USD' },
    { country: 'Australia (AU)', active: 5, cancelled: 10, churn: 66.7, mrr: 1034.00, currency: 'USD' },
    { country: 'Mexico (MX)', active: 5, cancelled: 5, churn: 50.0, mrr: 1144.00, currency: 'USD' },
    { country: 'France (FR)', active: 5, cancelled: 15, churn: 75.0, mrr: 650.00, currency: 'USD' },
    { country: 'Spain (ES)', active: 4, cancelled: 7, churn: 63.6, mrr: 864.67, currency: 'USD' }
  ],
  monthlySubs: [
    { month: 'Dec 2025', newSubs: 16, cancelled: 16 },
    { month: 'Jan 2026', newSubs: 11, cancelled: 10 },
    { month: 'Feb 2026', newSubs: 14, cancelled: 15 },
    { month: 'Mar 2026', newSubs: 15, cancelled: 19 },
    { month: 'Apr 2026', newSubs: 11, cancelled: 14 },
    { month: 'May 2026', newSubs: 17, cancelled: 25 },
    { month: 'Jun 2026', newSubs: 0, cancelled: 6 }
  ],
  monthlyTx: [
    { month: 'Jan 2026', success: 145, fail: 186, rate: 43.8, collected: 124214.62, blocked: 97202.77 },
    { month: 'Feb 2026', success: 140, fail: 163, rate: 46.2, collected: 52666.82, blocked: 95690.46 },
    { month: 'Mar 2026', success: 171, fail: 192, rate: 47.1, collected: 96793.69, blocked: 87798.16 },
    { month: 'Apr 2026', success: 137, fail: 182, rate: 42.9, collected: 72172.44, blocked: 169098.17 },
    { month: 'May 2026', success: 163, fail: 213, rate: 43.3, collected: 172680.27, blocked: 96952.82 },
    { month: 'Jun 2026', success: 45, fail: 53, rate: 45.9, collected: 24876.44, blocked: 31648.63 }
  ],
  declines: [
    { reason: 'Insufficient funds', count: 2997, percentage: 58.3 },
    { reason: 'Card declined (General)', count: 1220, percentage: 23.7 },
    { reason: 'Unsupported purchase type', count: 338, percentage: 6.6 },
    { reason: 'Mandate invalid/missing', count: 198, percentage: 3.9 },
    { reason: 'Incorrect card number', count: 116, percentage: 2.3 }
  ]
};
