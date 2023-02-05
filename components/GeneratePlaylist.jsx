import DropdownNav from "./DropdownNav";
import TopTenSongs from "./TopTenSongs";
import useSpotify from "../hooks/useSpotify";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { generatedListState } from "../atoms/generatorAtom";
import { currentArtistTopTenState } from "../atoms/artistTopTenAtom";
import { Typewriter } from "react-simple-typewriter";

export default function GeneratePlaylist() {

  const [userInput, setUserInput] = useState("");
  const [artistID, setArtistID] = useState(null);
  const [currentArtistSelection, setCurrentArtistSelection] = useState(null);
  const [topTenSongList, setTopTenSongList] = useRecoilState(currentArtistTopTenState);
  const [result, setResult] = useRecoilState(generatedListState);
  const spotifyApi = useSpotify();

//-----Make a request to OpenAI API get back the data and then split that data into chunks on each ~.
  async function onSubmit(e) {
    e.preventDefault();
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

//-----Grab the user's band selection and split format into the correct string to send to Spotify API.
  const handleClick = async (e) => {
    let query = e.target.value;
    let queryReformOne = query.substring(3)
    let queryReformTwo = queryReformOne.substring(0, queryReformOne.indexOf("-"))
    setCurrentArtistSelection(queryReformTwo)
  }

//-----Grab the selected Artist's ID from Spotify API.
  const grabArtistID = () => 
    {spotifyApi.searchArtists(currentArtistSelection).then((data) => { 
      setArtistID(data.body.artists.items[0].id)
    })
    .catch((err) => console.log("ERR GRAB ARTIST ID FUNCTION", err));
  }

//----Return the selected Artist's top ten most played songs. 
  const grabTopTen = async () =>
    {spotifyApi.getArtistTopTracks(artistID, "US").then((data) => { 
      setTopTenSongList(data.body.tracks)
    })
  .catch((err) => console.error("ERR GRAB TOP TEN FUNCTION", err))
  }

//-----Grab the top ten songs each time the artist ID changes.
  useEffect (() => {
    if(artistID){
      grabTopTen()
    }
  },[artistID])

//-----Grab the artist ID every time the current Artist selected changes.
  useEffect (() => {
    grabArtistID()
  },[currentArtistSelection])

return (
    <div className='flex-grow h-screen overflow-y-scroll items-center justify-center scrollbar-hide'>
      <header className='top-5 right-8'>
        <DropdownNav/>
      </header>
      <main className='p-4 mb-0 w-9/12 flex flex-col align-center justify-center space-y-10 text-yellow-400 font-mono md:text-xl lg:text-4xl tracking-wide leading-10'>
        <Typewriter
        words={["Enter a prompt: Be as specific or abstract as you'd like!"]}
        loop={1}
        typeSpeed={150}
        />
        <div className="flex flex-col justify-items-center md:flex-row lg: justify-between h-10 space-y-10 md:space-y-0 space-x-10 mb-">
          <form onSubmit={onSubmit} className='flex space-x-4'>
            <input
              type="text"
              name="bands"
              placeholder="Atmospheric 60's Jazz from France"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className='text-xs text-blue-600 rounded-md w-[300px]'
            />
            <button className='z-0 rounded-md border-greeen border-solid border-2 opacity-75 p-2 cursor-pointer hover:scale-125 transition transform duration-100 ease-out font-bold text-xs  hover:bg-yellow-400 hover:text-white ' type="submit" value="Generate">Generate
            </button>
          </form>
          <div className='text-greeen flex flex-col space-y-2 pb-28 font-serif  text-[13px] tracking-tight leading-snug mt-0'>
            {(result)?
              <div className='text-yellow-400 font-mono text-md '>
                <Typewriter 
                words={["Select an Artist"]}
                loop={1}
                typeSpeed={200}
                cursor={true}
                cursorBlinking={false}
                cursorStyle={'🎹'}
                />
              </div> : null
            }
              <div className="flex flex-wrap w-96 space-y-2">
                {result?.map((result, index) => (
                  <div className='flex space-x-2 ' key={index}>
                    <button className='border rounded-lg p-2 pb-1 border-yellow-300  opacity-80 hover:bg-yellow-400 hover:text-white transition transform duration-100 ease-out' value={result} type='button' onClick={handleClick}>
                      {result}
                    </button> 
                  </div>
                ))}
              </div>
          </div>
        </div>
      </main>
      {(result)?
        <div>
          <hr className='border-t-[0.1px] border-pink-400 md:mt-48 mt-72'/>
          <TopTenSongs />
        </div> : null 
      }
    </div>
  );
}
