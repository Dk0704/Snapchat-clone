import { Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { login } from './features/appSlice';
import { auth, provider } from './firebase';
import './Login.css'

function Login() {
    const dispatch = useDispatch();

    const signIn = async () => {
        auth.signInWithPopup(provider)
            .then(result => {
                dispatch(
                    login({
                        userName: result.user.displayName,
                        profilePic: result.user.photoURL,
                        id: result.user.uid
                    })
                );
            })
            .catch(err=> alert(err));
    };

    return (
        <div className='login'>
            <img src="https://play-lh.googleusercontent.com/KxeSAjPTKliCErbivNiXrd6cTwfbqUJcbSRPe_IBVK_YmwckfMRS1VIHz-5cgT09yMo" alt="" />
            <Button variant='outlined' onClick={signIn} >Sign In</Button>
        </div>
    )
}

export default Login
