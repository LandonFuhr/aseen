import shutil
import os
import deeplabcut

TRACKING_METHOD = 'ellipse'


def run_analysis(config_yaml_path: str, video_path: str, outputH5Path: str):
    video_type = get_file_extension(video_path)

    scorername = deeplabcut.analyze_videos(
        config_yaml_path, [video_path], videotype=video_type, batchsize=2)

    deeplabcut.convert_detections2tracklets(config_yaml_path, [
                                            video_path], videotype=video_type, track_method=TRACKING_METHOD)

    pickle_file_path = get_pickle_file_path(
        video_path, scorername, get_abbreviated_tracking_type(TRACKING_METHOD))

    deeplabcut.convert_raw_tracks_to_h5(config_yaml_path, pickle_file_path)

    copy_file(get_h5_file_path(pickle_file_path), outputH5Path)
    remove_default_output_files(video_path)


def remove_default_output_files(video_path: str):
    video_name = os.path.basename(video_path).split(".")[0]
    matcher = f"{video_name}DLC"
    dir_path = os.path.dirname(video_path)
    for file in os.listdir(dir_path):
        filename = os.fsdecode(file)
        if matcher in filename:
            os.remove(os.path.join(dir_path, filename))


def copy_file(src: str, dst: str):
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    shutil.copyfile(src, dst)


def get_pickle_file_path(video_path: str, scorername: str, tracking_type: str) -> str:
    path_wo_ext = ".".join(video_path.split('.')[:-1])
    return f'{path_wo_ext}{scorername}_{tracking_type}.pickle'


def get_h5_file_path(pickle_file_path: str) -> str:
    return pickle_file_path.replace(".pickle", '.h5')


def get_abbreviated_tracking_type(tracking_type: str) -> str:
    if tracking_type == 'ellipse':
        return 'el'
    if tracking_type == 'box':
        return 'bx'


def get_file_extension(path: str) -> str:
    return '.' + path.split('.')[-1]
