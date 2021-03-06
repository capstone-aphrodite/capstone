import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function Popup(props) {
  const classes = useStyles();
  const { open, setOpen, children, name, color } = props;
  return (
    <Dialog
      className={classes.background}
      open={open}
      onClose={() => setOpen(false)}
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
