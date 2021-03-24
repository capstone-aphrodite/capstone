import React from 'react';
import { Avatar } from '@material-ui/core';

export default function ChildDashboard() {
  return (
    <div>
      <div className="avatar-container">
        <Avatar>LW</Avatar>
      </div>
      <div className="progress-circles">
        <div className="progress-circle">
          <div>Daily Points</div>
          <svg
            className="progress"
            width="120"
            height="120"
            viewBox="0 0 120 120"
          >
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#e6e6e6"
              strokeWidth="12"
            />
            <circle
              className="progress__value"
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#f77a52"
              strokeWidth="12"
            />
          </svg>
        </div>
        <div className="progress-circle">
          <div>Total Points</div>
          <svg
            className="progress"
            width="120"
            height="120"
            viewBox="0 0 120 120"
          >
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#e6e6e6"
              strokeWidth="12"
            />
            <circle
              className="progress__value"
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#f77a52"
              strokeWidth="12"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
