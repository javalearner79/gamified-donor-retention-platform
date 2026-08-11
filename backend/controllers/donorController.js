import Donor from '../models/Donor.js';
import Donation from '../models/Donation.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { getDonationAchievements } from '../utils/donorAchievements.js';
import { formatDonorWithEligibility } from '../utils/donorEligibility.js';
import { assertValidObjectId } from '../utils/requestValidation.js';

const formatDonorsWithDetails = async (donors) => {
  const donorIds = donors.map(({ _id }) => _id);
  const donationCounts = await Donation.aggregate([
    { $match: { donorId: { $in: donorIds } } },
    { $group: { _id: '$donorId', totalDonations: { $sum: 1 } } },
  ]);
  const countByDonorId = new Map(donationCounts.map(({ _id, totalDonations }) => [String(_id), totalDonations]));

  return donors.map((donor) => {
    const donorData = formatDonorWithEligibility(donor);
    const totalDonations = countByDonorId.get(String(donorData._id)) || 0;

    return { ...donorData, ...getDonationAchievements(totalDonations) };
  });
};

export const createDonor = asyncHandler(async (request, response) => {
  const donor = await Donor.create(request.body);
  const [donorData] = await formatDonorsWithDetails([donor]);
  response.status(201).json(donorData);
});

export const getDonors = asyncHandler(async (_request, response) => {
  const donors = await Donor.find().sort({ createdAt: -1 });
  response.status(200).json(await formatDonorsWithDetails(donors));
});

export const getDonorById = asyncHandler(async (request, response) => {
  assertValidObjectId(request.params.id, 'donor');
  const donor = await Donor.findById(request.params.id);

  if (!donor) {
    return response.status(404).json({ status: 404, message: 'Donor not found.' });
  }

  const [donorData] = await formatDonorsWithDetails([donor]);
  return response.status(200).json(donorData);
});

export const updateDonor = asyncHandler(async (request, response) => {
  assertValidObjectId(request.params.id, 'donor');
  const donor = await Donor.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
  });

  if (!donor) {
    return response.status(404).json({ status: 404, message: 'Donor not found.' });
  }

  const [donorData] = await formatDonorsWithDetails([donor]);
  return response.status(200).json(donorData);
});

export const deleteDonor = asyncHandler(async (request, response) => {
  assertValidObjectId(request.params.id, 'donor');
  const donor = await Donor.findByIdAndDelete(request.params.id);

  if (!donor) {
    return response.status(404).json({ status: 404, message: 'Donor not found.' });
  }

  await Donation.deleteMany({ donorId: donor._id });

  return response.status(204).send();
});
