import React from 'react';
import {
  Input,
  InputLabel,
  Button,
  FormControl,
  Typography,
  Paper,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { authUser } from '../../Store';
import { _setStatus } from '../../Store';

export const useStyles = makeStyles({
  root: {
    background:
      'linear-gradient( 219deg, rgba(255,209,102,1) 0%, rgba(239,71,111,1) 51%, rgba(17,138,178,1) 100%)',
    backgroundAttachment: 'fixed',
    height: '95vh',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flexFlow: 'column nowrap',
  },
  paper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    margin: 'auto',
    maxWidth: 800,
    maxHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  form: {
    padding: 10,
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
    marginTop: '20px',
  },
  link: {
    fontWeight: 500,
    textDecoration: 'none',
    marginLeft: 3,
    marginRight: 3,
    marginBottom: 12,
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
      <Paper className={classes.paper} component="div">
        <form onSubmit={handleSubmit} className={classes.form}>
          <Typography variant="h5" className={classes.title}>
            Welcome Back!
          </Typography>
          <Typography variant="body2">
            Enter your login credentials below
          </Typography>
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
        <Typography variant="body2" className={classes.items}>
          New to Wigglee? Click
          <Link to="/signup" className={classes.link}>
            here
          </Link>
          to sign up
        </Typography>

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
  authUser: user => dispatch(authUser(user, 'login', history)),
});

export default connect(mapState, mapDispatch)(Login);
