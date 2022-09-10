import { Avatar } from '@mui/material'
import React from 'react'
import './Chat.css'
import firebase from 'firebase'
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import ReactTimeago from 'react-timeago';
import { useDispatch, useSelector } from 'react-redux';
import { selectImage, selectUser } from './features/appSlice';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Chat({ id, userName, timestamp, imageUrl, read, profilePic }) {
    const dispatch = useDispatch();
    const history = useNavigate();
    const user = useSelector(selectUser);

    const open =()=>{
        if(!read){
            dispatch(selectImage(imageUrl));
            db.collection('posts').doc(id).update(
                {
                    read: true,
                },
            );
            history('/chats/view')
        }
    };

    return (
        <div onClick={open} className='chat'>
            <Avatar src={profilePic} className='chat_avatar'/>
            <div className="info">
                <h4>{userName}</h4>
                <p>{!read && "Tap to view -"}{" "}
                    <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()}/>
                </p>
            </div>
            {!read && <StopRoundedIcon className='readIcon' />}
        </div>
    )
}

export default Chat
