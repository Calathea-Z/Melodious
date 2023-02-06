import MelodiousLogo from '../assets/Melodious-1.png'
import Image from 'next/image'
import useSpotify from "../hooks/useSpotify";
import TopTenSongs from "./TopTenSongs";
import CreatePlaylist from "../components/CreatePlaylist";
import DropdownNav from "./DropdownNav";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { currentArtistTopTenState } from "../atoms/artistTopTenAtom";

function SearchTopTenByArtist() {
  const [topTenSongList, setTopTenSongList] = useRecoilState(currentArtistTopTenState);
  const [userInput, setUserInput] = useState(null);
  const [artistID, setArtistID] = useState(null);
  const spotifyApi = useSpotify();

  //-----This stores the users search parameters.
  const setInput = (e) => {
    const input = e.target.value;
    setUserInput(input);
  };

  //-----This returns to the top 10 results based on the search parameters.
  const searchAndReturnResults = async (e) => {
    e.preventDefault();
    grabArtistID();
    grabTopTen();
  };

  //-----This grabs the artistID of the top search results which is needed before songs can be accessed.
  const grabArtistID = async () => {
    spotifyApi
      .searchArtists(userInput)
      .then((data) => {
        setArtistID(data.body.artists.items[0].id);
      })
      .catch((err) => console.error("ERR GRAB ARTIST ID FUNCTION", err));
  };

  //-----Grab top 10 songs with specific artists ID.
  const grabTopTen = async () => {
    spotifyApi
      .getArtistTopTracks(artistID, "US")
      .then((data) => {
        setTopTenSongList(data.body.tracks);
      })
      .catch((err) => console.error("ERR GRAB TOP TEN FUNCTION", err));
  };

  //----- If there is an artist ID and it changes grabs the top ten songs of that new artists ID.  
  useEffect(() => {
    if (artistID) {
      grabTopTen();
    }
  }, [artistID]);

  return (
    <div className="flex-grow h-screen overflow-y-scroll items-center justify-center scrollbar-hide">
      <header className="absolute top-5 right-8">
        <DropdownNav />
      </header>
      <div className="`flex justify-between space-x-2 bg-gradient-to-b to-purp from-greeen h-80 text-white p-8`">
        <div className="flex">
          <Image className='w-[7rem]' src= { MelodiousLogo } alt='Melodious Logo' />
          <CreatePlaylist />
        </div>
        <div className="flex flex-col">
          <div className="flex pb-1 mt-20 items-center justify-center">
            <form className="flex space-x-3" onChange={setInput}>
              <input
                type="text"
                name="songValues"
                placeholder="...Radiohead"
                className="text-xs text-blue-600 rounded-md w-[150px] md: w-[300px] "
              />
              <button
                type="button"
                value=" "
                className="rounded-md border-greeen bg-purp p-3 border-solid border-2 opacity-75 cursor-pointer hover:scale-125 transition transform duration-100 ease-out font-bold text-xs  hover:bg-yellow-400 hover:text-white "
                onClick={searchAndReturnResults}
              >
              Search
              </button>
            </form>
          </div>
          <hr className="border-t-[0.1px] border-greeen" />
          <TopTenSongs />
        </div>
      </div>
    </div>
  );
}

export default SearchTopTenByArtist;
