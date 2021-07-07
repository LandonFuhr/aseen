import { useContext } from "react";
import { VideoPathContext } from "./provider";

export function useVideoPathState() {
  return useContext(VideoPathContext);
}
