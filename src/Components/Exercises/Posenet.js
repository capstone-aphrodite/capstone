import React, { useEffect } from 'react';
import * as tmPose from '@teachablemachine/pose';

let rightCount = 0;
let leftCount = 0;

export default function Posenet() {
  let previousPose;
  const URL = 'https://teachablemachine.withgoogle.com/models/4pzrBNLH3/';
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

    await webcam.play();
    window.requestAnimationFrame(loop);

    // append/get elements to the DOM
    const canvas = document.getElementById('canvas');
    canvas.width = size;
    canvas.height = size;
    ctx = canvas.getContext('2d');

    // removes prediction labels below image

    // labelContainer = document.getElementById('label-container');
    // for (let i = 0; i < maxPredictions; i++) {
    //   // and class labels
    //   labelContainer.appendChild(document.createElement('div'));
    // }
  }

  async function loop(timestamp) {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
  }

  async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);

    // removes prediction labels below image

    // for (let i = 0; i < maxPredictions; i++) {
    //   const classPrediction =
    //     prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
    //   labelContainer.childNodes[i].innerHTML = classPrediction;
    // }

    let repContainer = document.getElementById('rep-container');

    if (prediction[1].probability.toFixed(2) >= 0.75) {
      if (prediction[1].className !== previousPose) {
        // setLeftCount(leftCount + 1);
        leftCount++;
        previousPose = prediction[1].className;
        console.log('Left Count: ', leftCount);
      }
    } else if (prediction[2].probability.toFixed(2) >= 0.75) {
      if (prediction[2].className !== previousPose) {
        // setRightCount(rightCount + 1);
        rightCount++;
        repContainer.innerHTML = `You have nodded your head ${rightCount} times!`;
        previousPose = prediction[2].className;
        console.log('Right Count: ', rightCount);
      }
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
  });
  console.log('INSIDE POSENET FILE');
  return (
    <div>
      <div>
        <canvas id="canvas"></canvas>
      </div>
      <div id="rep-container">Loading...</div>
    </div>
  );
}
