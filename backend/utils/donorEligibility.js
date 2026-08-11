const startOfToday = () => {
  const today = new Date();
  return new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
};

export const getDonationEligibility = (lastDonationDate) => {
  if (!lastDonationDate) {
    return { eligible: true, eligibleDate: null, remainingDays: 0 };
  }

  const lastDonation = new Date(lastDonationDate);
  const eligibleDate = new Date(Date.UTC(
    lastDonation.getUTCFullYear(),
    lastDonation.getUTCMonth(),
    lastDonation.getUTCDate() + 90,
  ));
  const remainingDays = Math.max(0, Math.ceil((eligibleDate - startOfToday()) / 86_400_000));

  return {
    eligible: remainingDays === 0,
    eligibleDate,
    remainingDays,
  };
};

export const formatDonorWithEligibility = (donor) => {
  const donorData = typeof donor.toObject === 'function' ? donor.toObject() : donor;

  return {
    ...donorData,
    ...getDonationEligibility(donorData.lastDonationDate),
  };
};
