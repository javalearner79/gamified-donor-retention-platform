import React from "react";
import { formatDate } from '../utils/date.js';

function DonorEligibilityCard({ donor }) {
  const statusMessage = donor.eligible
    ? 'You are eligible to donate again.'
    : `You can donate again in ${donor.remainingDays} ${donor.remainingDays === 1 ? 'day' : 'days'}.`;

  return (
    <article className="donor-card">
      <div className="donor-card-header">
        <div>
          <p className="donor-card-label">Donor</p>
          <h2>{donor.name}</h2>
        </div>
        <span className="blood-group">{donor.bloodGroup}</span>
      </div>

      <dl className="donor-details">
        <div><dt>Last donation date</dt><dd>{formatDate(donor.lastDonationDate)}</dd></div>
        <div><dt>Eligible date</dt><dd>{formatDate(donor.eligibleDate)}</dd></div>
        <div><dt>Remaining days</dt><dd>{donor.eligible ? '0 days' : `${donor.remainingDays} days`}</dd></div>
      </dl>

      <div className={`eligibility-status ${donor.eligible ? 'is-eligible' : 'is-waiting'}`}>
        <strong>{donor.eligible ? 'Eligible to donate' : 'In cooldown'}</strong>
        <span>{statusMessage}</span>
      </div>
    </article>
  );
}

export default DonorEligibilityCard;
