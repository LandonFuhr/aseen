import { Story } from "@storybook/react";
import { Results, ResultsPageProps } from "../pages/results";
import { createFakeBehaviourResults } from "./data/results";

export default {
  title: "Results Page",
  component: Results,
};

const Template: Story<ResultsPageProps> = (args) => <Results {...args} />;

export const SingleMouseNoRegions = Template.bind({});
SingleMouseNoRegions.args = {
  onHomeClick,
  handleOpenResultsFolder,
  behaviourResults: createFakeBehaviourResults({ nAnimals: 1, nRegions: 0 }),
};

export const SingleMouseWithRegions = Template.bind({});
SingleMouseWithRegions.args = {
  onHomeClick,
  handleOpenResultsFolder,
  behaviourResults: createFakeBehaviourResults({ nAnimals: 1, nRegions: 3 }),
};

export const MultiMouseNoRegions = Template.bind({});
MultiMouseNoRegions.args = {
  onHomeClick,
  handleOpenResultsFolder,
  behaviourResults: createFakeBehaviourResults({ nAnimals: 3, nRegions: 0 }),
};

export const MultiMouseWithRegions = Template.bind({});
MultiMouseWithRegions.args = {
  onHomeClick,
  handleOpenResultsFolder,
  behaviourResults: createFakeBehaviourResults({ nAnimals: 3, nRegions: 3 }),
};

const behaviourResultsWithMissingMouse = createFakeBehaviourResults({
  nAnimals: 3,
  nRegions: 3,
});
behaviourResultsWithMissingMouse.data.push({
  animalId: "Missing Mouse",
  statsOverall: {
    totalDistanceTravelledInPixels: 0,
    averageSpeedInPixelsPerSecond: 0,
    fractionOfFramesWithAnimalPartlyDetected: 0,
    fractionOfFramesWithAnimalFullyDetected: 0,
  },
  statsPerRegion: [],
  sourceData: {
    distanceTravelledBetweenEachFrameInPixels: [],
  },
});
export const MissingMouse = Template.bind({});
MissingMouse.args = {
  onHomeClick,
  handleOpenResultsFolder,
  behaviourResults: behaviourResultsWithMissingMouse,
};

export const Empty = Template.bind({});
Empty.args = {
  onHomeClick,
  handleOpenResultsFolder,
  behaviourResults: createFakeBehaviourResults({ nAnimals: 0, nRegions: 0 }),
};

function onHomeClick() {
  console.log("Home");
}

function handleOpenResultsFolder() {
  console.log("Open results folder");
}
