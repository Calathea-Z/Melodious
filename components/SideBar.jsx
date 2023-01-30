import { HomeIcon, MagnifyingGlassCircleIcon, MusicalNoteIcon, PlusCircleIcon, LinkIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from 'next-auth/react';

const Sidebar = () => {
    const { data: session, status} = useSession();
    console.log(session);

return (
    <div className='text-greeen p-5 text-sm border-r border-gray-900'>
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

            <p className='cursor-pointer hover:text-white'>Playlist Name...</p>
            <p className='cursor-pointer hover:text-white'>Playlist Name...</p>
            <p className='cursor-pointer hover:text-white'>Playlist Name...</p>
            <p className='cursor-pointer hover:text-white'>Playlist Name...</p>
            <p className='cursor-pointer hover:text-white'>Playlist Name...</p>
            <p className='cursor-pointer hover:text-white'>Playlist Name...</p>
            <p className='cursor-pointer hover:text-white'>Playlist Name...</p>
            <p className='cursor-pointer hover:text-white'>Playlist Name...</p>

        </div>
    </div>
)
}


export default Sidebar