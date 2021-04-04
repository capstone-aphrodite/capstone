import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { Typography, makeStyles } from '@material-ui/core';
import CongratsPopup from '../Popups/CongratsPopUp';
import CongratsMessage from '../PopupViews/CongratsMessage';
import { connect } from 'react-redux';

function CongratsScreen(props) {
  const classes = useStyles();
  const [runConfetti, setRunConfetti] = useState(true);
  const [open, setOpen] = useState(false);
  const noderef = React.useRef(null);
  useEffect(() => {
    setTimeout(() => {
      setRunConfetti(false);
      setOpen(true);
    }, 4000);
  }, [setRunConfetti]);
  return (
    <div>
      <Confetti
        gravity={0.2}
        numberOfPieces={250}
        run={runConfetti}
        noderef={noderef}
      />
      <div className={classes.body}>
        <Typography variant="h3" className={classes.text}>
          YOU DID IT! 🥳
        </Typography>
        <CongratsPopup open={open} setOpen={setOpen} name="" color="secondary">
          <CongratsMessage {...props} />
        </CongratsPopup>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  isLoggedIn: !!state.firstName,
  firstName: state.firstName,
  children: state.children,
  selectedChild: state.selectedChild,
});

export default connect(mapState, null)(CongratsScreen);

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
