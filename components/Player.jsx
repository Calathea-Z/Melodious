import DropUpPlaylistSelector from "./DropUpPlaylistSelector";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";

import { BackwardIcon, PauseCircleIcon, PlayCircleIcon, ForwardIcon, SpeakerWaveIcon as VolumeDown } from "@heroicons/react/24/outline";
import { SpeakerWaveIcon as VolumeUp } from "@heroicons/react/24/solid";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";



function Player() {
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const spotifyApi = useSpotify();
  const songInfo = useSongInfo();
  const { data: session } = useSession();
  
//------Grabs the currently playing song object and sets the current track ID to that songs ID. Then sets "is playing" to true.
  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log("Now Playing:", data.body?.item);
        setCurrentTrackId(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

//----- If the trackID changes, the session changes, or the spotifyApi Hook is used the current song is refreshed.
  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
    }
  }, [currentTrackId, spotifyApi, session]);


  useEffect(() => {
    if (volume > 0 && volume < 100) {
      adjustVolume(volume)
    }
  },[volume])

  const adjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch(error);
    }, 500), []
  )

//---- Handles the play pause logic.  
  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  
  return (
    <div className="h-24 bg-gradient-to-b from-gray-800 to-gray-900 text-yellow-400 grid grid-cols-3 text-xs md:text-base px-2 space-x-2 md:px-8">
      <div className="flex items-center space-x-4">
        <img
          src={songInfo?.album.images?.[0]?.url}
          alt=""
          className=" hidden md:inline h-10 w-10"
        />
        <div className="justify-self-start">
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      <div className="flex items-center justify-evenly">
        <BackwardIcon
          className="button"
          onClick={() => spotifyApi.skipToPrevious()}
        />
        {isPlaying ? (
          <PauseCircleIcon className="button" onClick={handlePlayPause} />
        ) : (
          <PlayCircleIcon className="button" onClick={handlePlayPause} />
        )}
        <ForwardIcon className="button" onClick={() => spotifyApi.skipToNext} />
      </div>
      <div className='flex items-center space-x-3 md:space-x-4 justify-end pr-5'>
        <VolumeDown onClick={() => volume > 0 && setVolume(volume-10)} className='button' />
        <input
          className='w-14 md:w-28'
          type='range'
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          min={0}
          max={100}
        />
        <VolumeUp onClick={() => volume < 100 && setVolume(volume+10)}className='button' />
      </div>
    </div>
  );
}

export default Player;
