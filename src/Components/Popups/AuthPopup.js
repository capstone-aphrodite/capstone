import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function AuthPopup(props) {
  const classes = useStyles();
  const { open, setAuthOpen, color, children, name } = props;
  return (
    <Dialog
      className={classes.background}
      open={open}
      onClose={() => setAuthOpen(false)}
      color={color || 'inherit'}
    >
      {name !== '' ? <DialogTitle>{name}</DialogTitle> : <></>}
      <DialogContent className={classes.background}>{children}</DialogContent>
    </Dialog>
  );
}

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
