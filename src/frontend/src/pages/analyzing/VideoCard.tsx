import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { FolderOutlined } from "@material-ui/icons";
import React from "react";
import { useVideoMetadata } from "../../components/VideoMetadata/hooks";
import { durationToString, getStringFromMemorySize } from "../../core/utils";

export const VideoCard = (props: VideoCardProps) => {
  const metadata = useVideoMetadata(props.videoPath);
  return (
    <VideoCardStatic
      videoPath={props.videoPath}
      memorySize={metadata ? getStringFromMemorySize(metadata.nBytes) : ""}
      duration={
        metadata ? durationToString(metadata.durationInMilliseconds) : ""
      }
    />
  );
};

const VideoCardStatic = (props: VideoCardStaticProps) => {
  return (
    <Card>
      <CardMedia
        component="img"
        alt={`Screenshot of ${props.videoPath}.`}
        height="300"
        image="placeholder.png"
        title={`${props.videoPath}`}
      />
      <CardContent>
        <Grid container>
          <Grid item xs={10}>
            <Typography variant="h6">{props.videoPath}</Typography>
            <Typography variant="body2">{props.duration}</Typography>
            <Typography variant="body2">{props.memorySize}</Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton>
              <FolderOutlined />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

interface VideoCardStaticProps {
  videoPath: string | null;
  memorySize: string;
  duration: string;
}

interface VideoCardProps {
  videoPath: string | null;
}
