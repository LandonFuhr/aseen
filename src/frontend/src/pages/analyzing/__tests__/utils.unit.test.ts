import { AnalyzingProgressStep, ProgressState, StepStates } from "../types";
import {
  getNameForBehaviourStep,
  getNameForCreateVideoStep,
  getNameForDlcStep,
  getStepStatesFromCurrentStep,
} from "../utils";

describe("Tracking step name creator", () => {
  it("returns 'Track with Deep Learning' when tracking has yet to be started", () => {
    expect(getNameForDlcStep(ProgressState.todo)).toEqual(
      "Track with Deep Learning"
    );
  });

  it("returns 'Tracking with Deep Learning' when tracking is underway", () => {
    expect(getNameForDlcStep(ProgressState.active)).toEqual(
      "Tracking with Deep Learning"
    );
  });

  it("returns 'Tracked with Deep Learning' when tracking has been completed", () => {
    expect(getNameForDlcStep(ProgressState.done)).toEqual(
      "Tracked with Deep Learning"
    );
  });
});

describe("Behavioural test name creator", () => {
  it("returns 'Analyze Behavioural Test Results' when the behavioural test has yet to be started", () => {
    expect(getNameForBehaviourStep(ProgressState.todo)).toEqual(
      "Analyze Behavioural Test Results"
    );
  });
  it("returns 'Analyzing Behavioural Test Results' when the behavioural test is underway", () => {
    expect(getNameForBehaviourStep(ProgressState.active)).toEqual(
      "Analyzing Behavioural Test Results"
    );
  });
  it("returns 'Analyzed Behavioural Test Results' when the behavioural test has been completed", () => {
    expect(getNameForBehaviourStep(ProgressState.done)).toEqual(
      "Analyzed Behavioural Test Results"
    );
  });
});

describe("Create annotated video name creator", () => {
  it("returns '' when the video has yet to be made", () => {
    expect(getNameForCreateVideoStep(ProgressState.todo)).toEqual(
      "Create Annotated Video"
    );
  });
  it("returns '' when the video is currently being made", () => {
    expect(getNameForCreateVideoStep(ProgressState.active)).toEqual(
      "Creating Annotated Video"
    );
  });
  it("returns '' when the video has been made", () => {
    expect(getNameForCreateVideoStep(ProgressState.done)).toEqual(
      "Created Annotated Video"
    );
  });
});

describe("All step states from current step", () => {
  it("returns correct steps when current step is null", () => {
    const expected: StepStates = {
      dlcInference: ProgressState.todo,
      behaviourAnalysis: ProgressState.todo,
      annotatedVideoCreation: ProgressState.todo,
    };
    expect(getStepStatesFromCurrentStep(null)).toEqual(expected);
  });

  it("returns correct steps when current step is tracking", () => {
    const expected: StepStates = {
      dlcInference: ProgressState.active,
      behaviourAnalysis: ProgressState.todo,
      annotatedVideoCreation: ProgressState.todo,
    };
    expect(
      getStepStatesFromCurrentStep(AnalyzingProgressStep.dlcInference)
    ).toEqual(expected);
  });

  it("returns correct steps when current step is behavioural analysis", () => {
    const expected: StepStates = {
      dlcInference: ProgressState.done,
      behaviourAnalysis: ProgressState.active,
      annotatedVideoCreation: ProgressState.todo,
    };
    expect(
      getStepStatesFromCurrentStep(AnalyzingProgressStep.behaviourAnalysis)
    ).toEqual(expected);
  });

  it("returns correct steps when current step is annotated video creation", () => {
    const expected: StepStates = {
      dlcInference: ProgressState.done,
      behaviourAnalysis: ProgressState.done,
      annotatedVideoCreation: ProgressState.active,
    };
    expect(
      getStepStatesFromCurrentStep(AnalyzingProgressStep.annotatedVideoCreation)
    ).toEqual(expected);
  });
});
