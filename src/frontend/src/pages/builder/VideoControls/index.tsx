import { Grid, Box } from "@material-ui/core";
import { useVideoKeyboardShortcuts } from "./keyboardShortcuts";
import { PlayPauseButton } from "./PlayPause";
import { VideoTimeSlider } from "./TimeSlider";
import { TimeText } from "./TimeText";

export const VideoControls = ({ video }: VideoControlsProps) => {
  useVideoKeyboardShortcuts(video);

  return (
    <Grid container>
      <Grid item xs={12}>
        <VideoTimeSlider video={video} />
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" mt={-2} ml={-1}>
          <PlayPauseButton video={video} />
          <Box ml={2}>
            <TimeText video={video} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

interface VideoControlsProps {
  video: HTMLVideoElement;
}
