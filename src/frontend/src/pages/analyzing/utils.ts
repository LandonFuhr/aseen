import { AnalyzingProgressStep, ProgressState, StepStates } from "./types";

export function getStepStatesFromCurrentStep(
  currentStep: AnalyzingProgressStep | null
): StepStates {
  switch (currentStep) {
    case null:
      return {
        dlcInference: ProgressState.todo,
        behaviourAnalysis: ProgressState.todo,
        annotatedVideoCreation: ProgressState.todo,
      };
    case AnalyzingProgressStep.dlcInference:
      return {
        dlcInference: ProgressState.active,
        behaviourAnalysis: ProgressState.todo,
        annotatedVideoCreation: ProgressState.todo,
      };
    case AnalyzingProgressStep.behaviourAnalysis:
      return {
        dlcInference: ProgressState.done,
        behaviourAnalysis: ProgressState.active,
        annotatedVideoCreation: ProgressState.todo,
      };
    case AnalyzingProgressStep.annotatedVideoCreation:
      return {
        dlcInference: ProgressState.done,
        behaviourAnalysis: ProgressState.done,
        annotatedVideoCreation: ProgressState.active,
      };
    case AnalyzingProgressStep.finished:
      return {
        dlcInference: ProgressState.done,
        behaviourAnalysis: ProgressState.done,
        annotatedVideoCreation: ProgressState.done,
      };
  }
}

export function getNameForDlcStep(state: ProgressState): string {
  switch (state) {
    case ProgressState.todo:
      return "Track with Deep Learning";
    case ProgressState.active:
      return "Tracking with Deep Learning";
    case ProgressState.done:
      return "Tracked with Deep Learning";
  }
}

export function getNameForBehaviourStep(state: ProgressState): string {
  switch (state) {
    case ProgressState.todo:
      return "Analyze Behavioural Test Results";
    case ProgressState.active:
      return "Analyzing Behavioural Test Results";
    case ProgressState.done:
      return "Analyzed Behavioural Test Results";
  }
}

export function getNameForCreateVideoStep(state: ProgressState): string {
  switch (state) {
    case ProgressState.todo:
      return "Create Annotated Video";
    case ProgressState.active:
      return "Creating Annotated Video";
    case ProgressState.done:
      return "Created Annotated Video";
  }
}
