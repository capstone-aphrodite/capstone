import React from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  background: {
    backgroundColor: '#1ED882',
    display: 'flex',
    padding: 15,
    margin: 4,
    flexFlow: 'column nowrap',
    justifyItems: 'center',
    alignItems: 'center',
  },
});

export default function SecondaryPopup(props) {
  const noderef = React.useRef(null);
  const classes = useStyles();
  const { open, setOpen, children, name } = props;
  console.log('name --->', name);
  return (
    <Dialog
      noderef={noderef}
      PaperProps={{ background: 'transparent' }}
      open={open}
      onClose={() => setOpen(false)}
      color="secondary"
    >
      <DialogContent className={classes.background}>{children}</DialogContent>
    </Dialog>
  );
}
