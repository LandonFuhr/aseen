import pandas as pd
import cv2
import time

from analysis_lib.dlc_results_adapter import DlcResults
from analysis_lib.video_creator.progress_updater import send_progress_update
from analysis_lib.video_creator.colors import mouse_colors, outline_colormap


def create_video(raw_video_path: str, tracking_h5_path: str, behaviour_json_path: str, output_video_path: str):
    dlc_dataframe = pd.read_hdf(tracking_h5_path)
    dlc_results = DlcResults.from_pandas(dlc_dataframe)

    def modify_frame(frame, i):
        if i % 50 == 0:
            send_progress_update(percentComplete=(
                (i / len(dlc_results)) * 100), timeRemainingInMs=(len(dlc_results) - i) * 100)

        for individual_index, individual in enumerate(dlc_results[i].individuals):
            for bodypart_index, bodypart in enumerate(individual.bodyparts):
                x = bodypart.coords.x
                y = bodypart.coords.y
                if not pd.isnull(x) and not pd.isnull(y):
                    pos = (int(x), int(y))
                    color = mouse_colors[individual_index]
                    radius = get_dot_radius(frame.shape)
                    frame = cv2.circle(frame, pos, radius,
                                       color, -1, lineType=cv2.LINE_AA)
                    outline_thickness = get_outline_thickness(frame.shape)
                    outline_color = get_outline_color(
                        bodypart_index/len(individual.bodyparts))
                    frame = cv2.circle(frame, pos, radius, outline_color, outline_thickness,
                                       lineType=cv2.LINE_AA)

        return frame

    modify_video(input_video_path=raw_video_path,
                 output_video_path=output_video_path, modifier_fn=modify_frame)


def modify_video(input_video_path, output_video_path, modifier_fn) -> None:
    vid_in, vid_out = setup_vid_in_and_out(input_video_path, output_video_path)
    vid_in_interable = IterableVideo(vid_in)
    try:
        for i, frame in enumerate(vid_in_interable):
            modified_frame = modifier_fn(frame, i)
            vid_out.write(modified_frame)
    finally:
        vid_in.release()
        vid_out.release()


class IterableVideo:
    def __init__(self, cap) -> None:
        self.cap = cap

    def __iter__(self):
        return self

    def __next__(self):
        if not self.cap.isOpened():
            raise StopIteration
        ret, frame = self.cap.read()
        if ret == False:
            raise StopIteration

        return frame


def setup_vid_in_and_out(input_video_path, output_video_path):
    vid_in = cv2.VideoCapture(input_video_path)
    fps = vid_in.get(cv2.CAP_PROP_FPS)
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    vid_out = cv2.VideoWriter(
        output_video_path, fourcc, fps, (int(vid_in.get(3)), int(vid_in.get(4))))
    return vid_in, vid_out


DOT_PROPORTION = 0.015


def get_dot_radius(frame_size) -> int:
    height, width, _ = frame_size
    size = min(height, width)
    return int(size * DOT_PROPORTION)


def get_outline_thickness(frame_size) -> int:
    height, width, _ = frame_size
    size = min(height, width)
    return int(size * DOT_PROPORTION * 0.3)


def get_outline_color(proportional_position: int):
    color_with_alpha = outline_colormap(proportional_position)
    color = color_with_alpha[:3]
    color = [int(channel * 255) for channel in color]
    return color
