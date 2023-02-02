import { signOut } from "next-auth/react";
import { useState } from "react"
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { currentArtistTopTenState } from "../atoms/artistTopTenAtom";
import { useSession } from "next-auth/react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import TopTenSongs from "./TopTenSongs";
import CreatePlaylist from "../components/CreatePlaylist";


function SearchTopTenByArtist() {
    const { data: session } = useSession();
    const [userInput, setUserInput] = useState(null);
    const [topTenSongList, setTopTenSongList] = useRecoilState(currentArtistTopTenState);
    const [artistID, setArtistID] = useState(null);
    const spotifyApi = useSpotify();

    //--This stores the users search paramaters
    const setInput = (e) => {
        const input = e.target.value
        setUserInput(input)
}
    // console.log(userInput);
 //----This returns to the top 10 results based on the search parameters
    const searchAndReturnResults = async (e) => {
        e.preventDefault();
       console.log("Search for", userInput)
        await grabArtistID();
        if(artistID) {
            grabTopTen();
        }
//---This grabs the artistID of the top search results which is needed before songs can be accessed.
 }

 const grabArtistID = async () => {spotifyApi.searchArtists(userInput).then((data) => { 
    console.log(data)
    console.log("Artist Name :", data.body.artists.items[0].name)
    console.log("Aritst ID :", data.body.artists.items[0].id)
    setArtistID(data.body.artists.items[0].id)
})
.catch((err) => console.log("ERR GRAB ARTIST ID FUNCTION", err));
}
//----Grab top 10 songs with specific artists ID
const grabTopTen = async () => {spotifyApi.getArtistTopTracks(artistID, "US").then((data) => { 
    console.log("TOP TEN", data)
    console.log(data.body.tracks)
    setTopTenSongList(data.body.tracks)
})
.catch((err) => console.error("ERR GRAB TOP TEN FUNCTION", err))
}

return (
    <div className='flex-grow h-screen overflow-y-scroll items-center justify-center scrollbar-hide'>
        <header className='absolute top-5 right-8'>
            <div className='flex items-center bg-purple-800 space-x-3 opacity-90 hover:opacity-80 text-white cursor-pointer rounded-full p-1 pr-2' onClick={() => signOut()}>
                <img src={session?.user.image} className='rounded-full w-10 h-10'/>
                <h2>{session?.user.name}</h2>
                <ArrowLeftOnRectangleIcon className='w-5 h-5'/>
            </div>
        </header>
        <div className='`flex justify-between space-x-2 bg-gradient-to-b to-purp from-greeen h-80 text-white p-8`'>
            <div className='flex'>
            <CreatePlaylist />
            </div>
            <div className='flex flex-col'>
                <div className='flex pb-1 mt-20 items-center'>
                    <form className='flex space-x-3' onChange={setInput}>
                        <input type='text' name='songValues' placeholder='..artist' className='text-black border-none rounded-sm opacity-25'/>
                        <button type='button' value='|' className='button text-purple-200 text-xs font-extrabold self-end' onClick={searchAndReturnResults}>
                            <h6>Search</h6>
                        </button>
                    </form>
                </div>
                <hr className='border-t-[0.1px] border-greeen'/>
                <TopTenSongs />
                <div>
        </div>
            </div>
        </div>
    </div>
)
}

export default SearchTopTenByArtist