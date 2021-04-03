import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  IconButton,
  ListItemText,
  Avatar,
  Typography,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Popup from './Popup';
import EditIncentiveForm from './EditIncentiveForm';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    display: 'block',
    maxWidth: 700,
    margin: '0 auto',
    marginTop: 20,
    paddingRight: 10,
    paddingLeft: 10,
  },
  title: {
    textAlign: 'center',
    paddingTop: 20,
    fontFamily: 'atma',
  },
});
export const ParentDashboard = props => {
  const [open, setOpen] = useState(false);
  const [childToEdit, setChildToEdit] = useState('');
  const classes = useStyles();

  return (
    <div className={classes.table}>
      <Typography variant="h5" className={classes.title}>
        Incentive Dashboard
      </Typography>
      <Typography variant="body2">
        Here is today's progress for your family. Click the edit icon to adjust
        daily goal or available rewards.
      </Typography>
      <TableContainer>
        {props.child.length ? (
          <Table>
            <TableBody>
              {props.child.map(child => {
                return (
                  <TableRow key={child._id}>
                    <TableCell align="center" padding="none">
                      <Avatar src={child.avatar}></Avatar>
                    </TableCell>
                    <TableCell align="left">
                      <ListItemText
                        primary={child.firstName}
                        secondary={`Reward: ${child.selectedReward}`}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <ListItemText
                        primary={child.dailyPoints}
                        secondary={`out of ${child.dailyPointGoal}`}
                      />
                    </TableCell>
                    <TableCell align="right" padding="none">
                      <IconButton
                        onClick={() => {
                          setChildToEdit({ child });
                          setOpen(true);
                        }}
                        aria-label="edit"
                      >
                        <EditOutlinedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <div>No children</div>
        )}

        <Popup open={open} setOpen={setOpen} name={`Edit Incentives`}>
          <EditIncentiveForm
            childToEdit={childToEdit}
            open={open}
            setOpen={setOpen}
          />
        </Popup>
      </TableContainer>
    </div>
  );
};

const mapState = state => ({
  isLoggedIn: !!state.firstName,
  firstName: state.firstName,
  child: state.child,
});

const mapDispatch = dispatch => {
  return {};
};

export default connect(mapState, mapDispatch)(ParentDashboard);
