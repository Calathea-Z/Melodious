
import { currentArtistTopTenState } from '../atoms/artistTopTenAtom';
import { useRecoilValue } from 'recoil';
import TopTenSong from './TopTenSong';

function TopTenSongs() {
    const topTenSongsList = useRecoilValue(currentArtistTopTenState);
    return (
      <div className='text-greeen px-8 flex flex-col space-y-1 pb-28'>
          {topTenSongsList?.map((track, index) => (
              <div>
                  <TopTenSong key={track.id} track={track} order={index} />
              </div>
          ))}
      </div>
    )
  }
  

export default TopTenSongs

{/* <div className='text-greeen px-8 flex flex-col space-y-1 pb-28'>
                    {topTenSongList?.map((track, index) => (
                        <div>
                            <h1 key={track.id}>
                            {index} {track.name} 
                            {console.log("hi", track.name)}
                            </h1>
                        </div>
                    ))}
                </div> */}