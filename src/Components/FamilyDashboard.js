/* eslint-disable react-hooks/exhaustive-deps */
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
import { authMe, selectChild } from '../Store';
import AddKidForm from './AddKidForm';
import Popup from './Popup';
import history from '../history';
import AuthPopup from './AuthPopup';
import ReEnterPassword from './ReEnterPassword';

function FamilyDashboard(props) {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const classes = pageStyles();
  const { selectChild } = props;

  useEffect(() => {
    authMe();
    selectChild({});
    setLoading(false);
  }, [setLoading, loading]);

  function handleClick() {
    setOpen(true);
  }

  function handleAuthClick() {
    console.log('handle click here');
    setAuthOpen(true);
    console.log('authopen', authOpen);
  }

  async function handleChange({ profile, index }) {
    console.log('PROFILE, INDEX', profile, index);
    await selectChild(profile);
    await history.push(`/childdashboard/${index}`);
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
        Welcome, {props.firstName}!
      </Typography>
      <div>
        {!!props.child ? (
          <Grid
            container
            spacing={2}
            className={classes.container}
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Typography variant="h5"> Who is playing? </Typography>
            </Grid>
            {props.child.map((profile, index) => {
              return (
                <Grid item key={index} xs={4} className={classes.grid}>
                  <IconButton
                    onClick={() => handleChange({ profile, index })}
                    edge="start"
                    size="small"
                    className={classes.items}
                  >
                    <Avatar
                      alt={profile.firstName}
                      className={classes.avatar}
                      src={profile.avatar}
                    ></Avatar>
                  </IconButton>
                  <Typography variant="subtitle1" className={classes.items}>
                    {profile.firstName}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <div></div>
        )}
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
        <Popup open={open} setOpen={setOpen} name={`Create a Kid Profile`}>
          <AddKidForm setOpen={setOpen} />
        </Popup>
      </div>
      <div>
        <IconButton onClick={handleAuthClick}>
          Click here to manage family
        </IconButton>
      </div>
      <div>
        <AuthPopup
          open={authOpen}
          setAuthOpen={setAuthOpen}
          name={`Re-enter password`}
        >
          <ReEnterPassword setAuthOpen={setAuthOpen} />
        </AuthPopup>
      </div>
    </div>
  );
}
const mapState = (state) => ({
  isLoggedIn: !!state.firstName,
  firstName: state.firstName,
  child: state.child,
  selectedChild: state.selectedChild,
  verified: state.verified,
});
const mapDispatch = (dispatch) => {
  return {
    selectChild: (child) => dispatch(selectChild(child)),
    authMe: () => dispatch(authMe()),
  };
};
export default connect(mapState, mapDispatch)(FamilyDashboard);

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
    marginBottom: 15,
  },
  grid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexFlow: 'column wrap',
    marginTop: 2,
  },
  items: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexFlow: 'column wrap',
    textDecoration: 'none',
    color: 'black',
  },
  avatar: {
    display: 'flex',
    minWidth: 58,
    minHeight: 58,
  },
});
