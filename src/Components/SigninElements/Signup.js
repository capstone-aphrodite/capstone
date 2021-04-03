import React, { useState, useRef } from 'react';
import {
  Input,
  InputLabel,
  Button,
  FormControl,
  Typography,
  TextField,
  FormHelperText,
  Paper,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useStyles } from './Login';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { authUser } from '../../Store';
import { _setStatus } from '../../Store';

export function Signup(props) {
  const { authUser, status } = props;
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const noderef = useRef(null);
  const dispatch = useDispatch();
  console.log('STATUS ERROR -->', status);
  function handleSubmit(event) {
    event.preventDefault();
    setError('');
    console.log('CLICKED');
    if (event.target.password.value !== event.target.confirmPassword.value) {
      setError("Oops, it looks like these passwords don't match");
    }
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    authUser({ firstName, lastName, email, password });
  }
  const handleClose = () => {
    setOpen(false);
    dispatch(_setStatus(null));
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper} component="div">
        <form onSubmit={handleSubmit} className={classes.form}>
          <Typography variant="h5" className={classes.title}>
            Get ready to move!
          </Typography>
          <Typography variant="body2">
            Enter your information to create your account.
          </Typography>
          <FormControl required className={classes.items}>
            <InputLabel htmlFor="firstName">First Name</InputLabel>
            <Input
              name="firstName"
              type="text"
              className={classes.items}
              size="small"
              margin="dense"
            />
          </FormControl>
          <FormControl required className={classes.items}>
            <InputLabel htmlFor="lastName">LastName</InputLabel>
            <Input
              name="lastName"
              type="text"
              className={classes.items}
              size="small"
              margin="dense"
            />
          </FormControl>
          <FormControl required className={classes.items}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              name="email"
              type="text"
              className={classes.items}
              size="small"
              margin="dense"
            />
          </FormControl>

          <FormControl required className={classes.items}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              className={classes.items}
              size="small"
              margin="dense"
            />
            {error && <FormHelperText error>{error}</FormHelperText>}
          </FormControl>
          <FormControl required className={classes.items}>
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <Input
              name="confirmPassword"
              type="password"
              className={classes.items}
              size="small"
              margin="dense"
            />
          </FormControl>
          <FormControl className={classes.items}>
            <InputLabel htmlFor="dateOfBirth" shrink>
              Date of Birth
            </InputLabel>
            <TextField
              name="year"
              type="date"
              className={classes.items}
              defaultValue="1985-01-01"
              placeholder="MM/DD/YYYY"
            />
            <FormHelperText>
              {' '}
              Don't worry, we just need to verify your a grown-up
            </FormHelperText>
          </FormControl>

          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={classes.items}
            onSubmit={handleSubmit}
            disableElevation
          >
            Create Account
          </Button>
        </form>
        {status && (
          <Alert
            open={open}
            severity="error"
            color="error"
            variant="outlined"
            autoHideDuration={3000}
            onClose={handleClose}
            noderef={noderef}
          >
            {status}
          </Alert>
        )}
        <Typography variant="body2" className={classes.items}>
          Already a member? Click
          <Link to="/login" className={classes.link}>
            here
          </Link>
          to login
        </Typography>
      </Paper>
    </div>
  );
}

const mapState = state => ({
  firstName: state.firstName,
  child: state.child,
  status: state.status,
});

const mapDispatch = (dispatch, { history }) => ({
  authUser: user => dispatch(authUser(user, 'signup', history)),
});

export default connect(mapState, mapDispatch)(Signup);
