import DropdownNav from "./DropdownNav";
import TopTenSongs from "./TopTenSongs";
import useSpotify from "../hooks/useSpotify";
import MelodiousLogo from '../assets/Melodious-1.png'
import Image from 'next/image'
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { generatedListState } from "../atoms/generatorAtom";
import { currentArtistTopTenState } from "../atoms/artistTopTenAtom";
import { Typewriter } from "react-simple-typewriter";
import { ScaleLoader } from "react-spinners";

export default function GeneratePlaylist() {
  const [userInput, setUserInput] = useState("");
  const [artistID, setArtistID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentArtistSelection, setCurrentArtistSelection] = useState(null);
  const [topTenSongList, setTopTenSongList] = useRecoilState(
    currentArtistTopTenState
  );
  const [result, setResult] = useRecoilState(generatedListState);
  const spotifyApi = useSpotify();

  //-----Make a request to OpenAI API get back the data and then split that data into chunks on each ~.
  async function onSubmit(e) {
    e.preventDefault();
    setResult(null)
    setLoading(true);
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
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      const responseToFormat = data.result;
      const formattedResponse = responseToFormat.split("~");
      setResult(formattedResponse);
      setUserInput("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  //-----Grab the user's band selection and split format into the correct string to send to Spotify API.
  const handleClick = async (e) => {
    let query = e.target.value;
    let queryReformOne = query.substring(3);
    let queryReformTwo = queryReformOne.substring(
      0,
      queryReformOne.indexOf("-")
    );
    setCurrentArtistSelection(queryReformTwo);
  };

  //-----Grab the selected Artist's ID from Spotify API.
  const grabArtistID = () => {
    spotifyApi
      .searchArtists(currentArtistSelection)
      .then((data) => {
        setArtistID(data.body.artists.items[0].id);
      })
      .catch((err) => console.log("ERR GRAB ARTIST ID FUNCTION", err));
  };

  //----Return the selected Artist's top ten most played songs.
  const grabTopTen = async () => {
    spotifyApi
      .getArtistTopTracks(artistID, "US")
      .then((data) => {
        setTopTenSongList(data.body.tracks);
      })
      .catch((err) => console.error("ERR GRAB TOP TEN FUNCTION", err));
  };

  //-----Grab the top ten songs each time the artist ID changes.
  useEffect(() => {
    if (artistID) {
      grabTopTen();
    }
  }, [artistID]);

  //-----Grab the artist ID every time the current Artist selected changes.
  useEffect(() => {
    grabArtistID();
  }, [currentArtistSelection]);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <DropdownNav />
      </header>
      <div className="`flex items-end justify-between space-x-2 bg-gradient-to-b to-purp from-greeen h-80 text-white p-8`">
        <Image className='w-[7rem]' src= { MelodiousLogo } alt='Melodious Logo' />
        <main className="p-4 mb-0 w-9/12 flex flex-col align-center justify-center space-y-10  text-yellow-400 font-mono  text-sm md:text-lg lg:text-4xl md:tracking- leading-2 md:leading-10">
          <Typewriter
            words={[
              "Enter a prompt: Be as specific or abstract as you'd like!",
            ]}
            loop={1}
            typeSpeed={50}
          />
          <div className="flex flex-col justify-items-center md:flex-row lg: justify-between h-10 md:pt-6 space-y-10 md:space-y-0 space-x-10 mb-">
            <form onSubmit={onSubmit} className="flex space-x-4">
              <input
                type="text"
                name="bands"
                placeholder="Atmospheric 60's Jazz from France"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="text-xs text-blue-600 rounded-md w-[150px] md:w-[200px] p-4"
              />
              <button
                className="z-0 flex items-center rounded-md border-yellow-400 text-blue-400 border-solid border-2 opacity-75 md:p-4 pr-1 pl-1 cursor-pointer md:hover:scale-125 transition transform duration-100 ease-out font-bold text-xs  hover:bg-yellow-400 hover:text-black"
                type="submit"
                value="Generate"
              >
                Generate
              </button>
            </form>
            <div className="text-greeen flex flex-col items-left space-y-2 pb-28 font-serif text-xs md:text-[13px] tracking-tight leading-snug mt-0">
              {result ? (
                <div className="text-yellow-400 font-mono text-md text-center">
                  <Typewriter
                    words={["Select an Artist"]}
                    loop={1}
                    typeSpeed={40}
                    cursor={true}
                    cursorBlinking={false}
                    cursorStyle={"🎹"}
                  />
                </div>
              ) : (loading ? (
                <ScaleLoader color='rgb(96 165 250)' />) : null
              )}              <div className="inline-block md:flex-wrap  w-64 md:w-96 space-y-1 md:space-y-2">
                {result?.map((result, index) => (
                  <div className="flex space-x-2 " key={index}>
                    <button
                      className="border text-blue-400 max-w-md rounded-lg p-2 pb-1 border-yellow-300  opacity-80 hover:bg-yellow-400 hover:text-black transition transform duration-100 ease-out"
                      value={result}
                      type="button"
                      onClick={handleClick}
                    >
                      {result}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        {result ? (
          <div>
            <hr className="border-t-[0.1px] border-pink-400 md:mt-52 mt-80" />
            <TopTenSongs />
          </div>
        ) : null}
      </div>
    </div>
  );
}
