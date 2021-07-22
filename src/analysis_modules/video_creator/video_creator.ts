import { spawn } from "child_process";
import { ipcRenderer } from "electron";
import log from "electron-log";
import path from "path";
import { AnalyzingProgressStep } from "../../frontend/src/pages/analyzing/types";
import { CREATE_VIDEO_CHANNEL } from "../../frontend/src/shared/ipc";
import { VideoCreatorArgs } from "../../frontend/src/shared/ipc/analysis";

export async function runVideoCreator(args: VideoCreatorArgs): Promise<void> {
  return new Promise((resolve, reject) => {
    ipcRenderer.send(CREATE_VIDEO_CHANNEL, {
      type: "progress_update",
      data: {
        progress: 0,
        timeRemaining: null,
        step: AnalyzingProgressStep.annotatedVideoCreation,
      },
    });
    const cmd = getVideoProcessorCommand();
    log.info(
      `Starting video processor child with command "${cmd}" and args`,
      args
    );
    const child = spawn(cmd);
    child.stderr.on("data", (chunk) => {
      log.error("Error in video processor child:", chunk.toString());
    });
    child.stdout.on("data", (chunk) => {
      log.info("Video processor child stdout:", chunk.toString());
      try {
        const data = JSON.parse(chunk.toString());
        if (isProgressUpdate(data)) {
          ipcRenderer.send(CREATE_VIDEO_CHANNEL, {
            type: "progress_update",
            data: {
              ...data,
              step: AnalyzingProgressStep.annotatedVideoCreation,
            },
          });
        }
      } catch {}
    });
    child.on("exit", (code) => {
      log.info("Video processor child exited with code", code);
      if (code !== 0) {
        ipcRenderer.send(CREATE_VIDEO_CHANNEL, {
          type: "error_message",
          data: {
            error: `Video processor exited with non-zero code: ${code}`,
          },
        });
        reject();
        return;
      }
      ipcRenderer.send(CREATE_VIDEO_CHANNEL, {
        type: "progress_update",
        data: {
          progress: 100,
          timeRemaining: null,
          step: AnalyzingProgressStep.annotatedVideoCreation,
        },
      });
      resolve();
    });

    child.stdin.write(JSON.stringify(args) + "\n");
  });
}

function isProgressUpdate(message: any): boolean {
  return "timeRemaining" in message && "progress" in message;
}

function getVideoProcessorCommand(): string {
  return path.join(__dirname, "video_creator.exe");
}
