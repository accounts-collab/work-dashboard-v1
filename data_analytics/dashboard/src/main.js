import { Chart, registerables } from 'chart.js';
import { dashboardData } from './data.js';

Chart.register(...registerables);

// Initialize Lucide Icons
lucide.createIcons();

// Tabs switching logic
const navItems = document.querySelectorAll('.nav-item');
const tabPanes = document.querySelectorAll('.tab-pane');

navItems.forEach(item => {
  item.addEventListener('click', () => {
    // Deactivate active items
    navItems.forEach(nav => nav.classList.remove('active'));
    tabPanes.forEach(pane => pane.classList.remove('active'));

    // Activate selected
    item.classList.add('active');
    const tabId = `tab-${item.getAttribute('data-tab')}`;
    document.getElementById(tabId).classList.add('active');
  });
});

// Load Regional Table
const regionalTableBody = document.getElementById('regional-table-body');
dashboardData.regional.forEach(row => {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><strong>${row.country}</strong></td>
    <td style="color: #10b981; font-weight: 600;">${row.active}</td>
    <td style="color: #ef4444;">${row.cancelled}</td>
    <td style="font-weight: 500;">${row.churn.toFixed(1)}%</td>
    <td><strong>${row.mrr.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${row.currency}</strong></td>
  `;
  regionalTableBody.appendChild(tr);
});

// Setup Chart Configurations
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#94a3b8',
        font: { family: 'Outfit', size: 12 }
      }
    }
  },
  scales: {
    x: {
      grid: { color: 'rgba(255, 255, 255, 0.05)' },
      ticks: { color: '#94a3b8', font: { family: 'Outfit' } }
    },
    y: {
      grid: { color: 'rgba(255, 255, 255, 0.05)' },
      ticks: { color: '#94a3b8', font: { family: 'Outfit' } }
    }
  }
};

// Chart 1: Monthly Subscription Activity (Stacked Bar)
const subsCtx = document.getElementById('subsChart').getContext('2d');
new Chart(subsCtx, {
  type: 'bar',
  data: {
    labels: dashboardData.monthlySubs.map(d => d.month),
    datasets: [
      {
        label: 'New Subscriptions',
        data: dashboardData.monthlySubs.map(d => d.newSubs),
        backgroundColor: '#3b82f6',
        borderRadius: 4
      },
      {
        label: 'Cancellations',
        data: dashboardData.monthlySubs.map(d => d.cancelled),
        backgroundColor: '#ef4444',
        borderRadius: 4
      }
    ]
  },
  options: chartOptions
});

// Chart 2: Top Payment Failure Drivers (Horizontal Bar)
const declinesCtx = document.getElementById('declinesChart').getContext('2d');
new Chart(declinesCtx, {
  type: 'bar',
  data: {
    labels: dashboardData.declines.map(d => d.reason),
    datasets: [{
      label: 'Decline Count',
      data: dashboardData.declines.map(d => d.count),
      backgroundColor: ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#ffe4e6'],
      borderRadius: 4
    }]
  },
  options: {
    ...chartOptions,
    indexAxis: 'y',
    plugins: {
      legend: { display: false }
    }
  }
});

// Chart 3: Monthly Transaction Cash Flow (Line Chart)
const txCtx = document.getElementById('txCashChart').getContext('2d');
new Chart(txCtx, {
  type: 'line',
  data: {
    labels: dashboardData.monthlyTx.map(d => d.month),
    datasets: [
      {
        label: 'Successful Cash Collected ($)',
        data: dashboardData.monthlyTx.map(d => d.collected),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.3,
        fill: true
      },
      {
        label: 'Blocked Cash (Declines) ($)',
        data: dashboardData.monthlyTx.map(d => d.blocked),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.3,
        fill: true
      }
    ]
  },
  options: chartOptions
});
