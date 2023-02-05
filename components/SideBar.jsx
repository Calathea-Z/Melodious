import useSpotify from "../hooks/useSpotify";
import CreatePlaylist from "./CreatePlaylist";
import { HomeIcon, MagnifyingGlassCircleIcon, PlusCircleIcon, CodeBracketSquareIcon } from "@heroicons/react/24/outline";
import { playlistIdState, allPlaylistsState } from "../atoms/playlistAtom";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { modalState } from "../atoms/modalAtom";

const Sidebar = () => {
  const [playlists, setPlaylists] = useRecoilState(allPlaylistsState);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  
  //------------Populates user playlists each time the session changes or the spotifyApi is called.
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className="text-greeen p-5 text-xs lg:text-sm border-r border-greeen overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36">
      <div className="space-y-4">
        <button
          className="flex items-center space-x-2 hover:text-yellow-400"
          onClick={() => router.push("/")}
        >
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <hr className="border-t-[0.1px] border-greeen pb-2" />
        <button
          className="flex items-center space-x-2 hover:text-yellow-400"
          onClick={() => router.push("/suggestions")}
        >
          <CodeBracketSquareIcon className="h-5 w-5" />
          <p>Ask For Suggestions</p>
        </button>
        <hr className="border-t-[0.1px] border-greeen pb-2" />
        <button
          className="flex items-center space-x-2 hover:text-yellow-400"
          onClick={() => router.push("/searchbyartists")}
        >
          <MagnifyingGlassCircleIcon className="h-5 w-5" />
          <p>Search by Artist</p>
        </button>
        <CreatePlaylist />

        {/* ------------Opens Modal for creating a new playlist.                */}
        <hr className="border-t-[0.1px] border-greeen" />
        <button
          className="flex items-center space-x-2 hover:text-yellow-400"
          onClick={() => setOpen(true)}
        >
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create New Playlist</p>
        </button>
        <hr className="border-t-[0.1px] border-greeen" />
        {playlists.map((playlist) => (
          <p
            key={playlist.id}
            className="cursor-pointer hover:text-yellow-400"
            onClick={() => {
              setPlaylistId(playlist.id)
              router.push('/');
            }}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
