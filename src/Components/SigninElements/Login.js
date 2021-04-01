import React from 'react';
import {
  Input,
  InputLabel,
  Button,
  FormControl,
  Typography,
  Snackbar,
  SnackbarContent,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { authUser } from '../../Store';
import { _setStatus } from '../../Store';

export const useStyles = makeStyles({
  root: {
    minWidth: 250,
    maxWidth: 375,
    height: '100vh',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flexFlow: 'column nowrap',
    padding: 20,
    margin: 'auto',
  },
  items: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: '20px',
  },
  link: {
    fontWeight: 500,
    textDecoration: 'none',
    marginLeft: 3,
    marginRight: 3,
    color: 'primary',
  },
});
export function Login(props) {
  const classes = useStyles();
  const { authUser, status } = props;
  const [open, setOpen] = React.useState(false);
  const noderef = React.useRef(null);
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    authUser({ email, password });
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    dispatch(_setStatus(null));
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <FormControl required variant="outlined" className={classes.items}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input name="email" type="text" className={classes.items} />
        </FormControl>
        <FormControl required className={classes.items}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input name="password" type="password" className={classes.items} />
        </FormControl>

        <Button
          type="submit"
          color="primary"
          variant="contained"
          className={classes.items}
          onSubmit={handleSubmit}
          disableElevation
        >
          Login
        </Button>
      </form>
      {status && (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          noderef={noderef}
        >
          <SnackbarContent
            style={{ backgroundColor: 'red' }}
            message={status}
          />
        </Snackbar>
      )}
      <Typography variant="body2" className={classes.items}>
        New to Wigglee? Click
        <Link to="/signup" className={classes.link}>
          here
        </Link>
        to sign up
      </Typography>
    </div>
  );
}

const mapState = (state) => ({
  firstName: state.firstName,
  child: state.child,
  status: state.status,
});

const mapDispatch = (dispatch, { history }) => ({
  authUser: (user) => dispatch(authUser(user, 'login', history)),
});

export default connect(mapState, mapDispatch)(Login);
