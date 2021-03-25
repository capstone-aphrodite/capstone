import React, { useState, useEffect } from 'react';
import { IconButton, Typography, CircularProgress } from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';

export const pageStyles = makeStyles({
  background: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexFlow: 'column nowrap',
  },
});

export default function FamilyDashboard(props) {
  const [loading, setLoading] = useState(true);
  const { history } = props;
  const classes = pageStyles();

  useEffect(() => {
    console.log('USE EFFECT IS RUNNING');
    setLoading(false);
  }, []);
  function handleClick() {
    //Should this form be a new route or should this be a popup? or like slide out via a local state control? this more like in JPFP?
    history.push('/add-kid');
  }
  if (loading) {
    console.log('PROPS FOR FAMILY DASHBOARD --->', props);
    return (
      <div className={classes.background}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.background}>
      <Typography variant="h5">Welcome, USER!</Typography>
      <div>
        <Typography variant="subtitle1">Add a new kid</Typography>
        <IconButton aria-label="add-kid" onClick={handleClick}>
          <AddCircle fontSize="large" color="primary" />
        </IconButton>
      </div>
    </div>
  );
}
