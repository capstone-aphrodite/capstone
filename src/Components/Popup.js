import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';

export default function AddKidDialogue(props) {
  const { open, setOpen, children } = props;
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Add a Kid Profile</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
