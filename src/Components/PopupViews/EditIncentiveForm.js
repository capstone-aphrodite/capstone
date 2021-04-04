import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { updateChild, deleteChild } from '../../Store';
import {
  TextField,
  FormControl,
  FormHelperText,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
  makeStyles,
  Snackbar,
  SnackbarContent,
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
  const [pointGoal, setPointGoal] = useState(childToEdit.dailyPointGoal);
  const [rewards, setRewards] = useState(childToEdit.rewardOptions);
  const [incompleteForm, setIncompleteForm] = useState('');
  const noderef = React.useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    if (pointGoal < 20) {
      setIncompleteForm('Daily Point Goal needs to be at least 20 points');
      return;
    } else if (rewards.length < 3) {
      setIncompleteForm('You must have at least three rewards');
      return;
    } else {
      setIncompleteForm('');
      childToEdit.dailyPointGoal = pointGoal;
      childToEdit.rewardOptions = rewards;
      updateChild(childToEdit);
      setOpen(false);
    }
  }

  function handleDeleteChild(event) {
    event.preventDefault();
    deleteChild(childToEdit);
    setOpen(false);
  }

  function handleChange(state, event) {
    state(event.target.value);
  }

  function handleAdd() {
    setRewards([...rewards, text]);
    setText('');
  }

  function handleDelete(event) {
    const deleted = event.target.getAttribute('value');
    setRewards(rewards.filter((reward) => reward !== deleted));
  }

  useEffect(() => {
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
            defaultValue={pointGoal}
            type="text"
            onChange={(event) => handleChange(setPointGoal, event)}
            value={pointGoal}
          />
        </FormControl>
        <FormControl>
          <FormHelperText> Current Rewards</FormHelperText>
          <List>
            {!!childToEdit.rewardOptions ? (
              rewards.map((reward, index) => {
                return (
                  <ListItem key={index}>
                    <ListItemText primary={reward} />
                    <ListItemSecondaryAction onClick={(e) => handleDelete(e)}>
                      <IconButton edge="start" value={reward} name={reward}>
                        <ClearIcon
                          value={reward}
                          name={reward}
                          color={'error'}
                        />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })
            ) : (
              <div></div>
            )}
            <OutlinedInput
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
          disableElevation
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
          color={'error'}
          className={classes.cancel}
          onClick={handleDeleteChild}
        >
          Delete Child
        </Button>
      </form>
      {incompleteForm && (
        <Snackbar open={open} autoHideDuration={3000} noderef={noderef}>
          <SnackbarContent
            style={{ backgroundColor: 'red' }}
            message={incompleteForm}
          />
        </Snackbar>
      )}
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
  cancel: {
    margin: 7,
    border: 'red 1px solid',
    color: 'red',
  },
});
