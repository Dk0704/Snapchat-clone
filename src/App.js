import React from 'react';
import './App.css';
import WebcamCapture from './WebcamCapture';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Preview from './Preview';
import Chats from './Chats';
import ChatView from './ChatView';
import { useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/appSlice';
import { useDispatch } from 'react-redux';
import Login from './Login';
import { useEffect } from 'react';
import { auth } from './firebase';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(login({
          userName: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid
        }))
      }
      else {
        dispatch(logout())
      }
    })
  },[]);


  return (
    <div className="app">
      <Router>
        {!user ? (<Login />) : (
          <>
          <img src="https://play-lh.googleusercontent.com/KxeSAjPTKliCErbivNiXrd6cTwfbqUJcbSRPe_IBVK_YmwckfMRS1VIHz-5cgT09yMo" alt="" height='100px'/>
          <div className='body'>
            <div className="background">
            <Routes>
              <Route exact path="/" element={<WebcamCapture />} />
              <Route path="/preview" element={<Preview />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/chats/view" element={<ChatView />} />
            </Routes>
            </div>
          </div>
          </>
        )}
      </Router>

    </div>
  );
}

export default App;
