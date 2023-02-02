
function GeneratedSongs() {
        const generatedSongsList = useRecoilValue(currentArtistState);
        return (
          <div className='text-greeen px-8 flex flex-col space-y-1 pb-28'>
              {GeneratedSongsList?.map((track, index) => (
                  <div key={index}>
                      <GeneratedSong key={track.id} track={track} order={index} />
                  </div>
              ))}
          </div>
        )
      }
      
    
export default GeneratedSongs
