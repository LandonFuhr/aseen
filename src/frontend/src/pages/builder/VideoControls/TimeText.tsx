import { useState } from "react";
import { useEffectEveryFrame } from "./utils";
import { Box, Typography } from "@material-ui/core";

export const TimeText = ({ video }: TimeTextProps) => {
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffectEveryFrame(() => {
    setCurrentTime(video.currentTime);
  }, [video]);

  return (
    <Box>
      <Typography variant="body1">
        {videoTimeStringFromSeconds(currentTime)} /{" "}
        {!isNaN(video.duration) && videoTimeStringFromSeconds(video.duration)}
      </Typography>
    </Box>
  );
};

function videoTimeStringFromSeconds(videoTime: number): string {
  return new Date(1000 * videoTime).toISOString().substr(11, 12);
}

interface TimeTextProps {
  video: HTMLVideoElement;
}
