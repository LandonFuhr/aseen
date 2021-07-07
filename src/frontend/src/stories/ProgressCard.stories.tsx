import { Story } from "@storybook/react";
import {
  AnalyzingProgressCard,
  AnalyzingProgressCardProps,
} from "../pages/analyzing/ProgressCard";
import { AnalyzingProgressStep } from "../pages/analyzing/types";

export default {
  title: "Anaylsis Progress Card",
  component: AnalyzingProgressCard,
};

const Template: Story<AnalyzingProgressCardProps> = (args) => (
  <AnalyzingProgressCard {...args} />
);

export const Step1 = Template.bind({});
Step1.args = {
  progressUpdate: {
    progress: 30,
    step: AnalyzingProgressStep.dlcInference,
    timeRemaining: 1094,
  },
};
