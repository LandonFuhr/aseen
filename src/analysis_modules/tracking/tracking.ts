import path from "path";
import { AnalyzingProgressStep } from "../../frontend/src/pages/analyzing/types";
import { parseDlcProgressUpdate } from "./parser";
import { TrackingArgs } from "../../frontend/src/shared/ipc/analysis";
import { ipcTrackingAnalyzer } from "../ipc";
import { createAnalysisRunner, StdioListener } from "../analyzer";

const onStderr: StdioListener<TrackingArgs> = ({ ipcAnalyzer, message }) => {
  const progressUpdate = parseDlcProgressUpdate(message);
  if (progressUpdate) {
    ipcAnalyzer.send({
      type: "PROGRESS",
      data: {
        timeRemaining: progressUpdate.timeRemainingInMs,
        progress: progressUpdate.percentComplete,
        step: AnalyzingProgressStep.dlcInference,
      },
    });
  }
};

export const runTracking = createAnalysisRunner({
  name: "DLC Tracking",
  command: path.join(__dirname, "tracking.exe"),
  ipcAnalyzer: ipcTrackingAnalyzer,
  stdioListenerHooks: {
    onStdout: () => {},
    onStderr,
  },
});
