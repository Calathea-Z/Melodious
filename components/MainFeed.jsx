import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react"
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from './PlaylistSongs';
import { signOut } from "next-auth/react";
import DropdownMenu from "./DropdownMenu";

function MainFeed() {
    const spotifyApi = useSpotify();
    const { data: session } = useSession();
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState);

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId).then((data) => {
            setPlaylist(data.body);
        })
        .catch((err) => console.log("ERROR:", err));
    }, [spotifyApi, playlistId])

return (
    <div className='flex-grow h-screen overflow-y-scroll scrollbar-hide'>
        <header className='absolute top-5 right-8'>
            <DropdownMenu />
        </header>
        <section className={`flex items-end space-x-7 bg-gradient-to-b to-purp from-greeen h-80 text-yellow-400 p-8`}>
            <img src={playlist?.images?.[0]?.url} alt='' className='h-44 w-44 shadow-2xl' />
            <div>
                <p>PLAYLIST</p>
                <h2 className='text-2xl md:text-3xl xl:text-5xl font-bold'>{playlist?.name}</h2>
            </div>
        </section>
        <div>
            <Songs />
        </div>

    </div>
)}

export default MainFeed