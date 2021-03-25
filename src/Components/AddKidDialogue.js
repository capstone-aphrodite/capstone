import React from 'react';
import { Dialog, DialogTitle, Grid, TextField } from '@material-ui/core';

export default function AddKidDialogue() {
  return (
    <Dialog>
      <DialogTitle>Add a Kid Profile</DialogTitle>
      <Grid>
        <TextField label="firstName" />
      </Grid>
    </Dialog>
  );
}
