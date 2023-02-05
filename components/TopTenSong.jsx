import useSpotify from "../hooks/useSpotify";
import time from "../lib/time";
import { useRecoilState, useRecoilValue } from "recoil";
import { isPlayingState, currentTrackIdState } from "../atoms/songAtom";
import { createdPlaylistIdState, songUriState } from "../atoms/playlistAtom";

function TopTenSong({ order, track }) {

  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [songUri, setSongUri] = useRecoilState(songUriState);
  const newPlaylistId = useRecoilValue(createdPlaylistIdState);
  const spotifyApi = useSpotify();

  //----- Plays new song selection on user selection.
  const playSong = () => {
    setCurrentTrackId(track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track.uri],
    });
  };

  //-----Sets the URI of the user selected song for playlist addition and then calls helper function to complete process.
  const handleSetSongURI = () => {
    setSongUri(track.uri);
    addSongToPlaylist();
  };

  //-----Adds song to playlist. 
  const addSongToPlaylist = async () => {
    const addedSong = spotifyApi.addTracksToPlaylist(newPlaylistId, [songUri]);
    console.log(addedSong);
  };

  return (
    <div className="grid grid-cols-2 text-purple-400 py-4 px-5 ">
      <div
        className="flex items-center space-x-4 hover:bg-gray-900 rounded-lg cursor-pointer"
        onClick={playSong}
      >
        <p>{order + 1} </p>
        <img src={track?.album?.images[0].url} alt="" className="h-20 w-20" />
        <div>
          <p className="w-36 lg:w-64 truncate">{track?.name}</p>
          <p className="w-40 text-greeen">{track?.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden md:inline text-white">{track?.album?.name}</p>
        <div>
          <button
            className="rounded-lg p-2 border-yellow-300  opacity-80 hover:bg-yellow-400 hover:text-white transition transform duration-100 ease-out"
            onClick={handleSetSongURI}
          >
            Add to Playlist
          </button>
        </div>
        <p className="text-white">{time(track?.duration_ms)}</p>
      </div>
    </div>
  );
}
export default TopTenSong;
