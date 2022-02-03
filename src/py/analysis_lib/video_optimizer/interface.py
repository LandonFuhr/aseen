from __future__ import annotations
from dataclasses import dataclass
from typing import List, Union


@dataclass
class DownsampleTransformationArgs:
    target_framerate: int

    @staticmethod
    def from_dict(a_dict: dict) -> DownsampleTransformationArgs:
        return DownsampleTransformationArgs(
            target_framerate=a_dict['targetFramerate']
        )


@dataclass
class DownsampleTransformation:
    type: str
    args: DownsampleTransformationArgs

    @staticmethod
    def from_dict(a_dict: dict) -> DownsampleTransformation:
        return DownsampleTransformation(
            type=a_dict['type'],
            args=DownsampleTransformationArgs.from_dict(a_dict['args'])
        )


@dataclass
class ResizeTransformationArgs:
    output_height: int
    output_width: int

    @staticmethod
    def from_dict(a_dict: dict) -> ResizeTransformationArgs:
        return ResizeTransformationArgs(
            output_height=a_dict['outputHeight'],
            output_width=a_dict['outputWidth']
        )


@dataclass
class ResizeTranformation:
    type: str
    args: ResizeTransformationArgs

    @staticmethod
    def from_dict(a_dict: dict) -> ResizeTranformation:
        return ResizeTranformation(
            type=a_dict['type'],
            args=ResizeTransformationArgs.from_dict(a_dict['args'])
        )


@dataclass
class VideoOptimizerArgs:
    input_video_path: str
    output_video_path: str
    transformations: List[Union[ResizeTranformation, DownsampleTransformation]]

    @staticmethod
    def from_dict(a_dict: dict) -> VideoOptimizerArgs:
        def get_transformation_from_dict(_dict) -> Union[ResizeTranformation, DownsampleTransformation]:
            if _dict['type'] == 'downsample':
                return DownsampleTransformation.from_dict(_dict)
            elif _dict['type'] == 'resize':
                return ResizeTranformation.from_dict(_dict)
        return VideoOptimizerArgs(
            input_video_path=a_dict['inputVideoPath'],
            output_video_path=a_dict['outputVideoPath'],
            transformations=list(map(get_transformation_from_dict,
                                     a_dict['transformations']))
        )
