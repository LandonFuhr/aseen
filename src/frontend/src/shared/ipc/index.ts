import { AnalyzingProgressStep } from "../../pages/analyzing/types";
import type { BehaviourResults } from "./BehaviourResults";

export const OPEN_DIALOG_CHANNEL = "open-dialog";
export const VID_METADATA_CHANNEL = "get-file-metadata";
export const SAVE_ARENA_SETUP_CHANNEL = "save-arena-setup";
export const TRACKING_CHANNEL = "tracking";
export const BEHAVIOUR_CHANNEL = "behaviour";
export const CREATE_VIDEO_CHANNEL = "create-video";
export const RESULTS_PATHS_CREATION_CHANNEL = "create-results-paths";
export const READ_BEHAVIOUR_RESULTS_FILE_CHANNEL = "read-behaviour-results";
export const READ_ALL_SAVED_RESULTS = "read-all-saved-results";

export interface FileMetadata {
  createdAtDate: Date;
  nBytes: number;
  averageFramerate: number;
  durationInMilliseconds: number;
  dimensionsInPx: {
    width: number;
    height: number;
  };
}

export interface FileMetadataRequest {
  path: string;
}

export interface ResultsPathsRequest {
  arenaSetupPath: string;
}

export interface AnalyzerResult {
  resultsFolderPath: string;
}

export interface DataToAnalyze {
  arenaSetupPath: string;
  videoPath: string;
}

export type ArenaSetupPath = string;

export interface AllResults {
  resultsFolderPath: string;
  behaviourResultsJsonPath: string;
  trackingResultsH5Path: string;
  outputVideoPath: string;
}

export interface VideoCreationResults {
  outputVideoPath: string;
}

export interface VideoCreatorTrigger {
  rawVideoPath: string;
  behaviourResultsJsonPath: string;
  trackingResultsH5Path: string;
  resultsFolderPath: string;
}

export interface ProgressUpdate {
  progress: number;
  step: AnalyzingProgressStep;
  timeRemaining: number | null;
}

export interface ResultsPaths {
  resultsFolder: string;
  trackingResultsH5Path: string;
  behaviourAssayResultsJsonPath: string;
  outputVideoPath: string;
}

export interface JsonFileOpenRequest {
  path: string;
}

export type { BehaviourResults };
export type { SavedResult } from "./SavedResults";
