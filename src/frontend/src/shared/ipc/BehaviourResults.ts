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
  statsOverall: AnimalOverallStats;
  sourceData: AnimalSourceData;
}

export interface AnimalOverallStats {
  totalDistanceTravelledInPixels: number;
  averageSpeedInPixelsPerSecond: number;
  fractionOfFramesWithAnimalDetected: number;
}

export interface AnimalSourceData {
  distanceTravelledBetweenEachFrameInPixels: number[];
}

export interface RegionStats {
  regionId: string;
  secondsFullyInside: number;
  secondsPartlyInside: number;
  secondsOfInteraction: number;
  nEntries: number;
}
