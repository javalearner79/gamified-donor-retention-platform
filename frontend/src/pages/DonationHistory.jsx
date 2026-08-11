import React from "react";
import { useEffect, useState } from 'react';
import DonationForm from '../components/DonationForm.jsx';
import DonationTable from '../components/DonationTable.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import StatusMessage from '../components/StatusMessage.jsx';
import api from '../services/api.js';
import { getApiErrorMessage } from '../utils/errors.js';

export default function DonationHistory() {
  const [donations, setDonations] = useState([]);
  const [donors, setDonors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [deletingId, setDeletingId] = useState('');

  useEffect(() => {
    const loadPageData = async () => {
      try {
        const [donationResponse, donorResponse] = await Promise.all([api.get('/donations'), api.get('/donors')]);
        setDonations(donationResponse.data);
        setDonors(donorResponse.data);
      } catch (requestError) {
        setError(getApiErrorMessage(requestError, 'Unable to load donation history.'));
      } finally {
        setIsLoading(false);
      }
    };

    loadPageData();
  }, []);

  const addDonation = async (values) => {
    try {
      const response = await api.post('/donations', values);
      setDonations((currentDonations) => [response.data, ...currentDonations]);
    } catch (requestError) {
      throw new Error(getApiErrorMessage(requestError, 'Unable to add the donation.'));
    }
  };

  const deleteDonation = async (id) => {
    if (!window.confirm('Delete this donation record?')) return;

    setDeletingId(id);
    setError('');
    setSuccessMessage('');
    try {
      await api.delete(`/donations/${id}`);
      setDonations((currentDonations) => currentDonations.filter((donation) => donation._id !== id));
      setSuccessMessage('Donation record deleted successfully.');
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'Unable to delete the donation.'));
    } finally {
      setDeletingId('');
    }
  };

  return (
    <section className="donation-history-page">
      <div className="history-intro">
        <p className="eyebrow">Giving record</p>
        <h1>Donation history</h1>
        <p className="lead">Record each donation and keep a clear view of giving activity.</p>
      </div>

      <DonationForm donors={donors} isLoadingDonors={isLoading} onSubmit={addDonation} />

      <section className="history-table-section" aria-labelledby="donation-records-title">
        <div className="history-table-heading"><h2 id="donation-records-title">All donations</h2><span>{donations.length} records</span></div>
        {isLoading && <StatusMessage><LoadingSpinner /> Loading donation history...</StatusMessage>}
        {error && <StatusMessage type="error">{error}</StatusMessage>}
        {successMessage && <StatusMessage type="success">{successMessage}</StatusMessage>}
        {!isLoading && donations.length === 0 && <StatusMessage>No donations have been recorded yet.</StatusMessage>}
        {!isLoading && donations.length > 0 && <DonationTable donations={donations} deletingId={deletingId} onDelete={deleteDonation} />}
      </section>
    </section>
  );
}
