import React, { useRef, useEffect } from 'react';
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

export default function EditIncentiveForm({ childToEdit, open, setOpen }) {
  const classes = useStyles();
  const rewardToAdd = useRef();
  function handleSubmit(event) {
    event.preventDefault();
    setOpen(false);
  }
  function handleChange(event) {
    console.log('REF', rewardToAdd.current.value);
  }
  function handleAdd(event) {
    console.log('EVENT TARGET -->', event.target);
  }

  function handleDelete(event) {
    console.log('event.target -->', event.target);
    console.log('event.target.value -->', event.target.value);
    return childToEdit.child.rewardOptions.filter(reward => {
      if (reward !== event.target.value) {
        return reward;
      }
    });
  }
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
          />
        </FormControl>
        <FormControl>
          <FormHelperText> Current Rewards</FormHelperText>
          <List>
            {!!childToEdit.child.rewardOptions ? (
              childToEdit.child.rewardOptions.map(reward => {
                return (
                  <ListItem>
                    <ListItemSecondaryAction
                      name="reward"
                      value={reward}
                      onClick={handleDelete}
                    >
                      <IconButton edge="start">
                        <ClearIcon value={reward} />
                      </IconButton>
                    </ListItemSecondaryAction>
                    <ListItemText primary={reward} />
                  </ListItem>
                );
              })
            ) : (
              <div></div>
            )}
            <OutlinedInput
              label="Add a reward"
              variant="filled"
              type="text"
              ref={rewardToAdd}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton>
                    <AddIcon color="primary" onClick={handleAdd} />
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
      </form>
    </div>
  );
}
