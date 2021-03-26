import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

export default function Navbar() {
  return (
<<<<<<< HEAD
    <AppBar position="static">
      <Toolbar>
        <Link
          to="/childdashboard"
          style={{ color: 'white', marginRight: '10px' }}
        >
          <HomeIcon fontSize="large" />
=======
    <div>
      <nav id="nav">
        <Link to="/">
          <FontAwesomeIcon id="home" icon={faHome} />
>>>>>>> 727f964acbeaeff1a3441c22cb5b73991a42702b
        </Link>
        <Typography variant="h6">APP NAME</Typography>
      </Toolbar>
    </AppBar>
  );
}
