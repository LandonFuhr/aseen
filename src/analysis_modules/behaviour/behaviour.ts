import { spawn } from "child_process";
import path from "path";
import log from "electron-log";
import { AnalyzingProgressStep } from "../../frontend/src/pages/analyzing/types";
import { ipcRenderer } from "electron";
import { BEHAVIOUR_CHANNEL } from "../../frontend/src/shared/ipc";
import { BehaviourArgs } from "../../frontend/src/shared/ipc/analysis";

export async function runBehaviourAnalyzer(args: BehaviourArgs): Promise<void> {
  return new Promise((resolve) => {
    ipcRenderer.send(BEHAVIOUR_CHANNEL, {
      type: "progress_update",
      data: {
        timeRemaining: null,
        progress: 0,
        step: AnalyzingProgressStep.behaviourAnalysis,
      },
    });
    const cmd = getAnalyzerCommand();
    log.info(`Starting behaviour analyzer child "${cmd}" with args`, args);
    const child = spawn(cmd);
    child.stderr.on("data", (chunk) => {
      log.error("Error from behaviour analyzer child:", chunk.toString());
    });
    child.stdout.on("data", (chunk) => {
      log.info("Stdout from behaviour analyzer child:", chunk.toString());
    });
    child.on("exit", (code) => {
      log.info(`Behaviour analyzer child exited with code ${code}`);
      if (code !== 0) {
        throw new Error(
          `Behaviour analyzer child exited with non-zero code: ${code}`
        );
      }
      ipcRenderer.send(BEHAVIOUR_CHANNEL, {
        type: "progress_update",
        data: {
          timeRemaining: null,
          progress: 100,
          step: AnalyzingProgressStep.behaviourAnalysis,
        },
      });
      resolve();
    });

    child.stdin.write(JSON.stringify(args) + "\n");
  });
}

function getAnalyzerCommand() {
  return path.join(__dirname, "behaviour.exe");
}
