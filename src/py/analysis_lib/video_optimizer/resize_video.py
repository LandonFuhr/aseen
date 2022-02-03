import ffmpeg

from analysis_lib.video_optimizer.interface import ResizeTransformationArgs


def resize_video(args: ResizeTransformationArgs, input_path: str, output_path: str):
    (
        ffmpeg
        .input(input_path)
        .filter('scale', args.output_height,
                args.output_width)
        .output(output_path)
        .overwrite_output()
        .run()
    )
