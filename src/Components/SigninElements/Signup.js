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
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { authUser } from '../../Store';
import { _setStatus } from '../../Store';
import { makeStyles } from '@material-ui/core/styles';

export function Signup(props) {
  const { authUser, status } = props;
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const noderef = useRef(null);
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    setError('');
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
            <InputLabel htmlFor="lastName">Last Name</InputLabel>
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
              Don't worry, we just need to verify you're a grown-up
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
            onClose={handleClose}
            noderef={noderef}
          >
            {status}
          </Alert>
        )}
        <Typography variant="body2" className={classes.items}>
          Already a member? Click
          <Link
            to="/login"
            className={classes.link}
            variant="body2"
            color="primary"
          >
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

export const useStyles = makeStyles({
  root: {
    background:
      'linear-gradient( 219deg, rgba(255,209,102,1) 0%, rgba(239,71,111,1) 51%, rgba(17,138,178,1) 100%)',
    backgroundAttachment: 'fixed',
    height: '100vh',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flexFlow: 'column nowrap',
  },
  paper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    margin: 'auto',
    marginTop: 30,
    maxWidth: 800,
    maxHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  form: {
    padding: 10,
    paddingBottom: 5,
    margin: 10,
  },
  title: {
    fontFamily: 'atma',
  },
  items: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: '12px',
  },
  link: {
    marginLeft: 4,
    marginRight: 4,
    textDecoration: 0,
    fontWeight: 'bold',
    color: '#118AB2',
  },
});
