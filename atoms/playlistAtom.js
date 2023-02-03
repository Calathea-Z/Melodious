import { atom } from "recoil";

//global state store for playlistID
export const playlistIdState = atom({
    key: "playlistIdState",
    default: "55RKW0km5n65C2MMPlRDk0",
})

//global state store for playlist
export const playlistState = atom({
    key: "playlistState",
    default: null,
})

export const allPlaylistsState = atom({
    key: "allPlaylistsState",
    default: [],
})
//global state store for currently selected song URI
export const songUriState = atom({
    key: "songUriState",
    default: [],
})

export const createdPlaylistIdState = atom({
    key: "createdPlaylistIdState",
    default: "null",
})

// "spotify:track:0njoGyz7YLEOqgwYP9QOwn"