import path from "path";
import { createAnalysisRunner } from "../analyzer";
import { ipcBehaviourAnalyzer } from "../ipc";

export const runBehaviourAnalyzer = createAnalysisRunner({
  name: "Behaviour Analyzer",
  command: path.join(__dirname, "behaviour.exe"),
  ipcAnalyzer: ipcBehaviourAnalyzer,
  stdioListenerHooks: {
    onStdout: () => {},
    onStderr: () => {},
  },
});
