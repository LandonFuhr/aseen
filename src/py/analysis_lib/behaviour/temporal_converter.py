from typing import List
from analysis_lib.behaviour.results_adapter import AnimalOverallStatsByTime, AnimalResults, RegionStatsByFrame, RegionStatsByTime


def convert_results_to_seconds_inplace(results: List[AnimalResults], framerate: float):
    for frame_results in results:
        for i, region_stats in enumerate(frame_results.stats_per_region):
            frame_results.stats_per_region[i] = region_stats_frames_to_seconds(
                region_stats, framerate)

        stats = frame_results.stats_overall
        frame_results.stats_overall = AnimalOverallStatsByTime(
            total_distance_travelled_in_pixels=stats.total_distance_travelled_in_pixels,
            average_speed_in_pixels_per_second=speed_per_frame_to_per_seconds(
                stats.average_speed_in_pixels_per_frame, framerate),
            fraction_of_frames_with_animal_detected=stats.fraction_of_frames_with_animal_detected)


def speed_per_frame_to_per_seconds(speed: float, framerate: float) -> float:
    return speed * framerate


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
