import Sidebar from "../components/SideBar"
import Player from "../components/Player"
import GeneratePlaylist from "../components/GeneratePlaylist"

function Suggestions() {
    return (

    <div className='bg-purp h-screen overflow-hidden'>
{/* --- Side Nav / Playlist Input */}
        <main className='flex'>
            <Sidebar />
            <GeneratePlaylist />
        </main>
{/* ---Music Player */}
        <div className='sticky bottom-0'>
            <Player />
        </div>
    </div>
)
}

export default Suggestions
