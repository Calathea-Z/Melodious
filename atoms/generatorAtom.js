import { atom } from "recoil";

//global state store for playlistID
export const generatedListState = atom({
    key: "generatedListState",
    default: null,
})