import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div id="landing-page">
      <Typography variant="h1">Get your kids moving!</Typography>
      <div id="buttons">
        <Button
          id="landing-page-button1"
          component={Link}
          to="/login"
          variant="contained"
          color="primary"
        >
          Login
        </Button>
        <Button
          id="landing-page-button2"
          component={Link}
          to="/signup"
          variant="contained"
          color="primary"
        >
          Signup
        </Button>
      </div>
    </div>
  );
}
