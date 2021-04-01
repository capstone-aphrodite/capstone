import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import { logout, selectChild } from '../Store';
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
  avatar: {
    minWidth: 40,
    minHeight: 40,
  },
});
export function Navbar({ handleClick, selectedChild }) {
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
                <Avatar
                  alt={selectedChild.firstName}
                  src={selectedChild.avatar}
                  className={classes.avatar}
                  component="div"
                ></Avatar>
                {selectedChild.firstName}
              </IconButton>
            )}
            <Typography variant="h6" className={classes.header}>
              Wigglee
            </Typography>
          </div>
          <div className={classes.right}>
            <IconButton
              color="inherit"
              aria-label="menu"
              position="static"
              onClick={handleClick}
            >
              <MeetingRoomIcon fontSize="large" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapState = state => ({
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
