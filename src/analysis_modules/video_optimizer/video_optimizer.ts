import path from "path";
import { VideoOptimizerArgs } from "../../frontend/src/shared/ipc/analysis";
import { createAnalysisRunner } from "../analyzer";
import { ipcVideoOptimizerAnalyzer } from "../ipc";

export const runVideoOptimizer = createAnalysisRunner<VideoOptimizerArgs>({
  name: "Video Optimizer",
  command: path.join(__dirname, "video_optimizer.exe"),
  ipcAnalyzer: ipcVideoOptimizerAnalyzer,
  stdioListenerHooks: {
    onStdout: () => {},
    onStderr: () => {},
  },
});
