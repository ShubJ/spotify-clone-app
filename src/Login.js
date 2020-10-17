import React from 'react';
import './Login.css';
import { loginUrl } from './spotify'

function Login() {
    return (
        <div className='login' >
            {/* Spotify Logo */}
            <img src='/assets/spotify_black.jpg' alt="" />
            {/* Login with Spotify button */}
            <a href={loginUrl} >LOGIN WITH SPOTIFY</a>
        </div>
    )
}

export default Login;