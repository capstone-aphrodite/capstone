import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link
          to="/childdashboard"
          style={{ color: 'white', marginRight: '10px' }}
        >
          <HomeIcon fontSize="large" />
        </Link>
        <Typography variant="h6">APP NAME</Typography>
      </Toolbar>
    </AppBar>
  );
}
