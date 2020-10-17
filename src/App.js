import React, { useEffect } from 'react';
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from './spotify';
import Player from './Player';
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  const [{ token, playlists }, dispatch] = useDataLayerValue();


  // Run code based on a given condition
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = '';

    const _token = hash.access_token;
    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token
      });
      spotify.setAccessToken(_token);

      spotify.getMe().then(user => {
        console.log('THis is useR:', user);
        dispatch({
          type: 'SET_USER',
          user
        });
      });

      spotify.getUserPlaylists().then((playlists) => dispatch({
        type: "SET_PLAYLISTS",
        playlists
      }));


      // if (playlists && playlists.items && playlists.items[0]) {

      //   spotify.getPlaylist(playlists.items[0].id).then(res => {
      //     console.log('This is playlist: ', res);
      //     dispatch({
      //       type: "SET_DISCOVER_WEEKLY",
      //       discover_weekly: res
      //     })
      //   })
      // }
    }
  });

  useEffect(() => {
    if (playlists && playlists.items && playlists.items[0]) 
      spotify.getPlaylist(playlists.items[0].id).then(res => {
        console.log('This is playlist: ', res);
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: res
        })
      })
  }, [playlists, dispatch])
  console.log('This is Playlist: ', playlists);

  return (
    <div className="app">
      {token ? (<Player spotify={spotify} />) : (<Login />)}
    </div>
  );
}

export default App;
