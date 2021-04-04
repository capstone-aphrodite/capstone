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

  let childId = props.match.params.id;
  selectedChild = child[childId];

  async function handleChange(event) {
    selectedChild.selectedReward = event.target.value;
    await updateChild(selectedChild);
    setNeedsUpdate(true);
  }

  useEffect(() => {
    setNeedsUpdate(false);
    selectChild(selectedChild);
    if(selectedChild.dailyPoints > selectedChild.dailyPointGoal){
      selectedChild.dailyPoints = 0;
      updateChild(selectedChild);
    }
    const dailyProgressOffset = ((selectedChild.dailyPointGoal - selectedChild.dailyPoints) / selectedChild.dailyPointGoal) * 339.292;
    if(dailyProgressOffset > 0){
      setDailyOffset(dailyProgressOffset);
    } else{
      setDailyOffset(0);
    }
    if(selectedChild.totalPoints === 0){
      setTotalOffset(((100 - selectedChild.totalPoints) / 100) * 339.292);
    } else {
      setTotalOffset(0)
    }
    
    dailyCircleRef.current.style =
      'transition: stroke-dashoffset 850ms ease-in-out';
    totalCircleRef.current.style =
      'transition: stroke-dashoffset 850ms ease-in-out';
  }, [setDailyOffset, setTotalOffset, selectedChild, needsUpdate]);


  return (
    <>
      {selectedChild ? (
        <div className="child-dashboard">
          <div className="avatar-container"></div>
          <div className="progress-circles">
            <div className="progress-circle">
              <div className="points-label">Daily Points</div>
              <svg
                className="dailyProgress"
                width="120"
                height="120"
                viewBox="0 0 120 120"
              >
                <linearGradient id="dailyColors" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#1ed882"></stop>
                  <stop offset="52%" stop-color="#17af9b"></stop>
                  <stop offset="100%" stop-color="#118ab2"></stop>
                </linearGradient>
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
                  stroke="url(#dailyColors)"
                  strokeWidth="12"
                  strokeDasharray="339.292"
                  strokeDashoffset={dailyOffset}
                />
                <text className="svg-circle-text" x="60" y="65">
                  <tspan>{`${selectedChild.dailyPoints}/${selectedChild.dailyPointGoal}`}</tspan>
                </text>
              </svg>
            </div>
            <div className="progress-circle">
              <div className="points-label">Lifetime Points</div>
              <svg
                className="progress"
                width="120"
                height="120"
                viewBox="0 0 120 120"
              >
                <linearGradient id="totalColors" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="20%" stop-color="#dfb045"></stop>
                  <stop offset="95%" stop-color="#ffd166"></stop>
                </linearGradient>
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
                  stroke="url(#totalColors)"
                  strokeWidth="12"
                  strokeDasharray="339.292"
                  strokeDashoffset={totalOffset}
                />
                <text className="svg-circle-text" x='60' y='65'>
                  <tspan>{`${selectedChild.totalPoints}`}</tspan>
                </text>
              </svg>
            </div>
          </div>
          <div className="reward-form">
            <Typography variant="h5">I'm working towards</Typography>
            <div className="reward-box">
              {selectedChild.rewardOptions.length === 0 ? (
                <Typography variant="subtitle1">
                  {' '}
                  Ask your grown-up to add rewards!
                </Typography>
              ) : (
                <FormControl>
                  <Select
                    value={selectedChild.selectedReward}
                    onChange={handleChange}
                    disableUnderline
                    variant="outlined"
                  >
                    {selectedChild.rewardOptions.map(reward => (
                      <MenuItem key={reward} value={reward}>
                        {reward}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </div>
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
            Not {selectedChild.firstName}?
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
