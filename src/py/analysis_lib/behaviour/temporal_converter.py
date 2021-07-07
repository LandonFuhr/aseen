from typing import List
from analysis_lib.behaviour.results_adapter import AnimalResults, RegionStatsByFrame, RegionStatsByTime


def convert_results_to_seconds_inplace(results: List[AnimalResults], framerate: float):
    for frame_results in results:
        for i, region_stats in enumerate(frame_results.stats_per_region):
            frame_results.stats_per_region[i] = region_stats_frames_to_seconds(
                region_stats, framerate)


def region_stats_frames_to_seconds(region_stats_by_frame: RegionStatsByFrame, framerate: float) -> RegionStatsByTime:
    region_stats_by_time = RegionStatsByTime(
        region_id=region_stats_by_frame.region_id,
        n_entries=region_stats_by_frame.n_entries,
        secs_fully_inside=frames_to_seconds(
            region_stats_by_frame.frames_fully_inside, framerate),
        secs_partly_inside=frames_to_seconds(
            region_stats_by_frame.frames_partly_inside, framerate),
        secs_of_interaction=frames_to_seconds(
            region_stats_by_frame.frames_of_interaction, framerate)
    )
    return region_stats_by_time


def frames_to_seconds(n_frames: int, framerate: float) -> float:
    return n_frames / framerate
