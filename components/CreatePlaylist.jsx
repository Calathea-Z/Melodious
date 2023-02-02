import { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import { createdPlaylistIdState } from '../atoms/playlistAtom';
import { useRecoilState } from 'recoil';

function CreatePlaylist() {
    const spotifyApi = useSpotify();
    const [playlistTitle, setPlaylistTitle] = useState(null);
    const [playlistId, setPlaylistId] = useRecoilState(createdPlaylistIdState);
    
    const setInput = (e) => {
        const input = e.target.value
        setPlaylistTitle(input)
        console.log(playlistTitle);
    }

    const newPlaylist = async () => {
        const list = spotifyApi.createPlaylist(playlistTitle)
        console.log(list)
        spotifyApi.getUserPlaylists().then((data) => {
            setPlaylistId(data.body.items[0].id);
        });
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
