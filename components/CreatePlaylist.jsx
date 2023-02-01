import { useState } from 'react';
import useSpotify from '../hooks/useSpotify';

function CreatePlaylist() {
    const spotifyApi = useSpotify();
    const [playlistTitle, setPlaylistTitle] = useState(null);

    const setInput = (e) => {
        const input = e.target.value
        setPlaylistTitle(input)
        console.log(playlistTitle);
    }

    const newPlaylist = () => {
        spotifyApi.createPlaylist(playlistTitle)
        console.log("Playlist Created",)
    }

  return (
    <div className='flex'>
        <div className='flex flex-col'>
            <h6>Create a New Playlist</h6>
            <form onChange={setInput}>
                <input type='text' name='playlistTitle' placeholder='...title' className='text-black border-none rounded-sm opacity-25'>
                </input>
                <button type='button' className='button text-purple-200 text-xs font-extrabold self-end' onClick={newPlaylist}>Create</button>
            </form>  
        </div>
    </div>
  )
}

export default CreatePlaylist
