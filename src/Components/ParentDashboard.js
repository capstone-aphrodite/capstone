import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  List,
  ListItem,
  ListItemAvatar,
  IconButton,
  Divider,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
  Typography,
} from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Popup from './Popup';
import EditIncentiveForm from './EditIncentiveForm';

export const ParentDashboard = props => {
  const [open, setOpen] = useState(false);
  const [childToEdit, setChildToEdit] = useState('');

  return (
    <div>
      <Typography variant="h5">Incentive Dashboard</Typography>
      <Typography variant="subtitle1">
        Here's today's progress. Click the edit icon to adjust daily goal or
        available rewards.
      </Typography>
      {props.child.length ? (
        <List>
          {props.child.map(child => {
            return (
              <ListItem key={child._id}>
                <ListItemAvatar>
                  <Avatar src={child.avatar}></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={child.firstName}
                  secondary={`Reward: ${child.selectedReward}`}
                />
                <ListItemText
                  primary={child.dailyPoints}
                  secondary={`out of ${child.dailyPointGoal}`}
                />
                <ListItemSecondaryAction
                  onClick={() => {
                    setChildToEdit({ child });
                    setOpen(true);
                  }}
                >
                  <IconButton edge="end">
                    <EditOutlinedIcon />
                  </IconButton>
                </ListItemSecondaryAction>
                <Divider />
              </ListItem>
            );
          })}
        </List>
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
