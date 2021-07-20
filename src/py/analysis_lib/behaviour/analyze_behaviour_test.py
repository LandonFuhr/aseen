import numpy as np
import pytest

from analysis_lib.dlc_results_adapter import DlcResults, get_labels
from analysis_lib.behaviour.analyze_behaviour import get_region_stats, simple_behavioural_assay_algorithm
from analysis_lib.behaviour.arena_setup_adapter import ArenaSetup, Point, RectangleGeometry, Region


def test_it_counts_entries():
    point_inside = [2, 2, 1.0]
    point_outside = [0, 0, 1.0]
    dlc_results = DlcResults(
        get_labels(['Mouse 1'], ['ear_left']),
        np.array([
            point_outside,
            point_inside,  # entry 1
            point_outside,
            point_inside,  # entry 2
            point_outside,
            point_outside,
            point_inside,  # entry 3
            point_inside,
            point_inside,
            point_outside
        ], dtype=float))
    arena_setup = ArenaSetup(
        areas=[Region(_id=None,
                      geometry=RectangleGeometry(
                          top_left=Point(x=1, y=1),
                          width=3, height=3, rotation=0), color_palette=None)],
        interaction_zones=[])

    behaviour_results = simple_behavioural_assay_algorithm(
        arena_setup=arena_setup, dlc_results=dlc_results)

    assert behaviour_results[0].stats_per_region[0].n_entries == 3


def test_it_counts_frames_fully_inside_areas():
    point_in_both = [2.0, 2.0, 1.0]
    point_only_in_1 = [3.5, 3.5, 1.0]
    point_only_in_2 = [0.5, 0.5, 1.0]
    dlc_results = DlcResults(
        get_labels(['Mouse 1'], ['ear_left', 'ear_right']),
        np.array([
            point_in_both + point_in_both,  # fully inside both
            point_in_both + point_only_in_1,  # fully inside 1
            point_only_in_2 + point_only_in_1,  # fully inside neither
            point_in_both + point_in_both,  # fully inside both
            point_only_in_1 + point_only_in_1,  # fully inside 1
        ], dtype=float))
    arena_setup = ArenaSetup(
        areas=[Region(_id="1",
                      geometry=RectangleGeometry(
                          top_left=Point(x=1, y=1),
                          width=3, height=3, rotation=0), color_palette=None),
               Region(_id="2",
                      geometry=RectangleGeometry(
                          top_left=Point(x=0, y=0),
                          width=3, height=3, rotation=0), color_palette=None)],
        interaction_zones=[])

    results = simple_behavioural_assay_algorithm(
        arena_setup=arena_setup, dlc_results=dlc_results)

    assert get_region_stats(
        'Mouse 1', '1', results).frames_fully_inside == 4
    assert get_region_stats(
        'Mouse 1', '2', results).frames_fully_inside == 2


def test_it_counts_frames_partly_inside_areas():
    point_in_both = [2.0, 2.0, 1.0]
    point_only_in_1 = [3.5, 3.5, 1.0]
    point_only_in_2 = [0.5, 0.5, 1.0]
    point_in_neither = [10.0, 10.0, 1.0]
    dlc_results = DlcResults(
        get_labels(['Mouse 1'], ['ear_left', 'ear_right']),
        np.array([
            point_in_both + point_in_neither,  # partly inside both
            point_in_neither + point_only_in_1,  # partly inside 1
            point_only_in_1 + point_only_in_1,  # partly inside 1
            point_only_in_2 + point_in_neither,  # partly inside 2
            point_in_both + point_in_both,  # partly inside both
            point_only_in_1 + point_only_in_2,  # partly inside both
            point_in_neither + point_in_neither  # partly inside neither
        ], dtype=float))
    arena_setup = ArenaSetup(
        areas=[Region(_id="1",
                      geometry=RectangleGeometry(
                          top_left=Point(x=1, y=1),
                          width=3, height=3, rotation=0), color_palette=None),
               Region(_id="2",
                      geometry=RectangleGeometry(
                          top_left=Point(x=0, y=0),
                          width=3, height=3, rotation=0), color_palette=None)],
        interaction_zones=[])

    results = simple_behavioural_assay_algorithm(
        arena_setup=arena_setup, dlc_results=dlc_results)

    assert get_region_stats(
        'Mouse 1', '1', results).frames_partly_inside == 5
    assert get_region_stats(
        'Mouse 1', '2', results).frames_partly_inside == 4


@pytest.mark.todo
def test_it_counts_interaction_frames():
    pass


def test_it_tracks_total_distance_using_center():
    dlc_results = DlcResults(
        get_labels(['Mouse 1'], ['ear_left', 'ear_right']),
        np.array([
            [0, 0, 1.0] + [0, 0, 1.0],
            [0, 0, 1.0] + [2, 2, 1.0],  # sqrt(2) NE
            [2, 2, 1.0] + [2, 2, 1.0],  # sqrt(2) NE
            [12, 2, 1.0] + [8, 2, 1.0],  # 8 N
            [-5, -18, 1.0] + [-5, -18, 1.0],  # 25 SW
        ], dtype=float))
    arena_setup = ArenaSetup(
        areas=[Region(_id=None,
                      geometry=RectangleGeometry(
                          top_left=Point(x=1, y=1),
                          width=3, height=3, rotation=0), color_palette=None)],
        interaction_zones=[])

    behaviour_results = simple_behavioural_assay_algorithm(
        arena_setup=arena_setup, dlc_results=dlc_results)

    assert behaviour_results[0].stats_overall.total_distance_travelled_in_pixels == 35.82842712474619


def test_it_tracks_distance_by_frame():
    dlc_results = DlcResults(
        get_labels(['Mouse 1'], ['ear_left', 'ear_right']),
        np.array([
            [0, 0, 1.0] + [0, 0, 1.0],
            [0, 0, 1.0] + [2, 2, 1.0],  # sqrt(2) NE
            [2, 2, 1.0] + [2, 2, 1.0],  # sqrt(2) NE
            [12, 2, 1.0] + [8, 2, 1.0],  # 8 N
            [-5, -18, 1.0] + [-5, -18, 1.0],  # 25 SW
        ], dtype=float))
    arena_setup = ArenaSetup(
        areas=[Region(_id=None,
                      geometry=RectangleGeometry(
                          top_left=Point(x=1, y=1),
                          width=3, height=3, rotation=0), color_palette=None)],
        interaction_zones=[])

    behaviour_results = simple_behavioural_assay_algorithm(
        arena_setup=arena_setup, dlc_results=dlc_results)

    assert behaviour_results[0].source_data.distance_travelled_between_each_frame_in_pixels == [
        1.4142135623730951, 1.4142135623730951, 8.0, 25.0]


def test_it_tracks_average_speed():
    dlc_results = DlcResults(
        get_labels(['Mouse 1'], ['ear_left', 'ear_right']),
        np.array([
            [0, 0, 1.0] + [0, 0, 1.0],
            [0, 0, 1.0] + [2, 2, 1.0],  # sqrt(2) NE
            [2, 2, 1.0] + [2, 2, 1.0],  # sqrt(2) NE
            [12, 2, 1.0] + [8, 2, 1.0],  # 8 N
            [-5, -18, 1.0] + [-5, -18, 1.0],  # 25 SW
        ], dtype=float))
    arena_setup = ArenaSetup(
        areas=[Region(_id=None,
                      geometry=RectangleGeometry(
                          top_left=Point(x=1, y=1),
                          width=3, height=3, rotation=0), color_palette=None)],
        interaction_zones=[])

    behaviour_results = simple_behavioural_assay_algorithm(
        arena_setup=arena_setup, dlc_results=dlc_results)

    assert behaviour_results[0].stats_overall.average_speed_in_pixels_per_frame == 35.82842712474619 / 5
