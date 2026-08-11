export const getDonorAchievement = (totalDonations) => {
  if (totalDonations >= 10) return 'Life Saver';
  if (totalDonations >= 5) return 'Regular Donor';
  if (totalDonations >= 1) return 'First Donation';
  return 'No badge yet';
};

export const getDonationAchievements = (totalDonations) => ({
  currentBadge: getDonorAchievement(totalDonations),
  totalDonations,
  estimatedLivesSaved: totalDonations * 3,
});
