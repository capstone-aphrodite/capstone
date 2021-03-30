import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { Typography, makeStyles } from '@material-ui/core';
import SecondaryPopup from '../SecondaryPopUp';
import CongratsDialog from './CongratsDialog';
import { connect } from 'react-redux';

export const useStyles = makeStyles({
  body: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  text: {
    position: 'absolute',
    float: 'center',
    fontFamily: 'atma',
  },
});
function Congrats(props) {
  console.log('CONGRATS PROPS-->', props);
  const classes = useStyles();
  const [runConfetti, setRunConfetti] = useState(true);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setRunConfetti(false);
      setOpen(true);
    }, 4000);
  }, [setRunConfetti]);
  return (
    <>
      <Confetti gravity={0.2} numberOfPieces={250} run={runConfetti} />
      <div className={classes.body}>
        <Typography variant="h3" className={classes.text}>
          YOU DID IT! 🥳
        </Typography>
        <SecondaryPopup open={open} setOpen={setOpen} name="" color="secondary">
          <CongratsDialog {...props} />
        </SecondaryPopup>
      </div>
    </>
  );
}

const mapState = state => ({
  isLoggedIn: !!state.firstName,
  firstName: state.firstName,
  child: state.child,
  selectedChild: state.selectedChild,
});

export default connect(mapState, null)(Congrats);
