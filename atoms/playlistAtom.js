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