import Player from "../components/Player";
import Sidebar from "../components/SideBar";
import SearchTopTenByArtist from "../components/SearchTopTenByArtist";


function buildplaylist() {
    
return (

    <div className='bg-purp h-screen overflow-hidden'>
{/* ---Header / Sign Out */}
       
{/* --- Side Nav / Playlist Input */}
        <main className='flex'>
            <Sidebar />
            <SearchTopTenByArtist />
        </main>

        <div className='sticky bottom-0'>
            <Player />
        </div>
    </div>
)
}

export default buildplaylist