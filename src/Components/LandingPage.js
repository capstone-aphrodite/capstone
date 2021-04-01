import React from 'react';
import { Button, Typography, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  body: {
    background:
      'linear-gradient( 219deg, rgba(255,209,102,1) 0%, rgba(239,71,111,1) 51%, rgba(17,138,178,1) 100%)',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    overflow: 'hidden',
    display: 'flex',
    width: '100%',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontFamily: 'Atma',
    padding: 0,
    margin: 20,
    marginBottom: 0,
  },
  subtitle: {
    paddingRight: 10,
    paddingLeft: 10,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  items: {
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default function LandingPage() {
  const classes = useStyles();
  return (
    <div className={classes.body}>
      <Grid container spacing={2}>
        <Grid item={true} xs={12}>
          <Typography className={classes.title} variant="h3">
            Get your kids moving!
          </Typography>
        </Grid>
        <Grid item={true} xs={12} className={classes.subtitle}>
          <Typography variant="subtitle1">
            The app to incentivize healthy movement while we're stuck at home.
          </Typography>
        </Grid>

        <Grid item={true} xs={12} className={classes.items}>
          <Button component={Link} to="/login" variant="contained">
            Login
          </Button>
        </Grid>
        <Grid item={true} xs={12} className={classes.items}>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            color="secondary"
          >
            Signup
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
