import React, { useEffect, useState, useRef } from 'react';
import { Avatar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function ChildDashboard() {
  const [dailyOffset, setDailyOffset] = useState(0);
  const [totalOffset, setTotalOffset] = useState(0);
  const dailyCircleRef = useRef(null);
  const totalCircleRef = useRef(null);
  //HARD CODED
  const dailyProgress = 75;
  const totalProgress = 100;

  useEffect(() => {
    // this is hard coded for the goal to be 100 points
    // should be: (total points - progress)
    const dailyProgressOffset = ((100 - dailyProgress) / 100) * 339.292;
    setDailyOffset(dailyProgressOffset);

    const totalProgressOffset = ((100 - totalProgress) / 100) * 339.292;
    setTotalOffset(totalProgressOffset);

    dailyCircleRef.current.style =
      'transition: stroke-dashoffset 850ms ease-in-out';
    totalCircleRef.current.style =
      'transition: stroke-dashoffset 850ms ease-in-out';
  }, [setDailyOffset, setTotalOffset]);

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
              ref={dailyCircleRef}
              stroke="#f77a52"
              strokeWidth="12"
              strokeDasharray="339.292"
              strokeDashoffset={dailyOffset}
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
              ref={totalCircleRef}
              stroke="#f77a52"
              strokeWidth="12"
              strokeDasharray="339.292"
              strokeDashoffset={totalOffset}
            />
          </svg>
        </div>
      </div>
      <Button
        component={Link}
        size="large"
        to="/exercises"
        variant="contained"
        color="primary"
      >
        Get Moving!
      </Button>
    </div>
  );
}
