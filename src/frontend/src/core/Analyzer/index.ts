import { AnalyzingProgressStep } from "../../pages/analyzing/types";
import { ProgressUpdate, ResultsPaths } from "../../shared/ipc";
import { AnalysisIpcExit } from "../../shared/ipc/analysis";
import {
  ipcBehaviourController,
  IpcController,
  ipcTrackingController,
  ipcVideoCreatorController,
} from "./ipc";

export async function runAnalyzer({
  videoPath,
  arenaSetupPath,
  resultsPaths,
  onProgressUpdate,
  videoAverageFramerate,
}: {
  videoAverageFramerate: number;
  videoPath: string;
  arenaSetupPath: string;
  resultsPaths: ResultsPaths;
  onProgressUpdate: ProgressUpdateListener;
}): Promise<AnalysisIpcExit> {
  const trackingStep = createStep({
    args: {
      videoPath,
      outputH5Path: resultsPaths.trackingResultsH5Path,
    },
    ipcController: ipcTrackingController,
  });
  const behaviourStep = createStep({
    args: {
      trackingResultsH5Path: resultsPaths.trackingResultsH5Path,
      arenaSetupPath,
      framerate: videoAverageFramerate,
      outputJsonPath: resultsPaths.behaviourAssayResultsJsonPath,
    },
    ipcController: ipcBehaviourController,
  });
  const videoCreatorStep = createStep({
    args: {
      rawVideoPath: videoPath,
      trackingResultsH5Path: resultsPaths.trackingResultsH5Path,
      behaviourResultsJsonPath: resultsPaths.behaviourAssayResultsJsonPath,
      outputVideoPath: resultsPaths.outputVideoPath,
    },
    ipcController: ipcVideoCreatorController,
  });

  return await runSequentialSteps({
    steps: [
      {
        runStep: trackingStep,
        progressStep: AnalyzingProgressStep.dlcInference,
      },
      {
        runStep: behaviourStep,
        progressStep: AnalyzingProgressStep.behaviourAnalysis,
      },
      {
        runStep: videoCreatorStep,
        progressStep: AnalyzingProgressStep.annotatedVideoCreation,
      },
    ],
    onProgressUpdate,
  });
}

async function runSequentialSteps({
  steps,
  onProgressUpdate,
}: {
  steps: Step[];
  onProgressUpdate: ProgressUpdateListener;
}): Promise<AnalysisIpcExit> {
  for (const step of steps) {
    onProgressUpdate({
      step: step.progressStep,
      progress: 0,
      timeRemaining: null,
    });
    const exitInfo = await step.runStep({ onProgressUpdate });
    switch (exitInfo.type) {
      case "KILLED":
      case "ERROR":
        return exitInfo;
      default:
        onProgressUpdate({
          step: step.progressStep,
          progress: 100,
          timeRemaining: null,
        });
    }
  }
  onProgressUpdate({
    step: AnalyzingProgressStep.finished,
    progress: 100,
    timeRemaining: null,
  });
  return { type: "SUCCESS" };
}

interface Step {
  progressStep: AnalyzingProgressStep;
  runStep: AnalysisRunner;
}
type AnalysisRunner = ({
  onProgressUpdate,
}: {
  onProgressUpdate: ProgressUpdateListener;
}) => Promise<AnalysisIpcExit>;

export function stopAllAnalyzers() {
  for (const ipcController of [
    ipcTrackingController,
    ipcBehaviourController,
    ipcVideoCreatorController,
  ]) {
    ipcController.send({ type: "EXIT" });
  }
}

function createStep<Args>({
  args,
  ipcController,
}: {
  args: Args;
  ipcController: IpcController<Args>;
}): AnalysisRunner {
  return async ({ onProgressUpdate }) => {
    return new Promise((resolve) => {
      ipcController.send({ type: "START", data: args });
      ipcController.on((response) => {
        switch (response.type) {
          case "PROGRESS":
            onProgressUpdate(response.data);
            return;
          case "SUCCESS":
          case "KILLED":
          case "ERROR":
            resolve(response);
            return;
        }
      });
    });
  };
}

type ProgressUpdateListener = (progressUpdate: ProgressUpdate) => void;
