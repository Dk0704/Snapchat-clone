import React, { useCallback } from 'react'
import { useRef } from 'react';
import Webcam from 'react-webcam';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import { setCameraImage } from './features/cameraSlice';
import {useNavigate} from 'react-router-dom'
import './WebcamCapture.css'
import CloseIcon from '@mui/icons-material/Close';

const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: "user",
};


function WebcamCapture() {
    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    const history = useNavigate();
    const closeCam = ()=>{
      history('/chats')
    };

    const capture = useCallback(()=>{
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc));
        history('/preview');

    },[webcamRef]);
    
  return (
    <div className='webcam'>
      <CloseIcon onClick={closeCam} className='closeCam'/>
      <Webcam
      audio={false}
      height={videoConstraints.height}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      width={videoConstraints.width}
      videoConstraints={videoConstraints}
    />
    <RadioButtonUncheckedIcon className='webcam_button' onClick={capture} fontSize='large'/>
   
    </div>
  )
}

export default WebcamCapture
