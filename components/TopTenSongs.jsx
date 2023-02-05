import TopTenSong from './TopTenSong';
import { currentArtistTopTenState } from '../atoms/artistTopTenAtom';
import { useRecoilValue } from 'recoil';

function TopTenSongs() {

    const topTenSongsList = useRecoilValue(currentArtistTopTenState);
    
    return (
      <div className='text-greeen px-8 flex flex-col space-y-1 pb-28'>
          {topTenSongsList?.map((track, index) => (
              <div key={index}>
                  <TopTenSong key={track.id} track={track} order={index} />
              </div>
          ))}
      </div>
    )
  }
  

export default TopTenSongs