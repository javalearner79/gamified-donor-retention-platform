import React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from '../components/FormField.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import StatusMessage from '../components/StatusMessage.jsx';
import api from '../services/api.js';
import { getApiErrorMessage } from '../utils/errors.js';

const initialValues = {
  name: '',
  email: '',
  phone: '',
  bloodGroup: '',
  lastDonationDate: '',
};

const fieldLabels = {
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  bloodGroup: 'Blood group',
  lastDonationDate: 'Last donation date',
};

const validate = (values) => Object.entries(fieldLabels).reduce((errors, [field, label]) => {
  if (!values[field].trim()) {
    errors[field] = `${label} is required.`;
  }
  return errors;
}, {});

export default function RegisterDonor() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateValue = (event) => {
    const { name, value } = event.target;
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }));
    setStatus({ type: '', message: '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(values);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setStatus({ type: 'error', message: 'Please complete the required fields.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });
    let registrationSucceeded = false;

    try {
      await api.post('/donors', values);
      registrationSucceeded = true;
      setStatus({ type: 'success', message: 'Donor registered successfully. Opening the dashboard...' });
      window.setTimeout(() => navigate('/donor-dashboard'), 900);
    } catch (error) {
      setStatus({ type: 'error', message: getApiErrorMessage(error, 'Unable to register the donor. Please try again.') });
    } finally {
      if (!registrationSucceeded) {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section className="registration-page">
      <div className="registration-intro">
        <p className="eyebrow">Donor onboarding</p>
        <h1>Register a donor</h1>
        <p className="lead">Capture the essentials to begin a thoughtful and informed relationship.</p>
      </div>

      <form className="donor-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <FormField id="name" label="Name" error={errors.name}>
            <input id="name" name="name" type="text" value={values.name} onChange={updateValue} autoComplete="name" aria-invalid={Boolean(errors.name)} />
          </FormField>
          <FormField id="email" label="Email" error={errors.email}>
            <input id="email" name="email" type="email" value={values.email} onChange={updateValue} autoComplete="email" aria-invalid={Boolean(errors.email)} />
          </FormField>
          <FormField id="phone" label="Phone" error={errors.phone}>
            <input id="phone" name="phone" type="tel" value={values.phone} onChange={updateValue} autoComplete="tel" aria-invalid={Boolean(errors.phone)} />
          </FormField>
          <FormField id="bloodGroup" label="Blood group" error={errors.bloodGroup}>
            <select id="bloodGroup" name="bloodGroup" value={values.bloodGroup} onChange={updateValue} aria-invalid={Boolean(errors.bloodGroup)}>
              <option value="">Select blood group</option>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => <option key={group} value={group}>{group}</option>)}
            </select>
          </FormField>
          <FormField id="lastDonationDate" label="Last donation date" error={errors.lastDonationDate} hint="Use the date of the donor's most recent donation.">
            <input id="lastDonationDate" name="lastDonationDate" type="date" value={values.lastDonationDate} onChange={updateValue} aria-invalid={Boolean(errors.lastDonationDate)} />
          </FormField>
        </div>

        {status.message && <StatusMessage type={status.type}>{status.message}</StatusMessage>}

        <div className="form-actions">
          <button className="button button-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting && <LoadingSpinner label="Registering donor" />} {isSubmitting ? 'Registering...' : 'Register donor'}
          </button>
        </div>
      </form>
    </section>
  );
}
