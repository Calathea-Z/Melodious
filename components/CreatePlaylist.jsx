import useSpotify from '../hooks/useSpotify';
import { useEffect, useState, Fragment } from 'react';
import { createdPlaylistIdState } from '../atoms/playlistAtom';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom'
import { Dialog, Transition } from '@headlessui/react';

function CreatePlaylist() {

    const [open, setOpen] = useRecoilState(modalState);
    const [playlistId, setPlaylistId] = useRecoilState(createdPlaylistIdState);
    const [playlistTitle, setPlaylistTitle] = useState(null);
    const spotifyApi = useSpotify(); 

//----Get playlist title input from user. 
    const setInput = (e) => {
        e.preventDefault();
        const input = e.target.value
        setPlaylistTitle(input)
    }

//----- Create new playlist and then grab the playlist ID from Spotify API.
    const newPlaylist = () => {
        spotifyApi.createPlaylist(playlistTitle)
        spotifyApi.getUserPlaylists().then((data) => {
            setPlaylistId(data.body.items[0].id);
            });
        setOpen(false);
    }

//-----Only call newPlaylist when the playlist ID changes.   
    useEffect(() => {
        newPlaylist();
    }, [playlistId])

return (
//-----Transition root and Dialog allow for a smooth transition to the modal state.   
    <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' className='fixed z-10 inset-0 overflow-y-auto' onClose={setOpen}>
            <div className='flex items-end justify-center min-h-[400px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>                
                <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
                    <Dialog.Overlay className='fixed inset-0 bg-blue-400 bg-opacity-75 transition-opacity' />
                </Transition.Child>

{/*-----This code tricks the browser into rendering the modal in the middle of the screen.*/}
                <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
                    &#8203;
                </span>
                <Transition.Child as={Fragment} enter='ease-out duration-300'    enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95' enterTo='opacity-100 translate-y-0 sm:scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 translate-y-0 sm:scale-100' leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
                    <div className='inline-block bg-yellow-300 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle align-top sm:max-w-sm sm:w-full sm:p-6'
                    >
                        <div className='flex'>
                            <div className='flex flex-col font-mono'>
                                <h6>Create a New Playlist</h6>
                                <form onChange={setInput}>
                                    <input type='text' name='playlistTitle' placeholder='...title' className='text-black border-none rounded-sm opacity-25'/>
                                    <button type='button' className='p-2 rounded-md ml-5 border-greeen border-solid border-2 opacity-75 cursor-pointer hover:scale-125 transition transform duration-100 ease-out font-bold text-xs  hover:bg-yellow-400 hover:text-white ' onClick={newPlaylist}
                                    >
                                    Create
                                    </button>
                                </form>  
                            </div>
                        </div>
                    </div>    
                </Transition.Child>
            </div>
        </Dialog>
    </Transition.Root>
    )
}

export default CreatePlaylist
