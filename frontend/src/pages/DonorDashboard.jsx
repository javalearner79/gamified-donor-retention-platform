import React from "react";
import { useEffect, useState } from 'react';
import AchievementCard from '../components/AchievementCard.jsx';
import DonorEligibilityCard from '../components/DonorEligibilityCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import StatusMessage from '../components/StatusMessage.jsx';
import api from '../services/api.js';
import { getApiErrorMessage } from '../utils/errors.js';

export default function DonorDashboard() {
  const [donors, setDonors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDonors = async () => {
      try {
        const response = await api.get('/donors');
        setDonors(response.data);
      } catch (requestError) {
        setError(getApiErrorMessage(requestError, 'Unable to load donor information.'));
      } finally {
        setIsLoading(false);
      }
    };

    loadDonors();
  }, []);

  return (
    <section className="dashboard-page">
      <div className="dashboard-intro">
        <p className="eyebrow">Donor experience</p>
        <h1>Donor dashboard</h1>
        <p className="lead">A clear view of donation timing and eligibility for every registered donor.</p>
      </div>

      {isLoading && <StatusMessage><LoadingSpinner /> Loading donor information...</StatusMessage>}
      {error && <StatusMessage type="error">{error}</StatusMessage>}
      {!isLoading && !error && donors.length === 0 && <StatusMessage>No donors have been registered yet.</StatusMessage>}
      {!isLoading && !error && donors.length > 0 && (
        <>
          <div className="donor-card-grid">
            {donors.map((donor) => <DonorEligibilityCard key={donor._id} donor={donor} />)}
          </div>
          <section className="achievements-section" aria-labelledby="achievements-title">
            <div className="achievements-heading">
              <h2 id="achievements-title">Donation achievements</h2>
              <p>Badges update automatically as donations are recorded.</p>
            </div>
            <div className="achievement-card-grid">
              {donors.map((donor) => <AchievementCard key={donor._id} donor={donor} />)}
            </div>
          </section>
        </>
      )}
    </section>
  );
}
