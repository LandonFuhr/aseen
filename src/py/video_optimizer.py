import json

from analysis_lib.video_optimizer.interface import VideoOptimizerArgs
from analysis_lib.video_optimizer.optimize_video import optimize_video


def main():
    args = json.loads(input())
    optimizer_args = VideoOptimizerArgs.from_dict(args)
    optimize_video(optimizer_args)


if __name__ == "__main__":
    main()
