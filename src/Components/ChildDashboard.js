/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import {
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateChild, selectChild } from '../Store';

export function ChildDashboard(props) {
  const [dailyOffset, setDailyOffset] = useState(0);
  const [totalOffset, setTotalOffset] = useState(0);
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const dailyCircleRef = useRef(null);
  const totalCircleRef = useRef(null);
  let { selectedChild, updateChild, selectChild, child } = props;

  console.log('PROPS--->', props);
  let childId = props.match.params.id;
  selectedChild = child[childId];
  console.log('CHILD DASH DAILY POINTS', selectedChild.dailyPoints);

  async function handleChange(event) {
    console.log('event.target.value', event.target.value);
    selectedChild.selectedReward = event.target.value;
    await updateChild(selectedChild);
    setNeedsUpdate(true);
  }

  useEffect(() => {
    console.log('USE EFFECT CHILD DASH RUNNING');
    setNeedsUpdate(false);
    selectChild(selectedChild);
    let dailyPoints = selectedChild.dailyPoints;
    let totalPoints = selectedChild.totalPoints;
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
  }, [setDailyOffset, setTotalOffset, selectedChild, needsUpdate]);

  return (
    <>
      {selectedChild ? (
        <div className="child-dashboard">
          <div className="avatar-container">
            {/* <Avatar>{`${selectedChild.firstName[0]}`}</Avatar> */}
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
                  {`${selectedChild.dailyPoints}`}%
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
                  {`${selectedChild.totalPoints}`}%
                </text>
              </svg>
            </div>
          </div>
          <div>
            <Typography variant="h5">I'm working towards</Typography>
            <FormControl>
              <Select
                value={selectedChild.selectedReward}
                onChange={handleChange}
              >
                {selectedChild.rewardOptions.map(reward => (
                  <MenuItem key={reward} value={reward}>
                    {reward}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
            Not {selectedChild.firstName}? Click here.
          </Link>
        </div>
      ) : (
        <div></div>
      )}{' '}
    </>
  );
}

const mapState = state => {
  return {
    child: state.child,
    selectedChild: state.selectedChild,
  };
};

const mapDispatch = dispatch => {
  return {
    updateChild: selectedChild => dispatch(updateChild(selectedChild)),
    selectChild: currentChild => dispatch(selectChild(currentChild)),
  };
};

export default connect(mapState, mapDispatch)(ChildDashboard);
