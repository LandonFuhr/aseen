import ffmpeg

from analysis_lib.video_optimizer.interface import DownsampleTransformationArgs


def downsample_video(args: DownsampleTransformationArgs, input_path: str, output_path: str):
    (
        ffmpeg
        .input(input_path)
        .filter('fps', fps=args.target_framerate)
        .output(output_path)
        .overwrite_output()
        .run()
    )
