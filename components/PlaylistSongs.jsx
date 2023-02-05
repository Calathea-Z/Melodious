import PlaylistSong from "./PlaylistSong";
import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";

function PlaylistSongs() {
  const playlist = useRecoilValue(playlistState);
  
  return (
    <div className="text-greeen px-8 flex flex-col space-y-1 pb-28">
      {playlist?.tracks?.items?.map((track, index) => (
        <div>
          <PlaylistSong key={track.track.id} track={track} order={index} />
        </div>
      ))}
    </div>
  );
}

export default PlaylistSongs;
