import { ipcBehaviourAnalyzer, setupAnalysisRunner } from "../ipc";
import { runBehaviourAnalyzer } from "./behaviour";

setupAnalysisRunner({
  ipcAnalyzer: ipcBehaviourAnalyzer,
  analysisRunner: runBehaviourAnalyzer,
});
