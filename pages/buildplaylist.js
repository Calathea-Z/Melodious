import Player from "../components/Player";
import Sidebar from "../components/SideBar";
import SearchTopTenByArtist from "../components/SearchTopTenByArtist";
import Head from "next/head";
import { getSession } from 'next-auth/react';
import { signOut, useSession } from 'next-auth/react';
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

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