import React from "react";
function DashboardMetricCard({ label, value, description, tone }) {
  return (
    <article className={`dashboard-metric-card metric-${tone}`}>
      <p>{label}</p>
      <strong>{value}</strong>
      <span>{description}</span>
    </article>
  );
}

export default DashboardMetricCard;
