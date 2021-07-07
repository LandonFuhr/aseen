import { IconButton } from "@material-ui/core";
import { Pause, PlayArrow } from "@material-ui/icons";
import { MouseEvent, useState } from "react";
import { togglePlayPause, useEffectEveryFrame, videoIsPaused } from "./utils";

export const PlayPauseButton = ({ video }: PlayPauseButtonProps) => {
  const isPaused = usePlayPauseState(video);

  function handlePlayPauseClick(e: MouseEvent<HTMLButtonElement>) {
    togglePlayPause(video);
    // if button is still focused, space bar will toggle both this and global keyboard listener
    e.currentTarget.blur();
  }

  return (
    <IconButton onClick={handlePlayPauseClick}>
      {isPaused ? <PlayArrow /> : <Pause />}
    </IconButton>
  );
};

function usePlayPauseState(video: HTMLVideoElement) {
  const [isPaused, setIsPaused] = useState(true);

  useEffectEveryFrame(() => {
    setIsPaused(videoIsPaused(video));
  }, [video]);

  return isPaused;
}

interface PlayPauseButtonProps {
  video: HTMLVideoElement;
}
