import pandas as pd
import cv2
import time

from analysis_lib.dlc_results_adapter import DlcResults
from analysis_lib.video_creator.progress_updater import send_progress_update
from analysis_lib.video_creator.colors import mouse_colors


def create_video(raw_video_path: str, tracking_h5_path: str, behaviour_json_path: str, output_video_path: str):
    start = time.time()
    dlc_dataframe = pd.read_hdf(tracking_h5_path)
    dlc_results = DlcResults.from_pandas(dlc_dataframe)

    def modify_frame(frame, i):
        if i % 50 == 0:
            send_progress_update(percentComplete=(
                (i / len(dlc_results)) * 100), timeRemainingInMs=(len(dlc_results) - i) * 100)

        for individual_index, individual in enumerate(dlc_results[i].individuals):
            for bodypart in individual.bodyparts:
                x = bodypart.coords.x
                y = bodypart.coords.y
                if not pd.isnull(x) and not pd.isnull(y):
                    pos = (int(x), int(y))
                    color = mouse_colors[individual_index]
                    radius = get_dot_radius(frame.shape)
                    frame = cv2.circle(frame, pos, radius, color, -1)

        return frame

    modify_video(input_video_path=raw_video_path,
                 output_video_path=output_video_path, modifier_fn=modify_frame)

    print(time.time() - start)


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


def get_dot_radius(frame_size) -> int:
    height, width, _ = frame_size
    size = min(height, width)
    return int(size * 0.025)


if __name__ == "__main__":
    create_video(raw_video_path=r'C:\OfflineFiles\ChanLab Data\Behaviour\vid2.mp4',
                 tracking_h5_path=r'C:\Users\lando\OneDrive\Desktop\Tracking.h5',
                 behaviour_json_path=r'C:\Users\lando\OneDrive\Desktop\Behaviour.json',
                 output_video_path=r'C:\Users\lando\OneDrive\Desktop\Out.mp4')
