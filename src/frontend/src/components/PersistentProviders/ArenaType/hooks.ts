import { useContext } from "react";
import { ArenaTypeContext } from "./provider";

export function useArenaType() {
  return useContext(ArenaTypeContext);
}
