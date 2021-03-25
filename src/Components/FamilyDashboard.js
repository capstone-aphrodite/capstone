import React, { useState, useEffect } from 'react';
import { IconButton, Typography, CircularProgress } from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { authMe } from '../Store';

export const pageStyles = makeStyles({
  background: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexFlow: 'column nowrap',
  },
});

function FamilyDashboard(props) {
  const [loading, setLoading] = useState(true);
  const { history } = props;
  const classes = pageStyles();

  useEffect(() => {
    authMe();
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
      <Typography variant="h5">Welcome, {props.firstName}</Typography>
      <div>
        <Typography variant="subtitle1">Add a new kid</Typography>
        <IconButton aria-label="add-kid" onClick={handleClick}>
          <AddCircle fontSize="large" color="primary" />
        </IconButton>
      </div>
    </div>
  );
}
const mapState = state => ({
  isLoggedIn: !!state.firstName,
  firstName: state.firstName,
});
const mapDispatch = dispatch => {
  return {
    authMe: () => dispatch(authMe()),
  };
};
export default connect(mapState, mapDispatch)(FamilyDashboard);
