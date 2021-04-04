import React, { useEffect } from 'react';
import { Grid, TextField, Button, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect, useDispatch } from 'react-redux';
import { verifyPassword } from '../Store';
import history from '../history';
import { _setStatus, _verifyPassword } from '../Store';
import Alert from '@material-ui/lab/Alert';

export const ReEnterPassword = (props) => {
  let { verifyPassword, setAuthOpen, verified, status } = props;
  const [open, setOpen] = React.useState(false);
  const noderef = React.useRef(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  async function handleSubmit(event) {
    event.preventDefault();
    const password = event.target.password.value;
    await verifyPassword({ password });
    setOpen(true);
  }

  useEffect(() => {
    if (verified) {
      history.push('/home/admin');
      dispatch(_setStatus(null));
      dispatch(_verifyPassword(false));
    }
  }, [verified, dispatch, setAuthOpen]);

  const handleClose = () => {
    setAuthOpen(false);
    dispatch(_setStatus(null));
  };

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
        {status && (
          <Alert
            open={open}
            severity="error"
            color="error"
            variant="outlined"
            // autoHideDuration={3000}
            onClose={handleClose}
            noderef={noderef}
          >
            {status}
          </Alert>
        )}
      </form>
    </>
  );
};

const mapState = (state) => ({
  email: state.email,
  verified: state.verified,
  status: state.status,
});

const mapDispatch = (dispatch, { history }) => ({
  verifyPassword: (password) => dispatch(verifyPassword(password)),
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
