import { ipcVideoOptimizerAnalyzer, setupAnalysisRunner } from "../ipc";
import { runVideoOptimizer } from "./video_optimizer";

setupAnalysisRunner({
  ipcAnalyzer: ipcVideoOptimizerAnalyzer,
  analysisRunner: runVideoOptimizer,
});
