import Donor from '../models/Donor.js';
import Donation from '../models/Donation.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { getDonationEligibility } from '../utils/donorEligibility.js';

export const getDashboardSummary = asyncHandler(async (_request, response) => {
  const [donors, totalDonations] = await Promise.all([
    Donor.find().select('lastDonationDate'),
    Donation.countDocuments(),
  ]);
  const eligibleDonors = donors.filter(({ lastDonationDate }) => getDonationEligibility(lastDonationDate).eligible).length;

  response.status(200).json({
    totalRegisteredDonors: donors.length,
    eligibleDonors,
    donorsInCooldown: donors.length - eligibleDonors,
    totalDonations,
  });
});
