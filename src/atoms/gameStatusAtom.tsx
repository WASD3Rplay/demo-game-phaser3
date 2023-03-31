import { atom } from "recoil";

type PageStatus =
  | "before_login"
  | "ready_to_game"
  | "playing_game"
  | "game_over";

export const pageStatusAtom = atom<PageStatus>({
  key: "pageStatus",
  default: "before_login",
});
