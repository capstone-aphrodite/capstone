import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  background: {
    display: 'flex',
    padding: 8,
    margin: 2,
    flexFlow: 'column nowrap',
    justifyItems: 'center',
    alignItems: 'center',
  },
});

export default function AddKidDialogue(props) {
  const classes = useStyles();
  const { open, setOpen, children } = props;
  return (
    <Dialog
      className={classes.background}
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle>Add a Kid Profile</DialogTitle>
      <DialogContent className={classes.background}>{children}</DialogContent>
    </Dialog>
  );
}
