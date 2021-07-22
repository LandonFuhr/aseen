import { spawn } from "child_process";
import path from "path";
import log from "electron-log";
import { AnalyzingProgressStep } from "../../frontend/src/pages/analyzing/types";
import { parseDlcProgressUpdate } from "./parser";
import { ipcRenderer } from "electron";
import { TRACKING_CHANNEL } from "../../frontend/src/shared/ipc";
import { TrackingArgs } from "../../frontend/src/shared/ipc/analysis";

export async function runTracker(args: TrackingArgs): Promise<void> {
  return new Promise((resolve, reject) => {
    ipcRenderer.send(TRACKING_CHANNEL, {
      type: "progress_update",
      data: {
        timeRemaining: null,
        progress: 0,
        step: AnalyzingProgressStep.dlcInference,
      },
    });
    const cmd = getTrackerCommand();
    log.info(`Starting Tracker child "${cmd}" with args`, args);
    const child = spawn(cmd);

    child.stderr.on("data", (chunk) => {
      const msg = chunk.toString();
      log.error(msg);
      const progressUpdate = parseDlcProgressUpdate(msg);
      if (progressUpdate) {
        ipcRenderer.send(TRACKING_CHANNEL, {
          type: "progress_update",
          data: {
            timeRemaining: progressUpdate.timeRemainingInMs,
            progress: progressUpdate.percentComplete,
            step: AnalyzingProgressStep.dlcInference,
          },
        });
      }
    });
    child.stdout.on("data", (chunk) => {
      log.info(chunk.toString());
    });
    child.on("exit", (code) => {
      log.info("Tracker exited with code", code);
      if (code !== 0) {
        ipcRenderer.send(TRACKING_CHANNEL, {
          type: "error_message",
          data: {
            error: `Tracking child exited with non-zero code: ${code}`,
          },
        });
        reject();
        return;
      }
      ipcRenderer.send(TRACKING_CHANNEL, {
        type: "progress_update",
        data: {
          progress: 100,
          timeRemaining: null,
          step: AnalyzingProgressStep.dlcInference,
        },
      });
      resolve();
    });

    child.stdin.write(JSON.stringify(args) + "\n");
  });
}

function getTrackerCommand() {
  return path.join(__dirname, "tracking.exe");
}
