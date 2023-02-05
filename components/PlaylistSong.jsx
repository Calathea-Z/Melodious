import useSpotify from "../hooks/useSpotify";
import time from "../lib/time";
import { isPlayingState, currentTrackIdState } from "../atoms/songAtom";
import { useRecoilState } from "recoil";

function PlaylistSong({ order, track }) {
  
  const [currentTrackId, setCurrentTrackId] =useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const spotifyApi = useSpotify();

//-----Sets the user selected song to now playing.  
  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track.track.uri],
    });
  };

  return (
    <div className="grid grid-cols-2 text-purple-400 py-4 px-5 ">
      <div
        className="flex items-center space-x-4 hover:bg-gray-900 rounded-lg cursor-pointer"
        onClick={playSong}
      >
        <p>{order + 1} </p>
        <img
          src={track?.track?.album?.images[0].url}
          alt=""
          className="h-20 w-20"
        />
        <div>
          <p className="w-36 lg:w-64 truncate">{track?.track?.name}</p>
          <p className="w-40 text-greeen">{track?.track?.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden md:inline">{track?.track?.album?.name}</p>
        <p>{time(track?.track?.duration_ms)}</p>
      </div>
    </div>
  );
}

export default PlaylistSong;
