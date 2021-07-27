from typing import List, Union
from shapely import geometry
from scipy.spatial import distance
import numpy as np

from analysis_lib.dlc_results_adapter import DlcResults, Individual
from analysis_lib.behaviour.arena_setup_adapter import ArenaSetup, CircleGeometry, Point, RectangleGeometry, Region
from analysis_lib.behaviour.results_adapter import AnimalResults, AnimalSourceData, AnimalOverallStatsByFrame, RegionStatsByFrame
from analysis_lib.behaviour.polygons import polygon_from_shape
from analysis_lib.behaviour.temporal_converter import convert_results_to_seconds_inplace


def analyze_behaviour(arena_setup: ArenaSetup, dlc_results: DlcResults, framerate: float) -> List[AnimalResults]:
    results = basic_behavioural_assay_algorithm(
        arena_setup, dlc_results)
    convert_results_to_seconds_inplace(results, framerate)
    return results


def basic_behavioural_assay_algorithm(arena_setup: ArenaSetup, dlc_results: DlcResults) -> List[AnimalResults]:
    regions = arena_setup.areas + arena_setup.interaction_zones
    results = initialize_results(arena_setup, dlc_results.individuals)
    individual_was_in_region_last_frame = create_entry_tracker(
        individual_names=[individual for individual in dlc_results.individuals], region_ids=[region._id for region in regions])
    center_positions_prev_non_none_frame = {}
    distances_between_frames = {}
    for frame_index, frame_results in enumerate(dlc_results):
        for individual in frame_results.individuals:
            update_individual_distance_travelled(
                center_positions_prev_non_none_frame, distances_between_frames, frame_index, individual)

            for region in regions:
                update_region_stats(
                    results, individual_was_in_region_last_frame, individual, region)

    for individual_name, individual_distances_between_frames in distances_between_frames.items():
        update_individual_overall_results(
            dlc_results, results, individual_name, individual_distances_between_frames)

    return results


def update_individual_overall_results(dlc_results, results, individual_name, individual_distances_between_frames):
    individual_results = get_individual_results(individual_name, results)
    individual_results.source_data.distance_travelled_between_each_frame_in_pixels = individual_distances_between_frames
    total_distance = sum(filter(None, individual_distances_between_frames))
    individual_results.stats_overall.total_distance_travelled_in_pixels = total_distance
    individual_results.stats_overall.average_speed_in_pixels_per_frame = total_distance / \
        len(dlc_results)


def update_region_stats(results, individual_was_in_region_last_frame, individual, region):
    if individual_is_fully_inside_shape(individual, region.geometry):
        get_region_stats(individual.name, region._id,
                         results).frames_fully_inside += 1
        if not individual_was_in_region_last_frame[individual.name][region._id]:
            get_region_stats(individual.name, region._id,
                             results).n_entries += 1
        individual_was_in_region_last_frame[individual.name][region._id] = True
    else:
        individual_was_in_region_last_frame[individual.name][region._id] = False

    if individual_is_partly_inside_shape(individual, region.geometry):
        get_region_stats(individual.name, region._id,
                         results).frames_partly_inside += 1


def update_individual_distance_travelled(center_positions_prev_non_none_frame, distances_between_frames, frame_index, individual):
    curr_center = get_center(individual)
    prev_center = center_positions_prev_non_none_frame.get(
        individual.name, None)
    distance_moved = get_distance_moved_between_frames(
        prev_center, curr_center)
    if frame_index == 0:
        distances_between_frames[individual.name] = []
    else:
        distances_between_frames[individual.name].append(
            distance_moved)
    if curr_center is not None:
        center_positions_prev_non_none_frame[individual.name] = curr_center


def get_distance_moved_between_frames(prev_center: Union[Point, None], curr_center: Union[Point, None]) -> Union[float, None]:
    if curr_center is None:
        return None
    if prev_center is None:
        return 0
    return distance_between_points(
        prev_center, curr_center)


def distance_between_points(a: Point, b: Point) -> Union[float, None]:
    try:
        return distance.euclidean([a.x, a.y], [b.x, b.y])
    except ValueError:
        return None


def get_center(individual: Individual) -> Union[Point, None]:
    points = [(bp.coords.x, bp.coords.y) for bp in individual.bodyparts]
    center_coords = np.mean(points, axis=0)
    center = Point(x=center_coords[0], y=center_coords[1])
    if not np.isfinite(center.x) or not np.isfinite(center.y):
        return None
    return center


def create_entry_tracker(individual_names: List[str], region_ids: List[str]) -> dict:
    entry_tracker = {}
    for individual_name in individual_names:
        entry_tracker[individual_name] = {}
        for region_id in region_ids:
            entry_tracker[individual_name][region_id] = False
    return entry_tracker


def individual_is_partly_inside_shape(individual: Individual, shape: Union[CircleGeometry, RectangleGeometry]) -> bool:
    polygon = polygon_from_shape(shape)
    for bp in individual.bodyparts:
        point = geometry.Point(bp.coords.x, bp.coords.y)
        if polygon.contains(point):
            return True
    return False


def individual_is_fully_inside_shape(individual: Individual, shape: Union[CircleGeometry, RectangleGeometry]) -> bool:
    polygon = polygon_from_shape(shape)
    for bp in individual.bodyparts:
        point = geometry.Point(bp.coords.x, bp.coords.y)
        if not polygon.contains(point):
            return False
    return True


def get_individual_results(individual_name: str, results: List[AnimalResults]) -> AnimalResults:
    for animal_results in results:
        if animal_results.animal_id == individual_name:
            return animal_results


def get_region_stats(individual_name: str, region_id: str, results: List[AnimalResults]) -> RegionStatsByFrame:
    for animal_results in results:
        if animal_results.animal_id == individual_name:
            for region_stats in animal_results.stats_per_region:
                if region_stats.region_id == region_id:
                    return region_stats


def initialize_results(arena_setup: ArenaSetup, individuals: List[str]) -> List[AnimalResults]:
    regions = arena_setup.areas + arena_setup.interaction_zones
    results = [initialize_animal_results(
        animal_id, regions) for animal_id in individuals]
    return results


def initialize_animal_results(animal_id: str, regions: List[Region]) -> AnimalResults:
    stats_per_region = [initialize_region_stats(
        region._id) for region in regions]
    return AnimalResults(
        animal_id=animal_id,
        stats_per_region=stats_per_region,
        stats_overall=initialize_overall_stats(),
        source_data=initialize_source_data())


def initialize_region_stats(region_id: str) -> RegionStatsByFrame:
    return RegionStatsByFrame(
        region_id=region_id,
        frames_fully_inside=0,
        frames_partly_inside=0,
        frames_of_interaction=0,
        n_entries=0)


def initialize_overall_stats() -> AnimalOverallStatsByFrame:
    return AnimalOverallStatsByFrame(
        total_distance_travelled_in_pixels=0,
        average_speed_in_pixels_per_frame=0,
        fraction_of_frames_with_animal_detected=0)


def initialize_source_data() -> AnimalSourceData:
    return AnimalSourceData(distance_travelled_between_each_frame_in_pixels=[])
