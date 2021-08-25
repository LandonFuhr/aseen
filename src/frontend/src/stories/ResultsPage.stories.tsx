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

function onHomeClick() {
  console.log("Home");
}

function handleOpenResultsFolder() {
  console.log("Open results folder");
}
