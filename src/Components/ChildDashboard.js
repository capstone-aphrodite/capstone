/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { Button, Typography, Select, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectChild } from '../Store';

export function ChildDashboard(props) {
  const [dailyOffset, setDailyOffset] = useState(0);
  const [totalOffset, setTotalOffset] = useState(0);
  const dailyCircleRef = useRef(null);
  const totalCircleRef = useRef(null);
  //HARD CODED
  // const dailyProgress = 75;
  // const totalProgress = 100;

  const { child, selectChild } = props;
  let childId = props.match.params.id;
  let currentChild = child[childId];

  useEffect(() => {
    selectChild(currentChild);
    console.log('setting selected child in Use Effect');
  }, []);

  useEffect(() => {
    console.log('USE EFFECT RUNNING');
    let dailyPoints = currentChild.dailyPoints;
    let totalPoints = currentChild.totalPoints;
    // this is hard coded for the goal to be 100 points
    // should be: (total points - progress)
    const dailyProgressOffset = ((100 - dailyPoints) / 100) * 339.292;
    setDailyOffset(dailyProgressOffset);

    const totalProgressOffset = ((100 - totalPoints) / 100) * 339.292;
    setTotalOffset(totalProgressOffset);

    dailyCircleRef.current.style =
      'transition: stroke-dashoffset 850ms ease-in-out';
    totalCircleRef.current.style =
      'transition: stroke-dashoffset 850ms ease-in-out';
  }, [setDailyOffset, setTotalOffset, currentChild]);

  return (
    <div className="child-dashboard">
      <div className="avatar-container">
        {/* <Avatar>{`${currentChild.firstName[0]}`}</Avatar> */}
      </div>
      <div className="progress-circles">
        <div className="progress-circle">
          <div className="points-label">Daily Points</div>
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
            <text className="svg-circle-text" x="60" y="60">
              {`${currentChild.dailyPoints}`}%
            </text>
          </svg>
        </div>
        <div className="progress-circle">
          <div className="points-label">Total Points</div>
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
            <text className="svg-circle-text" x="60" y="60">
              {`${currentChild.totalPoints}`}%
            </text>
          </svg>
        </div>
      </div>
      <div>
        <Typography variant="h5">I'm working towards</Typography>
        <Select>
          {currentChild.rewardOptions.map(reward => (
            <MenuItem>{reward}</MenuItem>
          ))}
        </Select>
      </div>
      <Button
        className="get-moving-button"
        component={Link}
        size="large"
        to="/exercises"
        variant="contained"
        color="primary"
      >
        Get Moving!
      </Button>
      <Link className="not-child-link" to="/home">
        Not {currentChild.firstName}? Click here.
      </Link>
    </div>
  );
}

const mapState = state => {
  return {
    child: state.child,
  };
};

const mapDispatch = dispatch => {
  return {
    selectChild: currentChild => dispatch(selectChild(currentChild)),
  };
};

export default connect(mapState, mapDispatch)(ChildDashboard);
