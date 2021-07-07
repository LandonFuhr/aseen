from analysis_lib.behaviour.results_adapter import InputPaths, RegionStatsByTime, ResultsMetadata, BehaviourResults, AnimalResults


def test_it_converts_results_to_dict():
    results = BehaviourResults(
        metadata=ResultsMetadata(
            input_paths=InputPaths(
                arena_setup_path='C:/example/path/to/Arena.json',
                tracking_results_path='C:/example/path/to/Tracking.h5'),
            analysis_alg_id="ANALYSIS-ALG-ID"),
        data=[
            AnimalResults(
                animal_id="Mouse 1",
                stats_per_region=[
                    RegionStatsByTime(region_id="Chamber 1", secs_fully_inside=15.3,
                                      secs_partly_inside=195.2, secs_of_interaction=22.4, n_entries=14),
                    RegionStatsByTime(region_id="Cup 1", secs_fully_inside=15.3,
                                      secs_partly_inside=195.2, secs_of_interaction=22.4, n_entries=30)]),
            AnimalResults(
                animal_id="Mouse 2",
                stats_per_region=[
                    RegionStatsByTime(region_id="Chamber 1", secs_fully_inside=15.3,
                                      secs_partly_inside=195.2, secs_of_interaction=22.4, n_entries=14),
                    RegionStatsByTime(region_id="Cup 1", secs_fully_inside=15.3,
                                      secs_partly_inside=195.2, secs_of_interaction=22.4, n_entries=30)])
        ])
    results_dict = results.to_dict()
    assert results_dict == expected_dict


expected_dict = {
    "metadata": {
        "inputPaths": {
            "arenaSetup": "C:/example/path/to/Arena.json",
            "trackingResults": "C:/example/path/to/Tracking.h5"
        },
        "behaviourAnalysisAlgorithmId": "ANALYSIS-ALG-ID"
    },
    "data": [
        {
            "animalId": "Mouse 1",
            "statsPerRegion": [
                {
                    "regionId": "Chamber 1",
                    "secondsFullyInside": 15.3,
                    "secondsPartlyInside": 195.2,
                    "secondsOfInteraction": 22.4,
                    "nEntries": 14
                },
                {
                    "regionId": "Cup 1",
                    "secondsFullyInside": 15.3,
                    "secondsPartlyInside": 195.2,
                    "secondsOfInteraction": 22.4,
                    "nEntries": 30
                }
            ]
        },
        {
            "animalId": "Mouse 2",
            "statsPerRegion": [
                {
                    "regionId": "Chamber 1",
                    "secondsFullyInside": 15.3,
                    "secondsPartlyInside": 195.2,
                    "secondsOfInteraction": 22.4,
                    "nEntries": 14
                },
                {
                    "regionId": "Cup 1",
                    "secondsFullyInside": 15.3,
                    "secondsPartlyInside": 195.2,
                    "secondsOfInteraction": 22.4,
                    "nEntries": 30
                }
            ]
        }
    ]
}
