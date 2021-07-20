export interface BehaviourResults {
  metadata: BehaviourResultsMetadata;
  data: BehaviourResultsData[];
}

interface BehaviourResultsMetadata {
  inputPaths: {
    arenaSetup: string;
    trackingResults: string;
  };
  behaviourAnalysisAlgorithmId: string;
}

export interface BehaviourResultsData {
  animalId: string;
  statsPerRegion: RegionStats[];
  statsOverall: RegionOverallStats;
  sourceData: RegionSourceData;
}

export interface RegionOverallStats {
  totalDistanceTravelledInPixels: number;
  averageSpeedInPixelsPerSecond: number;
  fractionOfFramesWithAnimalDetected: number;
}

export interface RegionSourceData {
  distanceTravelledBetweenEachFrameInPixels: number[];
}

export interface RegionStats {
  regionId: string;
  secondsFullyInside: number;
  secondsPartlyInside: number;
  secondsOfInteraction: number;
  nEntries: number;
}
