import React from "react";
import { formatDate } from '../utils/date.js';

function DonationTable({ donations, deletingId, onDelete }) {
  return (
    <div className="table-wrap">
      <table className="donation-table">
        <thead>
          <tr><th scope="col">Donation date</th><th scope="col">Hospital</th><th scope="col">Units donated</th><th scope="col"><span className="visually-hidden">Actions</span></th></tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr key={donation._id}>
              <td>{formatDate(donation.donationDate)}</td>
              <td>{donation.hospital}</td>
              <td>{donation.unitsDonated} {donation.unitsDonated === 1 ? 'unit' : 'units'}</td>
              <td className="table-action"><button className="delete-button" type="button" onClick={() => onDelete(donation._id)} disabled={deletingId === donation._id}>{deletingId === donation._id ? 'Deleting...' : 'Delete'}</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DonationTable;
