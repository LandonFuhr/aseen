from analysis_lib.behaviour.results_adapter import RegionStatsByFrame, RegionStatsByTime
from analysis_lib.behaviour.temporal_converter import region_stats_frames_to_seconds


def test_it_converts_frames_to_times():
    stats_by_frame = RegionStatsByFrame(
        region_id='Chamber 1', n_entries=4, frames_fully_inside=10, frames_partly_inside=15, frames_of_interaction=4)
    framerate = 5.0

    stats_by_time = region_stats_frames_to_seconds(stats_by_frame, framerate)

    assert stats_by_time == RegionStatsByTime(
        region_id='Chamber 1', n_entries=4, secs_fully_inside=2.0, secs_partly_inside=3.0, secs_of_interaction=0.8)
