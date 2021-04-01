import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { updateChild, deleteChild } from '../Store';
import {
  TextField,
  FormControl,
  FormHelperText,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';

export function EditIncentiveForm({
  childToEdit,
  open,
  setOpen,
  updateChild,
  deleteChild,
}) {
  const classes = useStyles();
  const [text, setText] = useState('');
  const [pointGoal, setPointGoal] = useState('');
  const [rewards, setRewards] = useState(childToEdit.child.rewardOptions);

  function handleSubmit(event) {
    event.preventDefault();
    childToEdit.child.dailyPointGoal = pointGoal;
    childToEdit.child.rewardOptions = rewards;
    updateChild(childToEdit.child);
    console.log('AGAIN CHILD TO EDIT -->', childToEdit);
    setOpen(false);
  }

  function handleDeleteChild(event) {
    event.preventDefault();
    console.log('AGAIN CHILD TO EDIT -->', childToEdit);
    deleteChild(childToEdit.child);
    setOpen(false);
  }

  function handleChange(state, event) {
    state(event.target.value);
  }

  function handleAdd() {
    setRewards([...rewards, text]);
    setText('');
    console.log(text);
  }

  function handleDelete(event) {
    console.log('EVENT.TARGET -->', event.target);
    const deleted = event.target.getAttribute('value');
    console.log('deleted-->', deleted);
    setRewards(rewards.filter((reward) => reward !== deleted));
  }

  useEffect(() => {
    console.log('use effect calling');
    return rewards;
  }, [rewards]);

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <form className={classes.form} onSubmit={handleSubmit}>
        <FormControl>
          <FormHelperText>Current Daily Goal</FormHelperText>
          <TextField
            variant="outlined"
            defaultValue={childToEdit.child.dailyPointGoal}
            label={childToEdit.child.dailyPointGoal}
            type="text"
            onChange={(event) => handleChange(setPointGoal, event)}
            value={pointGoal}
          />
        </FormControl>
        <FormControl>
          <FormHelperText> Current Rewards</FormHelperText>
          <List>
            {!!childToEdit.child.rewardOptions ? (
              rewards.map((reward) => {
                return (
                  <ListItem key={reward}>
                    <ListItemText primary={reward} />
                    <ListItemSecondaryAction onClick={(e) => handleDelete(e)}>
                      <IconButton edge="start" value={reward} name={reward}>
                        <ClearIcon value={reward} name={reward} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })
            ) : (
              <div></div>
            )}
            <OutlinedInput
              label="Add a reward"
              type="text"
              onChange={(event) => handleChange(setText, event)}
              value={text}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    type="button"
                    onClick={() => {
                      handleAdd();
                      setText('');
                    }}
                  >
                    <AddIcon color="primary" />
                  </IconButton>
                </InputAdornment>
              }
            />
          </List>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          className={classes.buttons}
          type="Submit"
        >
          Confirm Changes
        </Button>
        <Button
          variant="outlined"
          className={classes.buttons}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          className={classes.buttons}
          onClick={handleDeleteChild}
        >
          Delete Child
        </Button>
      </form>
    </div>
  );
}

const mapDispatch = (dispatch) => {
  return {
    updateChild: (selectedChild) => dispatch(updateChild(selectedChild)),
    deleteChild: (selectedChild) => dispatch(deleteChild(selectedChild)),
  };
};

export default connect(null, mapDispatch)(EditIncentiveForm);

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexFlow: 'column nowrap',
    padding: 8,
    marginBottom: 7,
  },
  buttons: {
    margin: 7,
  },
});
