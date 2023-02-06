import { atom } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const successScreenState = atom({
  key: "successScreenState",
  default: false,
});
