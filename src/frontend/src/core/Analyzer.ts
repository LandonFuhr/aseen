import {
  BEHAVIOUR_CHANNEL,
  CREATE_VIDEO_CHANNEL,
  ProgressUpdate,
  ResultsPaths,
  TRACKING_CHANNEL,
} from "../shared/ipc";
import {
  BehaviourArgs,
  TrackingArgs,
  VideoCreatorArgs,
} from "../shared/ipc/analysis";
import { ipcRenderer } from "./electron/ipc";

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
}): Promise<void> {
  const trackingArgs: TrackingArgs = {
    videoPath,
    outputH5Path: resultsPaths.trackingResultsH5Path,
  };
  const behaviourArgs: BehaviourArgs = {
    trackingResultsH5Path: resultsPaths.trackingResultsH5Path,
    arenaSetupPath,
    framerate: videoAverageFramerate,
    outputJsonPath: resultsPaths.behaviourAssayResultsJsonPath,
  };
  const videoCreatorArgs: VideoCreatorArgs = {
    rawVideoPath: videoPath,
    trackingResultsH5Path: resultsPaths.trackingResultsH5Path,
    behaviourResultsJsonPath: resultsPaths.behaviourAssayResultsJsonPath,
    outputVideoPath: resultsPaths.outputVideoPath,
  };
  await runTracking({ trackingArgs, onProgressUpdate });
  await runBehaviour({ behaviourArgs, onProgressUpdate });
  await runVideoCreator({ videoCreatorArgs, onProgressUpdate });
}

async function runAnalysisStep<T>({
  args,
  channel,
  onProgressUpdate,
}: {
  args: T;
  channel: string;
  onProgressUpdate: ProgressUpdateListener;
}): Promise<void> {
  return new Promise((resolve, reject) => {
    ipcRenderer.send(channel, args);
    ipcRenderer.on(channel, (_event, args) => {
      switch (args.type) {
        case "progress_update":
          onProgressUpdate(args.data);
          break;
        case "error_message":
          reject(args.data.error);
          break;
        case "success_message":
          resolve();
      }
    });
  });
}

async function runTracking({
  trackingArgs,
  onProgressUpdate,
}: {
  trackingArgs: TrackingArgs;
  onProgressUpdate: ProgressUpdateListener;
}): Promise<void> {
  await runAnalysisStep({
    args: trackingArgs,
    channel: TRACKING_CHANNEL,
    onProgressUpdate,
  });
}

async function runBehaviour({
  behaviourArgs,
  onProgressUpdate,
}: {
  behaviourArgs: BehaviourArgs;
  onProgressUpdate: ProgressUpdateListener;
}): Promise<void> {
  await runAnalysisStep({
    args: behaviourArgs,
    channel: BEHAVIOUR_CHANNEL,
    onProgressUpdate,
  });
}

async function runVideoCreator({
  videoCreatorArgs,
  onProgressUpdate,
}: {
  videoCreatorArgs: VideoCreatorArgs;
  onProgressUpdate: ProgressUpdateListener;
}) {
  await runAnalysisStep({
    args: videoCreatorArgs,
    channel: CREATE_VIDEO_CHANNEL,
    onProgressUpdate,
  });
}

type ProgressUpdateListener = (progressUpdate: ProgressUpdate) => void;
