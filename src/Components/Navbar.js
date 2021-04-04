import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Chip,
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout, selectChild } from '../Store';
import { makeStyles } from '@material-ui/core/styles';

export function Navbar({ handleClick, selectedChild, isLoggedIn }) {
  const history = useHistory();
  const classes = useStyles();
  selectedChild = selectedChild || {};
  return (
    <div>
      <AppBar
        position="static"
        color={selectedChild._id ? 'secondary' : 'primary'}
      >
        <Toolbar className={classes.root}>
          <div className={classes.left}>
            <IconButton
              edge="start"
              aria-label="menu"
              color="inherit"
              label={selectedChild.firstName}
              onClick={() => {
                history.push('/');
              }}
            >
              <DashboardIcon fontSize="large" />
            </IconButton>
            {selectedChild && selectedChild.firstName && (
              <IconButton
                onClick={() =>
                  history.push(`/childdashboard/${selectedChild.index}`)
                }
              >
                <Chip
                  avatar={
                    <Avatar
                      alt={selectedChild.firstName}
                      src={selectedChild.avatar}
                    ></Avatar>
                  }
                  component="a"
                  href={`/childdashboard/${selectedChild.index}`}
                  variant="outlined"
                  className={classes.chip}
                  label={selectedChild.firstName}
                />
              </IconButton>
            )}
            <Typography variant="h6" className={classes.header}>
              Wigglee
            </Typography>
          </div>
          {isLoggedIn && (
            <div className={classes.right}>
              <IconButton
                color="inherit"
                aria-label="logout"
                position="static"
                onClick={handleClick}
              >
                <MeetingRoomIcon fontSize="large" />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapState = state => ({
  isLoggedIn: !!state.firstName,
  selectedChild: state.selectedChild,
});

const mapDispatch = dispatch => {
  return {
    handleClick: () => dispatch(logout()),
    selectChild: () => dispatch(selectChild()),
  };
};

export default connect(mapState, mapDispatch)(Navbar);

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

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
  chip: {
    color: 'black',
    border: '1px solid black',
  },
});
