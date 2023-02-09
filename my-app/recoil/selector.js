import { selector } from "recoil";
import { loggedIn } from "./atom";

const loggedIn = selector({
    key: 'loggedIn',
    get: async ({ get }) => get(loggedIn),
    set: async ({ set }, updatedLogState) => set(loggedIn, updatedLogState)
  });