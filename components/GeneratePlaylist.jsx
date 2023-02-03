import { useState } from "react";
import { signOut, useSession} from "next-auth/react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import useSpotify from "../hooks/useSpotify";
import Typewriter from "react-typewriter-animate";
import "react-typewriter-animate/dist/Typewriter.css";
import { useRecoilState } from "recoil";
import { generatedListState } from "../atoms/generatorAtom";
import { useEffect } from "react";
import TopTenSongs from "./TopTenSongs";
import { currentArtistTopTenState } from "../atoms/artistTopTenAtom";
import { songUriState } from "../atoms/playlistAtom";

export default function GeneratePlaylist() {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useRecoilState(generatedListState);
  const { data: session } = useSession();
  const [currentArtistSelection, setCurrentArtistSelection] = useState(null);
  const [artistID, setArtistID] = useState(null);
  const [songUri, setSongUri] = useRecoilState(songUriState);
  const [topTenSongList, setTopTenSongList] = useRecoilState(currentArtistTopTenState);
  const spotifyApi = useSpotify();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bands: userInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      const responseToFormat = data.result
      const formattedResponse = responseToFormat.split('~');
      setResult(formattedResponse);
      setUserInput("");
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  const handleClick = async (e) => {
    let query = e.target.value;
    let queryReformOne = query.substring(3)
    let queryReformTwo = queryReformOne.substring(0, queryReformOne.indexOf("-"))
    setCurrentArtistSelection(queryReformTwo)
    await grabArtistID();
    if (artistID){
    grabTopTen();
    }
  }

  const grabArtistID = () => {spotifyApi.searchArtists(currentArtistSelection).then((data) => { 
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

  useEffect(() => {
    console.log("current artist selection", currentArtistSelection)
  },[currentArtistSelection]);

  return (
    <div className='flex-grow h-screen overflow-y-scroll items-center justify-center scrollbar-hide'>
      <header className='absolute top-5 right-8'>
            <div className='flex items-center bg-purple-800 space-x-3 opacity-90 hover:opacity-80 text-white cursor-pointer rounded-full p-1 md:pr-2' onClick={() => signOut()}>
                <img src={session?.user.image} className='rounded-full w-6 h-6 md:w-10 md:h-10'/>
                <h2>{session?.user.name}</h2>
                <ArrowLeftOnRectangleIcon className='w-5 h-5'/>
            </div>
        </header>
      <main className='pt-4 pl-1 pb-0 mb-0 w-9/12 flex flex-col space-y-10 text-yellow-400 font-mono text-4xl tracking-wide leading-10'>
        <Typewriter dataToRotate={[
          [
            {type: 'word',
             text: "Enter a prompt: Be as specific or abstract as you'd like!",
             maxTypeSpeed: 500,}
          ],
        ]} />
        <hr className='border-t-[0.1px] border-blue-600'/>
        <div className="flex flex-col md:flex-row h-10 space-y-10 md:space-y-0 space-x-10 mb-">
          <form onSubmit={onSubmit} className='flex space-x-4'>
            <input
              type="text"
              name="bands"
              placeholder="Atmospheric 60's Jazz from France"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className='text-xs text-blue-600 rounded-md w-[300px]'
            />
            <button className=' rounded-md border-greeen border-solid border-2 opacity-75 cursor-pointer hover:scale-125 transition transform duration-100 ease-out font-bold text-xs  hover:bg-yellow-400 hover:text-white ' type="submit" value="Generate">Generate
            </button>
          </form>
          <div className='text-greeen flex flex-wrap space-y-1 pb-28 font-serif  text-[13px] tracking-tight leading-snug mt-0'>
            {(result)?
              <div className='text-yellow-400 font-mono text-md '>
              <Typewriter dataToRotate={[
                [{type: 'word',
                  text: "Select Your Artist",
                  cursor: {char: "🎹"},
                }],]} 
              />
              </div> : <p> </p>
            }
          <div className="flex flex-wrap w-96">
            {result?.map((result, index) => (
              <div className='flex space-x-2 space-y-2' key={index}>
                <button className='border rounded-lg p-2 border-yellow-300  opacity-80 hover:bg-yellow-400 hover:text-white transition transform duration-100 ease-out' value={result} type='button' onClick={handleClick}>{result}</button> 
                </div>
            ))}
          </div>
        </div>
      </div>
    </main>
    {(result)?<div>
      <hr className='border-t-[0.1px] border-pink-400 mt-48'/>
      <TopTenSongs />
    </div> : <p> </p> 
    }
  </div>
  );
}
