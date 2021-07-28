import { Story } from "@storybook/react";
import { mouseColors } from "../core/mouseColors";
import { ResultsTable, ResultsTableProps } from "../pages/results/ResultsTable";

export default {
  title: "Results Table",
  component: ResultsTable,
};

const Template: Story<ResultsTableProps> = (args) => <ResultsTable {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: {
    animalId: "Mouse 1",
    statsPerRegion: [
      {
        regionId: "Chamber 1",
        secondsFullyInside: 34.651235,
        secondsPartlyInside: 195.2123,
        secondsOfInteraction: 12.41235,
        nEntries: 14,
      },
      {
        regionId: "Cup 1",
        secondsFullyInside: 15.35,
        secondsPartlyInside: 150.41414,
        secondsOfInteraction: 4.4519235,
        nEntries: 30,
      },
    ],
    statsOverall: {
      totalDistanceTravelledInPixels: 1941.42,
      averageSpeedInPixelsPerSecond: 10.6,
      fractionOfFramesWithAnimalFullyDetected: 0.8413,
      fractionOfFramesWithAnimalPartlyDetected: 1.0,
    },
    sourceData: {
      distanceTravelledBetweenEachFrameInPixels: [
        0.4,
        14.1,
        0.1,
        0.5,
        0.8,
        0.9,
      ],
    },
  },
  backgroundColor: mouseColors[0]?.translucent,
  dotColor: mouseColors[0]?.opaque,
};
