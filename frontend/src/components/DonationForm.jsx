import React from "react";
import { useState } from 'react';
import FormField from './FormField.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';
import StatusMessage from './StatusMessage.jsx';

const initialValues = {
  donorId: '',
  donationDate: '',
  hospital: '',
  unitsDonated: '',
};

function DonationForm({ donors, isLoadingDonors, onSubmit }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const updateValue = (event) => {
    const { name, value } = event.target;
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }));
    setSuccessMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};

    Object.entries(values).forEach(([field, value]) => {
      if (!String(value).trim()) nextErrors[field] = 'This field is required.';
    });

    if (Number(values.unitsDonated) < 1) {
      nextErrors.unitsDonated = 'Enter at least one unit.';
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({ ...values, unitsDonated: Number(values.unitsDonated) });
      setValues(initialValues);
      setErrors({});
      setSuccessMessage('Donation added successfully.');
    } catch (error) {
      setErrors({ form: error.message || 'Unable to add the donation.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="donation-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid donation-form-grid">
        <FormField id="donorId" label="Donor" error={errors.donorId}>
          <select id="donorId" name="donorId" value={values.donorId} onChange={updateValue} disabled={isLoadingDonors || donors.length === 0} aria-invalid={Boolean(errors.donorId)}>
            <option value="">{isLoadingDonors ? 'Loading donors...' : 'Select donor'}</option>
            {donors.map((donor) => <option key={donor._id} value={donor._id}>{donor.name} ({donor.bloodGroup})</option>)}
          </select>
        </FormField>
        <FormField id="donationDate" label="Donation date" error={errors.donationDate}>
          <input id="donationDate" name="donationDate" type="date" value={values.donationDate} onChange={updateValue} aria-invalid={Boolean(errors.donationDate)} />
        </FormField>
        <FormField id="hospital" label="Hospital" error={errors.hospital}>
          <input id="hospital" name="hospital" type="text" value={values.hospital} onChange={updateValue} aria-invalid={Boolean(errors.hospital)} />
        </FormField>
        <FormField id="unitsDonated" label="Units donated" error={errors.unitsDonated}>
          <input id="unitsDonated" name="unitsDonated" type="number" min="1" step="1" value={values.unitsDonated} onChange={updateValue} aria-invalid={Boolean(errors.unitsDonated)} />
        </FormField>
      </div>
      {errors.form && <StatusMessage type="error">{errors.form}</StatusMessage>}
      {successMessage && <StatusMessage type="success">{successMessage}</StatusMessage>}
      <div className="form-actions">
        <button className="button button-primary" type="submit" disabled={isSubmitting || isLoadingDonors || donors.length === 0}>
          {isSubmitting && <LoadingSpinner label="Adding donation" />} {isSubmitting ? 'Adding donation...' : 'Add donation'}
        </button>
      </div>
    </form>
  );
}

export default DonationForm;
