import SpotifyWebApi from 'spotify-web-api-node';
//-SpotifyWebApi Node is full of many helper functions that make calling the API easier.

//-----The scopes are setting the permissions of what the user can control about their spotify profile through the app. 

const scopes = [
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-private",
    "playlist-modify-public",
    "user-read-email",
    "streaming",
    "user-read-private",
    "user-library-read",
    "user-top-read",
    "user-library-modify",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-follow-read",
// joins this array as one string.
].join(',');

//Allows for variable url for different Spotify calls.
const params = {
    scope: scopes,
};


const queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

//prepares the data here for easy access inside other loadComponents.
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default spotifyApi;

export { LOGIN_URL };