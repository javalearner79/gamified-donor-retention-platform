import React from "react";
import { useEffect, useState } from 'react';
import DashboardMetricCard from '../components/DashboardMetricCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import StatusMessage from '../components/StatusMessage.jsx';
import api from '../services/api.js';
import { getApiErrorMessage } from '../utils/errors.js';

export default function NgoDashboard() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const response = await api.get('/dashboard');
        setSummary(response.data);
      } catch (requestError) {
        setError(getApiErrorMessage(requestError, 'Unable to load the dashboard summary.'));
      }
    };

    loadSummary();
  }, []);

  const metrics = summary && [
    { label: 'Total donors', value: summary.totalRegisteredDonors, description: 'Registered donor profiles', tone: 'green' },
    { label: 'Eligible donors', value: summary.eligibleDonors, description: 'Ready to donate again', tone: 'teal' },
    { label: 'Cooldown donors', value: summary.donorsInCooldown, description: 'Currently within 90 days', tone: 'amber' },
    { label: 'Total donations', value: summary.totalDonations, description: 'Recorded donation events', tone: 'rose' },
  ];

  return (
    <section className="dashboard-page ngo-dashboard-page">
      <div className="dashboard-intro">
        <p className="eyebrow">Organization view</p>
        <h1>NGO dashboard</h1>
        <p className="lead">A current snapshot of registered donors, donation activity, and cooldown status.</p>
      </div>

      {!summary && !error && <StatusMessage><LoadingSpinner /> Loading dashboard summary...</StatusMessage>}
      {error && <StatusMessage type="error">{error}</StatusMessage>}
      {summary && <div className="dashboard-metric-grid">{metrics.map((metric) => <DashboardMetricCard key={metric.label} {...metric} />)}</div>}
    </section>
  );
}
