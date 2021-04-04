import React, { useEffect } from 'react';
import { Grid, TextField, Button, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { verifyPassword } from '../Store';
import history from '../history';

export const ReEnterPassword = props => {
  const { verifyPassword, setAuthOpen, verified } = props;
  const classes = useStyles();
  async function handleSubmit(event) {
    event.preventDefault();
    const password = event.target.password.value;
    await verifyPassword({ password });
  }

  useEffect(() => {
    if (verified) {
      history.push('/home/admin');
      setAuthOpen(false);
    }
  }, [verified, setAuthOpen]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container className={classes.root} spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="filled-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              name="password"
            />
            <FormHelperText> Re-enter your password</FormHelperText>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="outlined"
              type="submit"
              color="primary"
              className={classes.button}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

const mapState = state => ({
  email: state.email,
  verified: state.verified,
});

const mapDispatch = (dispatch, { history }) => ({
  verifyPassword: password => dispatch(verifyPassword(password)),
});

export default connect(mapState, mapDispatch)(ReEnterPassword);

const useStyles = makeStyles({
  root: {
    minWidth: '250px',
    maxWidth: '100%',
    margin: '4px',
    marginTop: 0,
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    float: 'right',
    margin: 5,
  },
});
