import mongoose from 'mongoose';
import Donation from '../models/Donation.js';
import Donor from '../models/Donor.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { syncLastDonationDate } from '../utils/donationSync.js';
import { assertValidObjectId } from '../utils/requestValidation.js';

export const createDonation = asyncHandler(async (request, response) => {
  const { donorId } = request.body;

  if (!mongoose.isValidObjectId(donorId)) {
    return response.status(400).json({ status: 400, message: 'A valid donor ID is required.' });
  }

  const donor = await Donor.findById(donorId);
  if (!donor) {
    return response.status(404).json({ status: 404, message: 'Donor not found.' });
  }

  const donation = await Donation.create(request.body);
  await syncLastDonationDate(donor._id);

  return response.status(201).json(donation);
});

export const getDonations = asyncHandler(async (_request, response) => {
  const donations = await Donation.find().sort({ donationDate: -1 });
  response.status(200).json(donations);
});

export const deleteDonation = asyncHandler(async (request, response) => {
  assertValidObjectId(request.params.id, 'donation');
  const donation = await Donation.findByIdAndDelete(request.params.id);

  if (!donation) {
    return response.status(404).json({ status: 404, message: 'Donation not found.' });
  }

  await syncLastDonationDate(donation.donorId);

  return response.status(204).send();
});
