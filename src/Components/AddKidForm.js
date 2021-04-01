import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  Avatar,
  Select,
  MenuItem,
  Typography,
  ListItemAvatar,
  FormHelperText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { addKid } from '../Store';

const avatars = [
  { name: 'Parrot', image: '/images/parrot.png' },
  { name: 'Penguin', image: '/images/penguin.png' },
  { name: 'Puffer-fish', image: '/images/puffer-fish.png' },
  { name: 'Zebra', image: '/images/zebra.png' },
  { name: 'Sloth', image: '/images/sloth.png' },
  { name: 'Giraffe', image: '/images/giraffe.png' },
];

export const AddKidForm = (props) => {
  const { setOpen, addKid } = props;
  const classes = useStyles();
  const [avatarURL, setAvatarURL] = useState('');
  function handleSubmit(event) {
    event.preventDefault();
    const firstName = event.target.first.value;
    const avatar = avatarURL;
    addKid({ firstName, avatar });
    setOpen(false);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container className={classes.root} spacing={3}>
          <Grid item xs={6}>
            <TextField required label="Kid's name" name="first" />
          </Grid>
          <FormHelperText>Choose your avatar</FormHelperText>
          <Select
            required
            onChange={(event) => setAvatarURL(event.target.value)}
            defaultValue=""
          >
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
        <Button
          variant="outlined"
          type="submit"
          color="secondary"
          className={classes.button}
        >
          Go!
        </Button>
      </form>
    </>
  );
};

const mapState = (state) => ({
  isLoggedIn: !!state.firstName,
  // state,
});

const mapDispatch = (dispatch) => ({
  addKid: (kid) => dispatch(addKid(kid)),
});

export default connect(mapState, mapDispatch)(AddKidForm);

const useStyles = makeStyles({
  root: {
    minWidth: '250px',
    maxWidth: '100%',
    margin: '4px',
    marginTop: 0,
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    float: 'right',
    margin: 5,
  },
});
