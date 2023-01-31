import useSpotify from '../hooks/useSpotify';
import time from '../lib/time';

function Song({ order, track }) {
    const spotifyApi = useSpotify();
  return (
    <div className='grid grid-cols-2'>
        <div className='flex items-center space-x-4'>
            <p>{order + 1}</p>
            <img src={track.track.album.images[0].url} alt='' className='h-20 w-20' />
            <div>
                <p>{track.track.name}</p>
                <p>{track.track.artists[0].name}</p>
            </div>
        </div>
        <div className='flex items-center justify-between ml-auto md:ml-0'>
            <p className='hidden md:inline'>{track.track.album.name}</p>
            <p>{time(track.track.duration_ms)}</p>
        </div>
    </div>
  )
}

export default Song