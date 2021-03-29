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
    flexFlow: 'column nowrap',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    marginBottom: 0,
  },
  grid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 0,
  },
  items: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'black',
    padding: 2,
  },
  avatar: {
    minWidth: 58,
    minHeight: 58,
  },
});

function FamilyDashboard(props) {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const classes = pageStyles();

  useEffect(() => {
    authMe();
    setLoading(false);
  }, [setLoading, loading]);
  function handleClick() {
    setOpen(true);
  }
  if (loading) {
    return (
      <div className={classes.background}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.background}>
      <Typography variant="h4" className={classes.text}>
        Welcome, {props.firstName}
      </Typography>
      <div>
        <Grid
          container
          spacing={5}
          className={classes.container}
          justify="center"
          alignItems="center"
        >
          {!!props.child ? (
            props.child.map((profile, index) => {
              return (
                <Grid item key={index} xs={4} className={classes.grid}>
                  <Link
                    to={`/childdashboard/${index}`}
                    className={classes.items}
                  >
                    <Avatar
                      alt={profile.firstName}
                      src={profile.avatar}
                      className={classes.avatar}
                      component="div"
                    ></Avatar>
                    <Typography variant="subtitle1">
                      {profile.firstName}
                    </Typography>
                  </Link>
                </Grid>
              );
            })
          ) : (
            <div></div>
          )}
        </Grid>
      </div>
      <div>
        <Typography variant="h6" className={classes.text}>
          Add a new kid
        </Typography>
        <IconButton aria-label="add-kid" onClick={handleClick}>
          <AddCircle color="secondary" className={classes.avatar} />
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
