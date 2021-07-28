from __future__ import annotations
from dataclasses import dataclass
from typing import List, Union


@dataclass
class BehaviourResults:
    metadata: ResultsMetadata
    data: List[AnimalResults]

    def to_dict(self):
        return {
            "metadata": self.metadata.to_dict(),
            "data": [animal_results.to_dict() for animal_results in self.data]
        }


@dataclass
class ResultsMetadata:
    input_paths: InputPaths
    analysis_alg_id: str

    def to_dict(self):
        return {
            "inputPaths": self.input_paths.to_dict(),
            "behaviourAnalysisAlgorithmId": self.analysis_alg_id
        }


@dataclass
class InputPaths:
    arena_setup_path: str
    tracking_results_path: str

    def to_dict(self):
        return {
            "arenaSetup": self.arena_setup_path,
            "trackingResults": self.tracking_results_path
        }


@dataclass
class AnimalResults:
    animal_id: str
    stats_per_region: List[Union[RegionStatsByTime, RegionStatsByFrame]]
    stats_overall: Union[AnimalOverallStatsByFrame, AnimalOverallStatsByTime]
    source_data: AnimalSourceData

    def to_dict(self):
        return {
            "animalId": self.animal_id,
            "statsPerRegion": [region_stats.to_dict() for region_stats in self.stats_per_region],
            "statsOverall": self.stats_overall.to_dict(),
            "sourceData": self.source_data.to_dict()
        }


@dataclass
class AnimalSourceData:
    distance_travelled_between_each_frame_in_pixels: List[float]

    def to_dict(self):
        return {
            "distanceTravelledBetweenEachFrameInPixels": self.distance_travelled_between_each_frame_in_pixels
        }


@dataclass
class AnimalOverallStatsByFrame:
    total_distance_travelled_in_pixels: float
    average_speed_in_pixels_per_frame: float
    fraction_of_frames_with_animal_fully_detected: float
    fraction_of_frames_with_animal_partly_detected: float


@dataclass
class AnimalOverallStatsByTime:
    total_distance_travelled_in_pixels: float
    average_speed_in_pixels_per_second: float
    fraction_of_frames_with_animal_fully_detected: float
    fraction_of_frames_with_animal_partly_detected: float

    def to_dict(self):
        return {
            "totalDistanceTravelledInPixels": self.total_distance_travelled_in_pixels,
            "averageSpeedInPixelsPerSecond": self.average_speed_in_pixels_per_second,
            "fractionOfFramesWithAnimalFullyDetected": self.fraction_of_frames_with_animal_fully_detected,
            "fractionOfFramesWithAnimalPartlyDetected": self.fraction_of_frames_with_animal_partly_detected
        }


@dataclass
class RegionStatsByFrame:
    region_id: str
    frames_fully_inside: float
    frames_partly_inside: float
    frames_of_interaction: float
    n_entries: int


@dataclass
class RegionStatsByTime:
    region_id: str
    secs_fully_inside: float
    secs_partly_inside: float
    secs_of_interaction: float
    n_entries: int

    def to_dict(self):
        return {
            "regionId": self.region_id,
            "secondsFullyInside": self.secs_fully_inside,
            "secondsPartlyInside": self.secs_partly_inside,
            "secondsOfInteraction": self.secs_of_interaction,
            "nEntries": self.n_entries
        }
