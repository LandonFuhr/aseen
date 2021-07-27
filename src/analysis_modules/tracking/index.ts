import { ipcTrackingAnalyzer, setupAnalysisRunner } from "../ipc";
import { runTracking } from "./tracking";

setupAnalysisRunner({
  ipcAnalyzer: ipcTrackingAnalyzer,
  analysisRunner: runTracking,
});
