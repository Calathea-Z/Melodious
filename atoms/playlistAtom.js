import { atom } from "recoil";

//global state store for playlistID
export const playlistIdState = atom({
    key: "playlistIdState",
    default: "4vtUXzV3G7AKO6bLRSngLd",
})

//global state store for playlist
export const playlistState = atom({
    key: "playlistState",
    default: null,
})