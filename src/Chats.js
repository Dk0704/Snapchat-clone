import { Avatar } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import './Chats.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { auth, db } from './firebase';
import Chat from './Chat';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './features/appSlice';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import { useNavigate } from 'react-router-dom';
import { resetCameraImage } from './features/cameraSlice';

function Chats() {

    const [posts, setPosts] = useState([]);
    const history = useNavigate();
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    useEffect(()=>{
        
        db.collection("posts")
        .orderBy('timestamp','desc')
        .onSnapshot((snapshot)=>{
            setPosts(snapshot.docs.map(doc=>({
                id: doc.id,
                data: doc.data(),
            })))
        })
       
    },[]);
    const takeSnap =()=>{
        dispatch(resetCameraImage());
        history('/');
    };

  return (
    <div className='chats'>
        <div className='header'>
            {/* {console.log(user.profilePic)} */}
            <Avatar src={user.profilePic} className='avatar' onClick={()=> auth.signOut()} />
            <div className="search">
                <SearchIcon />
                <input type="text" placeholder='Friends' />
            </div>
            <ChatBubbleIcon className='chatIcon'/>
        </div>
        <div className="posts">
           
            {posts.map(({id, data: {imageUrl, read, timestamp,userName, profilePic}})=>(
            
                <Chat
                key={id}
                id={id}
                userName={userName}
                timestamp={timestamp}
                imageUrl={imageUrl}
                read={read}
                profilePic={profilePic}
                />
))}
        </div>
        <RadioButtonUncheckedRoundedIcon className='takePicIcon' onClick={takeSnap} fontSize='large'/>
    </div>
  )
}

export default Chats
