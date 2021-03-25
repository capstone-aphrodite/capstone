import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link
          to="/childdashboard"
          style={{ color: 'white', marginRight: '10px' }}
        >
          <FontAwesomeIcon id="home" icon={faHome} />
        </Link>
        <Typography variant="h6">APP NAME</Typography>
      </Toolbar>
    </AppBar>
  );
}
