import { ipcVideoCreatorAnalyzer, setupAnalysisRunner } from "../ipc";
import { runVideoCreator } from "./video_creator";

setupAnalysisRunner({
  ipcAnalyzer: ipcVideoCreatorAnalyzer,
  analysisRunner: runVideoCreator,
});
