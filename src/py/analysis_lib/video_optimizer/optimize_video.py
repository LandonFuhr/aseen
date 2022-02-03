import os
import random
import string
import pathlib
from typing import Union

from analysis_lib.video_optimizer.interface import VideoOptimizerArgs, ResizeTranformation, DownsampleTransformation
from analysis_lib.video_optimizer.resize_video import resize_video
from analysis_lib.video_optimizer.downsample_video import downsample_video


def run_transformation(transformation: Union[ResizeTranformation, DownsampleTransformation], input_path: str, output_path: str):
    if transformation.type == 'resize':
        resize_video(args=transformation.args,
                     input_path=input_path, output_path=output_path)
    elif transformation.type == 'downsample':
        downsample_video(args=transformation.args,
                         input_path=input_path, output_path=output_path)


def random_file_path(base_path: str) -> str:
    temp_path = pathlib.Path(base_path)
    temp_name = ''.join(random.choice(string.ascii_letters)
                        for _ in range(20))
    return str(temp_path.with_name(f'{temp_name}{temp_path.suffix}'))


def optimize_video(args: VideoOptimizerArgs):
    temp_paths = []
    curr_input = args.input_video_path
    for i, transformation in enumerate(args.transformations):
        if i == len(args.transformations) - 1:
            out_path = args.output_video_path
        else:
            out_path = random_file_path(args.output_video_path)
            temp_paths.append(out_path)

        run_transformation(transformation=transformation,
                           input_path=curr_input, output_path=out_path)

        curr_input = out_path

    for temp_path in temp_paths:
        os.remove(temp_path)
