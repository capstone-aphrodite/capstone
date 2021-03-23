import React from 'react';
import {
  Input,
  InputLabel,
  Button,
  FormControl,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
// import axios from 'axios';

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
export default function Login() {
  const classes = useStyles();

  function handleSubmit(event) {
    event.preventDefault();
    console.log('CLICKED');
    console.log('email --->', event.target.email.value);
    console.log('password --->', event.target.password.value);
    // axios.get('/api/users', email, password);
  }
  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <FormControl variant="outlined" className={classes.items}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input name="email" type="text" className={classes.items} />
        </FormControl>
        <FormControl className={classes.items}>
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
        New to "APP NAME"? Click
        <Link to="/signup" className={classes.link}>
          here
        </Link>
        to sign up
      </Typography>
    </div>
  );
}
