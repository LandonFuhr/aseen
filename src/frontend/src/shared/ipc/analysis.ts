import { AnalyzingProgressStep } from "../../pages/analyzing/types";

type AnalysisIpcUpdate = ProgressUpdate;
export type AnalysisIpcExit = ErrorExit | SuccessExit | KillExit;

export type AnalysisIpcResponse = AnalysisIpcExit | AnalysisIpcUpdate;
export type AnalysisIpcSignal<Args> = StartSignal<Args> | ExitSignal;

interface ProgressUpdate {
  type: "PROGRESS";
  data: {
    progress: number;
    timeRemaining: number | null;
    step: AnalyzingProgressStep;
  };
}

interface KillExit {
  type: "KILLED";
  data: {
    code: number | null;
    signal: NodeJS.Signals | null;
  };
}

interface SuccessExit {
  type: "SUCCESS";
}

interface ErrorExit {
  type: "ERROR";
  data: {
    error: string;
  };
}

interface StartSignal<Args> {
  type: "START";
  data: Args;
}

interface ExitSignal {
  type: "EXIT";
}

export interface TrackingArgs {
  videoPath: string;
  outputH5Path: string;
}

export interface BehaviourArgs {
  trackingResultsH5Path: string;
  arenaSetupPath: string;
  framerate: number;
  outputJsonPath: string;
}

export interface VideoCreatorArgs {
  rawVideoPath: string;
  trackingResultsH5Path: string;
  behaviourResultsJsonPath: string;
  outputVideoPath: string;
}
