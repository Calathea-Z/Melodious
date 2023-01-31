import { HomeIcon, MagnifyingGlassCircleIcon, MusicalNoteIcon, PlusCircleIcon, LinkIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from 'next-auth/react';
import { useState, useEffect } from "react";
// Import custom hook function that calls spotifyApi
import useSpotify from '../hooks/useSpotify';


const Sidebar = () => {
    const spotifyApi = useSpotify();
    const { data: session, status} = useSession();
    // console.log(session);
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useState(null);

    console.log("Playlist", playlistId )
    // Populates user playlists each time the session changes or the spotifyApi is called. 
    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            });
        }
    }, [session, spotifyApi])

return (
    <div className='text-greeen p-5 text-sm border-r border-greeen overflow-y-scroll scrollbar-hide h-screen '>
        <div className='space-y-4'>
        <button className='flex items-center space-x-2 hover:text-white' onClick={() => signOut()}>
                <p>Log Out</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
                <HomeIcon className='h-5 w-5'/>
                <p>Home</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
                <MagnifyingGlassCircleIcon className='h-5 w-5'/>
                <p>Ask For Suggestions</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
                <MusicalNoteIcon className='h-5 w-5'/>
                <p>Your Library</p>
            </button>
            <hr className='border-t-[0.1px] border-greeen'/>

            <button className='flex items-center space-x-2 hover:text-white'>
                <PlusCircleIcon className='h-5 w-5'/>
                <p>Build Playlist</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
                <ArrowTrendingUpIcon className='h-5 w-5'/>
                <p>Trending</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
                <LinkIcon className='h-5 w-5'/>
                <p>Liked Songs</p>
            </button>
            <hr className='border-t-[0.1px] border-greeen'/>
            {playlists.map((playlist) => (
                <p key={playlist.id} className='cursor-pointer hover:text-white' onClick={()=> setPlaylistId(playlist.id)}>
                    {playlist.name}
                </p>
            ))}

        </div>
    </div>
)
}


export default Sidebar