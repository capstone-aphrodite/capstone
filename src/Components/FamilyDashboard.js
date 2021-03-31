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
import { Link } from 'react-router-dom';

function FamilyDashboard(props) {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const classes = pageStyles();
  const { selectChild } = props;
  useEffect(() => {
    authMe();
    selectChild({});
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        Welcome, {props.firstName}!
      </Typography>
      <div>
        {!!props.child ? (
          <Grid
            container
            spacing={5}
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
    </div>
  );
}
const mapState = (state) => ({
  isLoggedIn: !!state.firstName,
  firstName: state.firstName,
  child: state.child,
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
