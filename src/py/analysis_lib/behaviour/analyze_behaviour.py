from typing import List, Union
from shapely import geometry

from analysis_lib.dlc_results_adapter import DlcResults, Individual
from analysis_lib.behaviour.arena_setup_adapter import ArenaSetup, CircleGeometry, RectangleGeometry, Region
from analysis_lib.behaviour.results_adapter import AnimalResults, RegionStatsByFrame
from analysis_lib.behaviour.polygons import polygon_from_shape
from analysis_lib.behaviour.temporal_converter import convert_results_to_seconds_inplace


def analyze_behaviour(arena_setup: ArenaSetup, dlc_results: DlcResults, framerate: float) -> List[AnimalResults]:
    results = simple_behavioural_assay_algorithm(
        arena_setup, dlc_results)
    convert_results_to_seconds_inplace(results, framerate)
    return results


def simple_behavioural_assay_algorithm(arena_setup: ArenaSetup, dlc_results: DlcResults) -> List[AnimalResults]:
    regions = arena_setup.areas + arena_setup.interaction_zones
    results = initialize_results(arena_setup, dlc_results.individuals)
    individual_was_in_region_last_frame = create_entry_tracker(
        individual_names=[individual for individual in dlc_results.individuals], region_ids=[region._id for region in regions])
    for frame_results in dlc_results:
        for individual in frame_results.individuals:
            for region in regions:
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
    return results


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
    return AnimalResults(animal_id=animal_id, stats_per_region=stats_per_region)


def initialize_region_stats(region_id: str) -> RegionStatsByFrame:
    return RegionStatsByFrame(
        region_id=region_id,
        frames_fully_inside=0,
        frames_partly_inside=0,
        frames_of_interaction=0,
        n_entries=0)
