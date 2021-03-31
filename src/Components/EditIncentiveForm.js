import React, { useRef } from 'react';
import {
  TextField,
  FormControl,
  FormHelperText,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

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
                    <ListItemIcon>
                      <Checkbox edge="start" value={reward} />
                    </ListItemIcon>
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
