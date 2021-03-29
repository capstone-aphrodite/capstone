import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import * as tmPose from '@teachablemachine/pose';
import { connect } from 'react-redux';
import { updateChild } from '../../Store';

//*********** UPDATE to {exercise.count}
let totalCount = 5;
let startAnimation;
let startAnimation2;

const SingleExercise = ({ match, selectedChild }) => {
  const [finishedExercise, setFinished] = useState(false);
  //match = props.match because of react router
  const id = match.params.id;
  //id= match.params.id because of react router
  let previousPose;
  const URL = `https://teachablemachine.withgoogle.com/models/${id}/`;
  //depending on the id it will execute a different code
  let model, webcam, ctx;

  async function init() {
    const modelURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await tmPose.load(modelURL, metadataURL);
    // maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const size = 200;
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(size, size, flip); // width, height, flip

    await webcam.setup({ facingMode: 'user' });
    let iosVid = document.getElementById('canvas');
    iosVid.appendChild(webcam.webcam);
    let videoElement = document.getElementsByTagName('video')[0];
    videoElement.setAttribute('playsinline', true);
    videoElement.muted = 'true';
    videoElement.id = 'webcamVideo';

    // request access to the webcam
    await webcam.play();
    startAnimation = window.requestAnimationFrame(loop);

    // append/get elements to the DOM
    const canvas = document.getElementById('canvas');
    canvas.width = size;
    canvas.height = size;
    ctx = canvas.getContext('2d');
  }

  async function loop(timestamp) {
    webcam.update(); // update the webcam frame
    await predict();
    startAnimation2 = window.requestAnimationFrame(loop);
  }

  async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);

    let repContainer = document.getElementById('rep-container');

    if (totalCount > 0) {
      if (prediction[0].probability.toFixed(2) >= 0.75) {
        if (prediction[0].className !== previousPose) {
          totalCount--;
          console.log('Prediction 1: ', totalCount);
          previousPose = prediction[0].className;
        }
      } else if (prediction[1].probability.toFixed(2) >= 0.75) {
        if (prediction[1].className !== previousPose) {
          totalCount--;
          console.log('Prediction 2: ', totalCount);
          repContainer.innerHTML = `You have ${Math.ceil(
            totalCount / 2
          )} left!`;
          previousPose = prediction[1].className;
        }
      }
    } else {
      setFinished(true);
    }

    // finally draw the poses
    drawPose(pose);
  }

  function drawPose(pose) {
    if (webcam.canvas) {
      ctx.drawImage(webcam.canvas, 0, 0);
      // draw the keypoints and skeleton
      if (pose) {
        const minPartConfidence = 0.5;
        tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
      }
    }
  }

  useEffect(() => {
    init();

    return function cleanup() {
      // let { dailyPoints } = selectedChild;
      if (finishedExercise === true) setFinished(false);
      totalCount = 0;
      selectedChild.dailyPoints+=10;
      updateChild(selectedChild, id);
      window.cancelAnimationFrame(startAnimation);
      window.cancelAnimationFrame(startAnimation2);
    };
  }, []);

  return (
    <div>
      <div>
        {finishedExercise ? (
          <Redirect to="/congrats" />
        ) : (
          <canvas id="canvas"></canvas>
        )}
      </div>
      <div id="rep-container">Loading...</div>
    </div>
  );
};

const mapState = (state) => {
  return {
    selectedChild: state.selectedChild,
  };
};
const mapDispatch = dispatch => {
  return {
    updateChild: (selectedChild, id) => dispatch(updateChild(selectedChild, id))
  }
}
export default connect(mapState, mapDispatch)(SingleExercise);
