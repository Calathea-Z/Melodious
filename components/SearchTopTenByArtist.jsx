import { PuzzlePieceIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { currentArtistTopTenState } from "../atoms/artistTopTenAtom";
import { useSession } from "next-auth/react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import TopTenSongs from "./TopTenSongs";


function SearchTopTenByArtist() {
    const { data: session } = useSession();
    const [userInput, setUserInput] = useState(null);
    const [topTenSongList, setTopTenSongList] = useRecoilState(currentArtistTopTenState);
    const [artistID, setArtistID] = useState(null);
    const [songList, setSongList] = useState([]);
    const spotifyApi = useSpotify();

    //--This stores the users search paramaters
    const setInput = (e) => {
        const input = e.target.value
        setUserInput(input)
}
    console.log(userInput);
 //----This returns to the top 10 results based on the search parameters
    const searchAndReturnResults = async (e) => {
        e.preventDefault();
       console.log("Search for", userInput)
       await grabArtistID();
       await grabTopTen();
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

const grabTopTen = async () => {spotifyApi.getArtistTopTracks(artistID, "US").then((data) => { 
    console.log("TOP TEN", data)
    console.log(data.body.tracks)
    setTopTenSongList(data.body.tracks)
})
.catch((err) => console.error("ERR GRAB TOP TEN FUNCTION", err))
}

    //  const topTenSongs = spotifyApi.getArtistTopTracks(artistID).then((dataTwo) => {
    //     console.log(dataTwo)
    //  }).catch((err) => console.log("Error in top tracks fetch", err) )

    // setTopTenSongList(topTenSongs)

//----Grab top 10 songs for that artists ID
 console.log(topTenSongList);   


return (
    <div className='flex-grow h-screen overflow-y-scroll items-center justify-center scrollbar-hide'>
         <header className='absolute top-5 right-8'>
            <div className='flex items-center bg-purple-800 space-x-3 opacity-90 hover:opacity-80 text-white cursor-pointer rounded-full p-1 pr-2' onClick={() => signOut()}>
                <img src={session?.user.image} className='rounded-full w-10 h-10'/>
                <h2>{session?.user.name}</h2>
                <ArrowLeftOnRectangleIcon className='w-5 h-5'/>
            </div>
        </header>
        <div className='`flex items-end space-x-7 bg-gradient-to-b to-purp from-greeen h-80 text-white p-8`'>
            <div className='flex flex-col'>
                <div className='p-10'>
                    <h1 className='font-extrabold tracking-wider font-mono text-2xl'>Search by Artist?</h1>
                </div>
                <div className='flex p-20 items-center justify-center'>
                    <form className='flex space-x-20' onChange={setInput}>
                        <input type='text' name='songValues' className='text-black border-none rounded-sm'/>
                        <button type='button' value='|' className='button text-purple-300 text-2xl font-extrabold' onClick={searchAndReturnResults}>
                            <PuzzlePieceIcon className='button text-2xl mb-2' />
                            <h6>Go!</h6>
                        </button>
                    </form>
                </div>
                {/* <div className='text-greeen px-8 flex flex-col space-y-1 pb-28'>
                    {topTenSongList?.map((track, index) => (
                        <div>
                            <h1 key={track.id}>
                            {index} {track.name} 
                            {console.log("hi", track.name)}
                            </h1>
                        </div>
                    ))}
                </div> */}
                <TopTenSongs />
                <div>
        </div>
            </div>
        </div>
    </div>
)
}

export default SearchTopTenByArtist