import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import { Check } from "@material-ui/icons";
import { useMemo } from "react";
import { durationToString, numberWithinLimits } from "../../../core/utils";
import { ProgressUpdate } from "../../../shared/ipc";
import { AnalyzingProgressStep, ProgressState } from "../types";
import {
  getNameForBehaviourStep,
  getNameForCreateVideoStep,
  getNameForDlcStep,
  getStepStatesFromCurrentStep,
} from "../utils";

export const AnalyzingProgressCard = (props: AnalyzingProgressCardProps) => {
  return (
    <Card>
      <CardContent>
        <Box m={4}>
          <ProgressStepper
            step={props.progressUpdate ? props.progressUpdate.step : null}
          />
        </Box>
        <Typography variant="body1" align="right">
          {props.progressUpdate && props.progressUpdate.timeRemaining !== null
            ? `${durationToString(
                props.progressUpdate.timeRemaining
              )} remaining`
            : ""}
        </Typography>
        {props.progressUpdate && (
          <LinearProgress
            style={{ height: "14px" }}
            variant="determinate"
            value={numberWithinLimits(props.progressUpdate.progress, {
              low: 0,
              high: 100,
            })}
          />
        )}
      </CardContent>
    </Card>
  );
};

const ProgressStepper = (props: ProgressStepperProps) => {
  const stepStates = useMemo(() => getStepStatesFromCurrentStep(props.step), [
    props.step,
  ]);

  return (
    <Grid
      style={{
        margin: "auto",
        width: "425px",
        maxWidth: "100%",
      }}
      container
      direction="column"
      spacing={1}
    >
      <Grid item>
        <Step
          state={stepStates.dlcInference}
          text={getNameForDlcStep(stepStates.dlcInference)}
        />
      </Grid>
      <Grid item>
        <Step
          state={stepStates.behaviourAnalysis}
          text={getNameForBehaviourStep(stepStates.behaviourAnalysis)}
        />
      </Grid>
      <Grid item>
        <Step
          state={stepStates.annotatedVideoCreation}
          text={getNameForCreateVideoStep(stepStates.annotatedVideoCreation)}
        />
      </Grid>
    </Grid>
  );
};

const Step = (props: StepProps) => {
  function getStateIndicator(state: ProgressState) {
    switch (state) {
      case ProgressState.todo:
        return null;
      case ProgressState.active:
        return <CircularProgress size="22px" variant="indeterminate" />;
      case ProgressState.done:
        return <Check color="primary" />;
    }
  }
  function getTextColor(state: ProgressState) {
    if (state === ProgressState.done) {
      return "textSecondary";
    }
    return "initial";
  }

  return (
    <Box display="flex" alignItems="center">
      <Box
        width="30px"
        height="30px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        mr={1}
      >
        {getStateIndicator(props.state)}
      </Box>
      <Typography noWrap={true} variant="h5" color={getTextColor(props.state)}>
        {props.text}
      </Typography>
    </Box>
  );
};

interface StepProps {
  state: ProgressState;
  text: string;
}

export interface AnalyzingProgressCardProps {
  progressUpdate: ProgressUpdate | null;
}

interface ProgressStepperProps {
  step: AnalyzingProgressStep | null;
}
