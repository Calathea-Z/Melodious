import { HomeIcon, MagnifyingGlassCircleIcon, MusicalNoteIcon, PlusCircleIcon, LinkIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {

return (
    <div className='text-greeen p-5 text-sm border-r border-gray-900'>
        <div className='space-y-4'>
            <button className='flex items-center space-x-2 hover:text-white'>
                <HomeIcon className='h-5 w-5'/>
                <p>Home</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
                <MagnifyingGlassCircleIcon className='h-5 w-5'/>
                <p>Search</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
                <MusicalNoteIcon className='h-5 w-5'/>
                <p>Your Library</p>
            </button>
            <hr className='border-t-[0.1px] border-greeen'/>

            <button className='flex items-center space-x-2 hover:text-white'>
                <PlusCircleIcon className='h-5 w-5'/>
                <p>Create Playlist</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
                <ArrowTrendingUpIcon className='h-5 w-5'/>
                <p>Trending</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
                <LinkIcon className='h-5 w-5'/>
                <p>Connect</p>
            </button>
            <hr className='border-t-[0.1px] border-greeen'/>
        </div>
    </div>
)
}


export default Sidebar