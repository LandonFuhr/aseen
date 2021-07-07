import { Grid } from "@material-ui/core";
import { MovieRounded } from "@material-ui/icons";
import { PrimaryButton } from "../../../components/Buttons";
import { useArenaType } from "../../../components/PersistentProviders/ArenaType";
import { arenaTypeToString } from "../../../core/utils";
import { openDialog } from "../../../core/electron/ipc";
import { getMockLevel, MockLevel, WebMock } from "../../../mocks/mocks";
import { ArenaType } from "../../../core/types";

interface DialogSelectionResult {
  filePaths: string[];
}

async function selectVideo(arenaType: ArenaType): Promise<string> {
  switch (getMockLevel()) {
    case MockLevel.WEB:
      return WebMock.videoPath;
    default:
      return openDialog({
        title: `Select ${arenaTypeToString(arenaType)} video to analyze`,
        filters: [{ name: "Videos", extensions: ["mkv", "avi", "mp4"] }],
      }).then((selection: DialogSelectionResult) => {
        const filePath = selection.filePaths[0];
        if (filePath === undefined) {
          throw new Error("No file paths were returned from open dialog.");
        }
        return filePath;
      });
  }
}

export const SelectVideoArea = (props: SelectVideoAreaProps) => {
  const arenaTypeState = useArenaType();

  async function handleSelectVideoClick() {
    if (!arenaTypeState?.arenaType) return;
    selectVideo(arenaTypeState.arenaType)
      .then((videoPath) => {
        if (videoPath !== "") {
          props.onSelectVideo(videoPath);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return (
    <Grid
      className="video-selection-area"
      container
      alignItems="center"
      justify="center"
      style={{ height: "80vh" }}
    >
      <Grid item>
        <PrimaryButton
          icon={<MovieRounded />}
          text="Select Video"
          onClick={handleSelectVideoClick}
        />
      </Grid>
    </Grid>
  );
};

export interface SelectVideoAreaProps {
  onSelectVideo: (vidSrc: string) => void;
}
