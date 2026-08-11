
import React from "react";
function LoadingSpinner({ label = 'Loading' }) {
  return <span className="loading-spinner" role="status" aria-label={label} />;
}

export default LoadingSpinner;
