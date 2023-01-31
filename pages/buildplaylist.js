import Player from "../components/Player";
import Sidebar from "../components/SideBar";
import GetUserInput from "../components/GetUserInput";
import Head from "next/head";

function buildplaylist() {
return (
    <div className='flex-grow h-screen overflow-y-scroll scrollbar-hide bg-gradient-to-b to-greeen from-purp'>
        <Head>
            <title>Melodius</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
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