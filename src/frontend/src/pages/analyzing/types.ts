export enum ProgressState {
  todo,
  active,
  done,
}

export interface StepStates {
  dlcInference: ProgressState;
  behaviourAnalysis: ProgressState;
  annotatedVideoCreation: ProgressState;
}

export enum AnalyzingProgressStep {
  dlcInference = "Step 1: DLC Inference",
  behaviourAnalysis = "Step 2: Behaviour Analysis",
  annotatedVideoCreation = "Step 3: Annotated Video Creation",
  finished = "Analysis Finished",
}
