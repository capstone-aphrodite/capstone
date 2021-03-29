import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { Typography, Button } from '@material-ui/core';

export default function Congrats() {
  const [runConfetti, setRunConfetti] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setRunConfetti(false);
    }, 7000);
  }, [setRunConfetti]);
  return (
    <div>
      <Confetti gravity={0.2} numberOfPieces={250} run={runConfetti} />
      <Typography variant="h3">YOU DID IT!</Typography>
      <Button variant="outlined" color="primary">
        Pick a new move!
      </Button>
    </div>
  );
}
