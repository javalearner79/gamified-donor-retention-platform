import React from "react";
function StatusMessage({ type = 'info', children }) {
  return <p className={`status-message status-${type}`} role={type === 'error' ? 'alert' : 'status'}>{children}</p>;
}

export default StatusMessage;
