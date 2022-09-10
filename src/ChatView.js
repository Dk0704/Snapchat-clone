import React from 'react'
import { useSelector } from 'react-redux'
import './ChatView.css'
import { selectSelectedImage } from './features/appSlice'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {CountdownCircleTimer} from 'react-countdown-circle-timer'

function ChatView() {
    const selectedImage = useSelector(selectSelectedImage);
    const history = useNavigate();

    useEffect(()=>{
        if(!selectedImage){
            exit();
        }
    },[selectedImage]);

    const exit = () =>{
        history('/chats');
    }
  return (
    <div className='chatView'>
      <img src={selectedImage} onClick={exit} alt="" />
      <div className="chatView_timer">
      <CountdownCircleTimer 
      isPlaying
      duration={10}
      strokeWidth={6}
      size={40}
      colors={
        ["#004777"
        ,"#F7B801"
        ,"#A30000"]
      }
        colorsTime={[7, 5, 2]}
        >
            {({remainingTime})=>{
                if (remainingTime ===0){
                    exit();
                }
                return remainingTime;
            }}
        </CountdownCircleTimer>
        </div>
    </div>
  )
}

export default ChatView
