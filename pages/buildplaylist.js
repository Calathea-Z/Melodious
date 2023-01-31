import Player from "../components/Player";
import Sidebar from "../components/SideBar";
import GetUserInput from "../components/GetUserInput";
import Head from "next/head";
import { getSession } from 'next-auth/react';
import { signOut, useSession } from 'next-auth/react';
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

function buildplaylist() {
    const { data: session } = useSession();

return (

    <div className='bg-purp h-screen overflow-hidden'>
{/* ---Header / Sign Out */}
        <header className='absolute top-5 right-8'>
            <div className='flex items-center bg-purple-800 space-x-3 opacity-90 hover:opacity-80 text-white cursor-pointer rounded-full p-1 pr-2' onClick={() => signOut()}>
                <img src={session?.user.image} className='rounded-full w-10 h-10'/>
                <h2>{session?.user.name}</h2>
                <ArrowLeftOnRectangleIcon className='w-5 h-5'/>
            </div>
        </header>
{/* --- Side Nav / Playlist Input */}
        <main className='flex'>
            <Sidebar />
            <GetUserInput />
        </main>

        <div className='sticky bottom-0'>
            <Player />
        </div>
    </div>
)
}

export default buildplaylist