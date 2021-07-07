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
