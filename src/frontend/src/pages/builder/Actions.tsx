import { CircularProgress, Grid } from "@material-ui/core";
import {
  ChevronLeft,
  DoneAll,
  FlashOnRounded,
  CheckCircleRounded,
} from "@material-ui/icons";
import { useCallback, useMemo } from "react";
import { PrimaryButton, SecondaryButton } from "../../components/Buttons";
import DestructiveButton from "../../components/Buttons/DestructiveButton";
import { useVideoPathState } from "../../components/PersistentProviders/VideoPath";
import { useVideoOptimizer } from "../../components/VideoOptimizerProvider";

const BuilderActions = (props: BuilderHeaderProps) => {
  const optimizer = useVideoOptimizer();
  const vidPathState = useVideoPathState();

  const vidIsOptimized: boolean = useMemo(
    () => Boolean(vidPathState.path?.includes("OPTIMIZED")),
    [vidPathState.path]
  );

  const handleOptimizeSuccess = useCallback(
    (newPath: string) => {
      if (!vidPathState) return;
      vidPathState.setPath(newPath);
    },
    [vidPathState.setPath]
  );

  return (
    <Grid container justify="space-between">
      <Grid item>
        <DestructiveButton
          icon={<ChevronLeft />}
          text="Discard and Exit"
          onClick={props.onExitClick}
        />
      </Grid>
      <Grid item>
        <Grid container spacing={4}>
          {vidPathState.path && (
            <Grid item>
              <SecondaryButton
                icon={
                  optimizer?.isRunning ? (
                    <CircularProgress size="20px" />
                  ) : vidIsOptimized ? (
                    <CheckCircleRounded />
                  ) : (
                    <FlashOnRounded />
                  )
                }
                text={
                  optimizer?.isRunning
                    ? "Optimizing"
                    : vidIsOptimized
                    ? "Optimized"
                    : "Optimize Video"
                }
                onClick={() =>
                  optimizer?.runOptimization &&
                  vidPathState.path &&
                  optimizer.runOptimization({
                    vidPath: vidPathState.path,
                    onSuccess: handleOptimizeSuccess,
                  })
                }
                disabled={optimizer?.isRunning || vidIsOptimized}
              />
            </Grid>
          )}
          <Grid item>
            <PrimaryButton
              icon={<DoneAll />}
              text="Save and Analyze"
              onClick={props.onSaveClick}
              disabled={!props.onSaveClick}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

interface BuilderHeaderProps {
  hasVideo: boolean;
  onSaveClick?: () => void;
  onExitClick: () => void;
}

export { BuilderActions };
