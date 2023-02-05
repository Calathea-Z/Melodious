import { useState, useEffect } from 'react'
import useSpotify from '../hooks/useSpotify';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSongInfo from '../hooks/useSongInfo';
import {BackwardIcon, PauseCircleIcon, PlayCircleIcon, ForwardIcon } from '@heroicons/react/24/outline';
import DropUpPlaylistSelector from './DropUpPlaylistSelector';


function Player() {
    const spotifyApi = useSpotify();
    const songInfo = useSongInfo();
    const { data: session } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const [volume, setVolume] = useState(50);

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then(data => {
                console.log("Now Playing:", data.body?.item);
                setCurrentTrackId(data.body?.item?.id);

                spotifyApi.getMyCurrentPlaybackState().then((data => {
                    setIsPlaying(data.body?.is_playing);
                }
            ));
        });
        }

    };

    useEffect(() => {
        if(spotifyApi.getAccessToken() && !currentTrackId)
        {
            fetchCurrentSong();
            setVolume(50);
        }

    },[currentTrackId, spotifyApi, session])

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body.is_playing) {
                spotifyApi.pause();
                setIsPlaying(false);
            }else{
                spotifyApi.play();
                setIsPlaying(true);
            }
        });
    }
    
return (

    <div className='h-24 bg-gradient-to-b from-gray-800 to-gray-900 text-yellow-400 flex justify-between md:grid md:grid-cols-3 text-xs md:text-base px-2 md:px-8'>
        <div className='flex items-center space-x-4'>
            <img src={songInfo?.album.images?.[0]?.url} alt='' className='hidden md:inline h-10 w-10' />
            <div>
                <h3>{songInfo?.name}</h3>
                <p>{songInfo?.artists?.[0]?.name}</p>
            </div>
        </div>
        <div className='flex items-center justify-evenly'>
            <BackwardIcon className='button' onClick={() => spotifyApi.skipToPrevious()} />
            {isPlaying ? (
                <PauseCircleIcon className='button' onClick={handlePlayPause} />
            ) : (
                <PlayCircleIcon className='button' onClick={handlePlayPause} />
            )}
            <ForwardIcon className='button' onClick={() => spotifyApi.skipToNext} />
        </div>
        <div className='justify-self-end items-center align-middle flex justify-center md:hidden'>
                <DropUpPlaylistSelector />
        </div>
    </div>
)}

export default Player