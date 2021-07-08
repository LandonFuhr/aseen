import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@material-ui/core";
import { useVideoMetadata } from "../../components/VideoMetadata/hooks";
import { showFileInFolder } from "../../core/electron/shell";
import { durationToString, getStringFromMemorySize } from "../../core/utils";

export const VideoCard = (props: VideoCardProps) => {
  const metadata = useVideoMetadata(props.videoPath);
  function handleOpenVideoClick() {
    if (!props.videoPath) return;
    showFileInFolder(props.videoPath);
  }

  return (
    <VideoCardStatic
      videoPath={props.videoPath}
      memorySize={metadata ? getStringFromMemorySize(metadata.nBytes) : ""}
      duration={
        metadata ? durationToString(metadata.durationInMilliseconds) : ""
      }
      onClick={handleOpenVideoClick}
    />
  );
};

export const VideoCardStatic = (props: VideoCardStaticProps) => {
  return (
    <Card>
      <CardActionArea onClick={props.onClick}>
        {props.videoPath ? (
          <CardMedia
            component="video"
            width="100%"
            src={props.videoPath}
            title={`${props.videoPath}`}
            autoPlay={true}
            loop={true}
            muted={true}
          />
        ) : (
          <CardMedia component="img" width="100%" image="placeholder.png" />
        )}

        <CardContent>
          <Typography variant="h6">{props.videoPath}</Typography>
          <Typography variant="body2">{props.duration}</Typography>
          <Typography variant="body2">{props.memorySize}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export interface VideoCardStaticProps {
  videoPath: string | null;
  memorySize: string;
  duration: string;
  onClick?: () => void;
}

interface VideoCardProps {
  videoPath: string | null;
}
