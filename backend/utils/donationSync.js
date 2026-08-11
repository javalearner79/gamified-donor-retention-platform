import Donation from '../models/Donation.js';
import Donor from '../models/Donor.js';

// Keep the donor's cached latest donation date aligned with its donation history.
export const syncLastDonationDate = async (donorId) => {
  const latestDonation = await Donation.findOne({ donorId }).sort({ donationDate: -1 }).select('donationDate');
  await Donor.findByIdAndUpdate(donorId, { lastDonationDate: latestDonation?.donationDate || null });
};
