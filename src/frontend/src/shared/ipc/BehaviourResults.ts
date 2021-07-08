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
}

export interface RegionStats {
  regionId: string;
  secondsFullyInside: number;
  secondsPartlyInside: number;
  secondsOfInteraction: number;
  nEntries: number;
}
