import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  InputLabel,
  Avatar,
  Select,
  MenuItem,
  Typography,
  ListItemAvatar,
  FormHelperText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const avatars = [
  { name: 'Parrot', image: '/images/parrot.png' },
  { name: 'Penguin', image: '/images/penguin.png' },
  { name: 'Puffer-fish', image: '/images/puffer-fish.png' },
  { name: 'Zebra', image: '/images/zebra.png' },
  { name: 'Sloth', image: '/images/sloth.png' },
  { name: 'Giraffe', image: '/images/giraffe.png' },
];
const useStyles = makeStyles({
  root: {
    midWidth: 250,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const AddKidForm = props => {
  const { setOpen } = props;
  const classes = useStyles();
  const [avatarURL, setAvatarURL] = useState('');
  function handleSubmit(event) {
    event.preventDefault();
    console.log('FIRST NAME-->', event.target.first.value);
    console.log('BIRTHDAY', event.target.birthday.value);
    console.log('ITEM LISTED', avatarURL);
    setOpen(false);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container className={classes.root} spacing={3}>
          <Grid item xs={6}>
            <TextField required label="Kid's name" name="first" />
          </Grid>
          <Grid item xs={6}>
            <InputLabel htmlFor="birthday" shrink>
              Birthday
            </InputLabel>
            <TextField required name="birthday" type="date" />
          </Grid>
          <FormHelperText>Choose your avatar</FormHelperText>
          <Select onChange={event => setAvatarURL(event.target.value)}>
            {/* <InputLabel htmlFor="avatar">Choose your avatar</InputLabel> */}
            {avatars.map((avatar, index) => (
              <MenuItem key={avatar.name} selected={index} value={avatar.image}>
                <ListItemAvatar>
                  <Avatar alt={avatar.name} src={avatar.image} />
                </ListItemAvatar>
                <Typography variant="subtitle1">{avatar.name}</Typography>
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Button variant="outlined" type="submit" color="secondary">
          Go!
        </Button>
      </form>
    </>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: !!state.firstName,
  state,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddKidForm);
