import useSpotify from "../hooks/useSpotify";
import time from "../lib/time";
import { isPlayingState, currentTrackIdState } from "../atoms/songAtom";
import { useRecoilState } from "recoil";

function PlaylistSong({ order, track }) {
  
  const [currentTrackId, setCurrentTrackId] =useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  //-----Code below to be used at a later time when delete function from Spotify API is functional------------***********. 
  // const [songUri, setSongUri] = useRecoilState(songUriState);
  // const playlistID = useRecoilValue(playlistIdState);

  const spotifyApi = useSpotify();

//-----Sets the user selected song to now playing.  
  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track.track.uri],
    });
  };

  //----- COMMENTING OUT FOR FUTURE USE: DELETE FUNCTIONALITY NOT CURRENTLY WORKING BECAUSE OF ERROR IN SPOTIFY API.-------------------******

  //-----Sets the URI of the user selected song for playlist addition and then calls helper function to complete process.
  // const handleDeleteSong =  () => {
  //   setSongUri(track.uri);
  //   deleteFromPlaylist();
  // };

  //-----Adds song to playlist. 
  // const deleteFromPlaylist = async () => {
  //   const deletedSong = spotifyApi.removeTracksFromPlaylist(playlistID, [songUri])
  //   console.log(deletedSong);
  // };


  return (
    <div className="grid grid-cols-2 text-purple-400 py-4 md:px-5 ">
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
          <p className="text-xs md:text-lg w-36 lg:w-64 truncate">{track?.track?.name}</p>
          <p className=" text-xs md:text-lg w-36 text-greeen">{track?.track?.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden md:inline">{track?.track?.album?.name}</p>

{/* ****Delete functionality is not currently working through spotify*** */}
        {/* <button className='button' onClick={handleDeleteSong}> 
          DELETE
        </button> */}

        <p className='text-white text-xs md:text-lg'>{time(track?.track?.duration_ms)}</p>
      </div>
    </div>
  );
}

export default PlaylistSong;
