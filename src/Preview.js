import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetCameraImage, selectCameraImage } from './features/cameraSlice'
import './Preview.css'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CreateIcon from '@mui/icons-material/Create';
import NoteIcon from '@mui/icons-material/Note';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CropIcon from '@mui/icons-material/Crop';
import TimerIcon from '@mui/icons-material/Timer';
import SendIcon from '@mui/icons-material/Send';
import {v4 as uuid } from 'uuid';
import {db, storage} from './firebase';
import firebase from 'firebase'
import { selectUser } from './features/appSlice'

function Preview() {

    const cameraImage = useSelector(selectCameraImage);
    const history = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const closePreview = () =>{
        dispatch(resetCameraImage());
    };
    
    useEffect(()=>{
        if(!cameraImage){
            history('/');
        }
    },[cameraImage,history]);

    const sendPost = () =>{
        const id = uuid();
        const uploadTask = storage.ref(`posts/${id}`)
        .putString(cameraImage, "data_url")

        uploadTask.on('state_changed',null, (error)=>{
            console.log(error)
        },
        ()=>{
            storage.ref('posts')
            .child(id)
            .getDownloadURL()
            .then((url)=>{
                db.collection('posts').add({
                    imageUrl: url,
                    userName: user.userName,
                    read: false,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    profilePic: user.profilePic

                });
                history('/chats')
            })
        })
    }

  return (
    <div className='preview'>
      <CloseIcon onClick={closePreview} className='close'/>
      <div className="toolbar">
        <TextFieldsIcon/>
        <CreateIcon/>
        <NoteIcon/>
        <MusicNoteIcon/>
        <AttachFileIcon/>
        <CropIcon/>
        <TimerIcon/>
      </div>
      <img src={cameraImage} alt="" />
      <div onClick={sendPost} className="footer">
        <h2>Send</h2>
        <SendIcon fontSize='small' className='sendIcon'/>
      </div>
    </div>
  )
}

export default Preview
