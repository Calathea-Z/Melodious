import Player from "../components/Player";
import Sidebar from "../components/SideBar";
import SearchTopTenByArtist from "../components/SearchTopTenByArtist";


function BuildPlaylist() {
    
return (

    <div className='bg-purp h-screen overflow-hidden'>
{/* --- Side Nav / Playlist Input */}
        <main className='flex'>
            <Sidebar />
            <SearchTopTenByArtist />
        </main>
{/* ---Music Player */}
        <div className='sticky bottom-0'>
            <Player />
        </div>
    </div>
)
}

export default BuildPlaylist