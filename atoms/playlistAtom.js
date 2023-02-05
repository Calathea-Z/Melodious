import { atom } from "recoil";

//-----global state store for playlistID
export const playlistIdState = atom({
  key: "playlistIdState",
  default: "4gIhLJGOgBCGRRfuLqn94i",
});

//-----global state store for playlist
export const playlistState = atom({
  key: "playlistState",
  default: null,
});

//---global state store for the entire playlist list.
export const allPlaylistsState = atom({
  key: "allPlaylistsState",
  default: [],
});

//-----global state store for currently selected song URI
export const songUriState = atom({
  key: "songUriState",
  default: [],
});

//-----global state store for the ID of the currently created and selected playlist.
export const createdPlaylistIdState = atom({
  key: "createdPlaylistIdState",
  default: "null",
});
