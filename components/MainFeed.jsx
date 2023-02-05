import useSpotify from "../hooks/useSpotify";
import MelodiousLogo from "../assets/Melodious-1.png";
import Image from "next/image";
import Songs from "./PlaylistSongs";
import DropdownNav from "./DropdownNav";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import { useEffect } from "react";
import DropUpPlaylistSelector from "./DropUpPlaylistSelector";

function MainFeed() {
  const spotifyApi = useSpotify();
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  //------Fetches playlists data each time the playlist ID changes or the useSpotify hook is mounted.
  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log("ERROR:", err));
  }, [spotifyApi, playlistId]);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div className='flex align-center justify-center space-x-4'>
          <div className='md:hidden'>
        <DropUpPlaylistSelector />
        </div>
        <DropdownNav />
        </div>
      </header>
      <section
        className={`flex  flex-col space-x-7 md:space-y-3 bg-gradient-to-b to-purp from-greeen h-80 text-yellow-400`}
      >
        <div>
          <Image
            className="w-[7rem]"
            src={MelodiousLogo}
            alt="Melodious Logo"
          />
        </div>
        <div className='flex space-x-3 items-end'>
          <div>
            <img
              src={playlist?.images?.[0]?.url}
              alt=""
              className=" h-32 w-32 md:h-44 md:w-44 shadow-2xl mt-16 md:mt-0"
            />
          </div>
          <div>
            <p>PLAYLIST</p>
            <h2 className="text-2xl md:text-3xl xl:text-5xl font-bold">
              {playlist?.name}
            </h2>
          </div>
        </div>
      </section>
      <hr className="border-t-[0.1px] border-pink-400" />
      <div>
        <Songs />
      </div>
    </div>
  );
}

export default MainFeed;
