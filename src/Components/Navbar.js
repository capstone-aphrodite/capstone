import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../Store';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    padding: 4,
  },
  header: {
    fontFamily: 'Atma',
    fontWeight: 500,
    alignItems: 'center',
    fontSize: 31,
    padding: 0,
  },
  right: {
    display: 'flex',
    width: '100%',
    margin: 0,
    justifyContent: 'flex-end',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
export function Navbar({ handleClick }) {
  const history = useHistory();
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.root}>
          <div className={classes.left}>
            <IconButton
              edge="start"
              aria-label="menu"
              color="inherit"
              onClick={() => history.push('/')}
            >
              <HomeIcon fontSize="large" />
            </IconButton>
            <Typography variant="h6" className={classes.header}>
              Wigglee
            </Typography>
          </div>
          <div className={classes.right}>
            <IconButton color="inherit" aria-label="menu" position="static">
              <MeetingRoomIcon fontSize="large" onClick={handleClick} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapDispatch = (dispatch) => {
  return {
    handleClick: () => dispatch(logout()),
  };
};

export default connect(null, mapDispatch)(Navbar);

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
