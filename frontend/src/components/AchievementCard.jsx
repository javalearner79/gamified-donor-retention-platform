import React from "react";
function AchievementCard({ donor }) {
  return (
    <article className="achievement-card">
      <div className="achievement-card-heading">
        <div>
          <p className="donor-card-label">Achievement</p>
          <h2>{donor.name}</h2>
        </div>
        <span className="achievement-badge">{donor.currentBadge}</span>
      </div>
      <div className="achievement-stats">
        <div><span>Total donations</span><strong>{donor.totalDonations}</strong></div>
        <div><span>Estimated lives saved</span><strong>{donor.estimatedLivesSaved}</strong></div>
      </div>
      <p className="achievement-note">One blood donation can help save up to 3 lives.</p>
    </article>
  );
}

export default AchievementCard;
