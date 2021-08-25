import { BehaviourResults } from "../../shared/ipc";
import {
  BehaviourResultsData,
  RegionStats,
} from "../../shared/ipc/BehaviourResults";

export function createFakeBehaviourResults({
  nAnimals,
  nRegions,
}: {
  nAnimals: number;
  nRegions: number;
}): BehaviourResults {
  return {
    metadata: {
      inputPaths: {
        arenaSetup: "example/arena/setup/path",
        trackingResults: "example/tracking/results/path",
      },
      behaviourAnalysisAlgorithmId: "SOME ID",
    },
    data: createMultipleFakeAnimalData({ nAnimals, nRegions }),
  };
}

function createMultipleFakeAnimalData({
  nAnimals,
  nRegions,
}: {
  nAnimals: number;
  nRegions: number;
}): BehaviourResultsData[] {
  const data: BehaviourResultsData[] = [];
  for (let i = 0; i < nAnimals; i++) {
    data.push(createAnimalData({ animalId: `Mouse_${i + 1}`, nRegions }));
  }
  return data;
}

function createAnimalData({
  animalId,
  nRegions,
}: {
  animalId: string;
  nRegions: number;
}): BehaviourResultsData {
  return {
    animalId,
    statsOverall: {
      totalDistanceTravelledInPixels: 1000,
      averageSpeedInPixelsPerSecond: 3,
      fractionOfFramesWithAnimalFullyDetected: 0.8,
      fractionOfFramesWithAnimalPartlyDetected: 0.95,
    },
    statsPerRegion: Array(nRegions).fill(regionStats),
    sourceData: {
      distanceTravelledBetweenEachFrameInPixels: [],
    },
  };
}

const regionStats: RegionStats = {
  regionId: "Chamber",
  secondsFullyInside: 13.4,
  secondsPartlyInside: 17.4,
  secondsOfInteraction: 3.4,
  nEntries: 10,
};
