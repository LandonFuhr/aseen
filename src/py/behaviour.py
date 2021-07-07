import json
import pandas as pd

from analysis_lib.behaviour.analyze_behaviour import analyze_behaviour
from analysis_lib.behaviour.arena_setup_adapter import ArenaSetup, get_arena_setup_from_dict
from analysis_lib.behaviour.results_adapter import InputPaths, BehaviourResults, ResultsMetadata
from analysis_lib.dlc_results_adapter import DlcResults


ANALYSIS_ALGORITHM_ID = 'Default-v1.0'


def main():
    args = json.loads(input())
    tracking_results_path = args["trackingResultsH5Path"]
    arena_setup_path = args["arenaSetupPath"]
    framerate = args["framerate"]
    dlc_dataframe = pd.read_hdf(tracking_results_path)
    dlc_results = DlcResults.from_pandas(dlc_dataframe)
    arena_setup = get_arena_setup_from_file(arena_setup_path)

    data = analyze_behaviour(arena_setup, dlc_results, framerate)
    input_paths = InputPaths(
        arena_setup_path=arena_setup_path,
        tracking_results_path=tracking_results_path)
    metadata = ResultsMetadata(
        input_paths=input_paths,
        analysis_alg_id=ANALYSIS_ALGORITHM_ID)
    results = BehaviourResults(metadata=metadata, data=data)

    write_results_to_file(results, args["outputJsonPath"])


def get_arena_setup_from_file(fname) -> ArenaSetup:
    with open(fname, 'r') as arena_setup_file:
        arena_setup_dict = json.load(arena_setup_file)
    return get_arena_setup_from_dict(arena_setup_dict)


def write_results_to_file(results: BehaviourResults, path: str):
    results_dict = results.to_dict()
    with open(path, 'w') as f:
        json.dump(results_dict, f, indent=2)


if __name__ == "__main__":
    main()
