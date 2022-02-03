interface Transformation<T extends string, P extends object> {
  type: T;
  args: P;
}

interface ResizeArgs {
  outputHeight: number;
  outputWidth: number;
}
type ResizeTranformation = Transformation<"resize", ResizeArgs>;

interface DownsampleArgs {
  targetFramerate: number;
}
type DownsampleTranformation = Transformation<"downsample", DownsampleArgs>;

export type VideoTransformation = ResizeTranformation | DownsampleTranformation;
