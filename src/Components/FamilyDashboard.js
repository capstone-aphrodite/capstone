import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Typography,
  CircularProgress,
  Avatar,
  Grid,
} from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { authMe } from '../Store';
import AddKidForm from './AddKidForm';
import Popup from './Popup';
import { Link } from 'react-router-dom';

export const pageStyles = makeStyles({
  background: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexFlow: 'column nowrap',
  },
  grid: {
    padding: 5,
    margin: 5,
  },
});

function FamilyDashboard(props) {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const classes = pageStyles();

  useEffect(() => {
    authMe();
    setLoading(false);
  }, [setOpen]);
  function handleClick() {
    console.log('ICON CLICKED!!!!');
    setOpen(true);
    console.log('open?', open);
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
        <Grid container space={8}>
          {!!props.child ? (
            props.child.map((profile, index) => {
              return (
                <Grid item key={index} xs={3} className={classes.grid}>
                  <Link to={`/childdashboard/${index}`}>
                    <Avatar
                      alt={profile.firstName}
                      src={profile.avatar}
                    ></Avatar>
                  </Link>
                  <Typography variant="subtitle1">
                    {profile.firstName}
                  </Typography>
                </Grid>
              );
            })
          ) : (
            <div></div>
          )}
        </Grid>
      </div>
      <div>
        <Typography variant="subtitle1">Add a new kid</Typography>
        <IconButton aria-label="add-kid" onClick={handleClick}>
          <AddCircle fontSize="large" color="primary" />
        </IconButton>
      </div>
      <div>
        <Popup open={open} setOpen={setOpen}>
          <AddKidForm setOpen={setOpen} />
        </Popup>
      </div>
    </div>
  );
}
const mapState = state => ({
  isLoggedIn: !!state.firstName,
  firstName: state.firstName,
  child: state.child,
});
const mapDispatch = dispatch => {
  return {
    authMe: () => dispatch(authMe()),
  };
};
export default connect(mapState, mapDispatch)(FamilyDashboard);
