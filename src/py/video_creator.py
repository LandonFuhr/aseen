import json
import pandas as pd

from analysis_lib.video_creator.create_video import create_video
from analysis_lib.dlc_results_adapter import DlcResults


def main():
    args = json.loads(input())
    create_video(raw_video_path=args["rawVideoPath"], tracking_h5_path=args["trackingResultsH5Path"],
                 behaviour_json_path=args["behaviourResultsJsonPath"], output_video_path=args["outputVideoPath"])


if __name__ == "__main__":
    main()
