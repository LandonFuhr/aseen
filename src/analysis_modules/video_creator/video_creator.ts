import path from "path";
import { AnalyzingProgressStep } from "../../frontend/src/pages/analyzing/types";
import { VideoCreatorArgs } from "../../frontend/src/shared/ipc/analysis";
import { createAnalysisRunner, StdioListener } from "../analyzer";
import { ipcVideoCreatorAnalyzer } from "../ipc";

const onStdout: StdioListener<VideoCreatorArgs> = ({
  ipcAnalyzer,
  message,
}) => {
  const progressData = JSON.parse(message);
  if (isProgressUpdate(progressData)) {
    ipcAnalyzer.send({
      type: "PROGRESS",
      data: {
        ...progressData,
        step: AnalyzingProgressStep.annotatedVideoCreation,
      },
    });
  }
};

export const runVideoCreator = createAnalysisRunner<VideoCreatorArgs>({
  name: "Video Creator",
  command: path.join(__dirname, "video_creator.exe"),
  ipcAnalyzer: ipcVideoCreatorAnalyzer,
  stdioListenerHooks: {
    onStdout,
    onStderr: () => {},
  },
});

function isProgressUpdate(message: any): boolean {
  return "timeRemaining" in message && "progress" in message;
}
