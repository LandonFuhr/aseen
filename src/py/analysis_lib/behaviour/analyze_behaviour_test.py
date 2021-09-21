import numpy as np
import pytest

from analysis_lib.dlc_results_adapter import DlcResults, get_labels
from analysis_lib.behaviour.analyze_behaviour import get_region_stats, basic_behavioural_assay_algorithm
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

    behaviour_results = basic_behavioural_assay_algorithm(
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

    results = basic_behavioural_assay_algorithm(
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

    results = basic_behavioural_assay_algorithm(
        arena_setup=arena_setup, dlc_results=dlc_results)

    assert get_region_stats(
        'Mouse 1', '1', results).frames_partly_inside == 5
    assert get_region_stats(
        'Mouse 1', '2', results).frames_partly_inside == 4


def test_it_counts_interaction_frames():
    inside_region_1 = [3.0, 3.0, 1.0]
    inside_both_regions = [1.5, 1.5, 1.0]
    outside_regions = [5.0, 5.0, 1.0]
    dlc_results = DlcResults(
        get_labels(['Mouse 1'], ['nose', 'ear_left', 'ear_right']),
        np.array([
            inside_region_1 + outside_regions + outside_regions,  # 1
            outside_regions + outside_regions + outside_regions,
            inside_region_1 + outside_regions + outside_regions,  # 1
            inside_both_regions + outside_regions + outside_regions,  # 1 & 2
            outside_regions + outside_regions + outside_regions,
        ], dtype=float))
    arena_setup = ArenaSetup(
        areas=[Region(_id="1",
                      geometry=RectangleGeometry(
                          top_left=Point(x=1, y=1),
                          width=3, height=3, rotation=0), color_palette=None),
               Region(_id="2",
                      geometry=RectangleGeometry(
                          top_left=Point(x=0, y=0),
                          width=2, height=2, rotation=0), color_palette=None)],
        interaction_zones=[])

    results = basic_behavioural_assay_algorithm(
        arena_setup=arena_setup, dlc_results=dlc_results)

    assert get_region_stats(
        'Mouse 1', '1', results).frames_of_interaction == 3
    assert get_region_stats(
        'Mouse 1', '2', results).frames_of_interaction == 1


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

    behaviour_results = basic_behavioural_assay_algorithm(
        arena_setup=arena_setup, dlc_results=dlc_results)

    assert behaviour_results[0].stats_overall.total_distance_travelled_in_pixels == 35.82842712474619


def test_it_tracks_total_distance_ignoring_nan_frames():
    dlc_results = DlcResults(
        get_labels(['Mouse 1'], ['ear_left', 'ear_right']),
        np.array([
            [np.nan, np.nan, np.nan] + [np.nan, np.nan, np.nan],
            [np.nan, np.nan, np.nan] + [np.nan, np.nan, np.nan],
            [0, 0, 1.0] + [0, 0, 1.0],
            [0, 0, 1.0] + [2, 2, 1.0],  # sqrt(2) NE
            [np.nan, np.nan, np.nan] + [np.nan, np.nan, np.nan],
            [2, 2, 1.0] + [2, 2, 1.0],  # sqrt(2) NE
            [12, 2, 1.0] + [8, 2, 1.0],  # 8 N
            [-5, -18, 1.0] + [-5, -18, 1.0],  # 25 SW
            [np.nan, np.nan, np.nan] + [np.nan, np.nan, np.nan],
            [np.nan, np.nan, np.nan] + [np.nan, np.nan, np.nan],
        ], dtype=float))
    arena_setup = ArenaSetup(
        areas=[Region(_id=None,
                      geometry=RectangleGeometry(
                          top_left=Point(x=1, y=1),
                          width=3, height=3, rotation=0), color_palette=None)],
        interaction_zones=[])

    behaviour_results = basic_behavioural_assay_algorithm(
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

    behaviour_results = basic_behavioural_assay_algorithm(
        arena_setup=arena_setup, dlc_results=dlc_results)

    assert behaviour_results[0].source_data.distance_travelled_between_each_frame_in_pixels == [
        1.4142135623730951, 1.4142135623730951, 8.0, 25.0]


def test_it_tracks_distance_by_frame_with_nan_as_None():
    dlc_results = DlcResults(
        get_labels(['Mouse 1'], ['ear_left', 'ear_right']),
        np.array([
            [np.nan, np.nan, np.nan] + [np.nan, np.nan, np.nan],
            [np.nan, np.nan, np.nan] + [np.nan, np.nan, np.nan],
            [0, 0, 1.0] + [0, 0, 1.0],
            [0, 0, 1.0] + [2, 2, 1.0],  # sqrt(2) NE
            [np.nan, np.nan, np.nan] + [np.nan, np.nan, np.nan],
            [2, 2, 1.0] + [2, 2, 1.0],  # sqrt(2) NE
            [12, 2, 1.0] + [8, 2, 1.0],  # 8 N
            [-5, -18, 1.0] + [-5, -18, 1.0],  # 25 SW
            [np.nan, np.nan, np.nan] + [np.nan, np.nan, np.nan],
            [np.nan, np.nan, np.nan] + [np.nan, np.nan, np.nan],
        ], dtype=float))
    arena_setup = ArenaSetup(
        areas=[Region(_id=None,
                      geometry=RectangleGeometry(
                          top_left=Point(x=1, y=1),
                          width=3, height=3, rotation=0), color_palette=None)],
        interaction_zones=[])

    behaviour_results = basic_behavioural_assay_algorithm(
        arena_setup=arena_setup, dlc_results=dlc_results)

    assert behaviour_results[0].source_data.distance_travelled_between_each_frame_in_pixels == [
        None, 0, 1.4142135623730951, None, 1.4142135623730951, 8.0, 25.0, None, None]


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

    behaviour_results = basic_behavioural_assay_algorithm(
        arena_setup=arena_setup, dlc_results=dlc_results)

    assert behaviour_results[0].stats_overall.average_speed_in_pixels_per_frame == 35.82842712474619 / 5


def test_it_tracks_fraction_of_frames_fully_detected():
    dlc_results = DlcResults(
        get_labels(['Mouse 1'], ['ear_left', 'ear_right']),
        np.array([
            [np.nan, np.nan, np.nan] + [np.nan, np.nan, np.nan],  # not detected
            [0, 0, 1.0] + [np.nan, np.nan, np.nan],  # partly detected
            [2, 2, 1.0] + [2, 2, 1.0],  # fully detected
            [np.nan, np.nan, np.nan] + [-5, -18, 1.0],  # partly detected
            [12, 2, 1.0] + [8, 2, 1.0],  # fully detected
        ], dtype=float))
    arena_setup = ArenaSetup(
        areas=[Region(_id=None,
                      geometry=RectangleGeometry(
                          top_left=Point(x=1, y=1),
                          width=3, height=3, rotation=0), color_palette=None)],
        interaction_zones=[])

    behaviour_results = basic_behavioural_assay_algorithm(
        arena_setup=arena_setup, dlc_results=dlc_results)

    assert behaviour_results[0].stats_overall.fraction_of_frames_with_animal_fully_detected == 0.4


def test_it_tracks_fraction_of_frames_partly_detected():
    dlc_results = DlcResults(
        get_labels(['Mouse 1'], ['ear_left', 'ear_right']),
        np.array([
            [np.nan, np.nan, np.nan] + [np.nan, np.nan, np.nan],  # not detected
            [0, 0, 1.0] + [np.nan, np.nan, np.nan],  # partly detected
            [2, 2, 1.0] + [2, 2, 1.0],  # fully detected
            [np.nan, np.nan, np.nan] + [-5, -18, 1.0],  # partly detected
            [12, 2, 1.0] + [8, 2, 1.0],  # fully detected
        ], dtype=float))
    arena_setup = ArenaSetup(
        areas=[Region(_id=None,
                      geometry=RectangleGeometry(
                          top_left=Point(x=1, y=1),
                          width=3, height=3, rotation=0), color_palette=None)],
        interaction_zones=[])

    behaviour_results = basic_behavioural_assay_algorithm(
        arena_setup=arena_setup, dlc_results=dlc_results)

    assert behaviour_results[0].stats_overall.fraction_of_frames_with_animal_partly_detected == 0.8
