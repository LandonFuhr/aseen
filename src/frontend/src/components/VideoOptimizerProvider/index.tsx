import path from "path";
import {
  createContext,
  useContext,
  FC,
  useState,
  useMemo,
  useCallback,
} from "react";
import { createStep } from "../../core/Analyzer";
import { ipcVideoOptimizerController } from "../../core/Analyzer/ipc";

export function useVideoOptimizer() {
  return useContext(VideoOptimizerContext);
}

interface VideoOptimizer {
  runOptimization(args: {
    vidPath: string;
    onSuccess?: (newPath: string) => void;
  }): void;
  isRunning: boolean;
}

export const VideoOptimizerContext = createContext<VideoOptimizer | null>(null);

export const VideoOptimizerProvider: FC = ({ children }) => {
  const [isRunning, setIsRunning] = useState(false);

  const runOptimization = useCallback(
    ({
      vidPath,
      onSuccess,
    }: {
      vidPath: string;
      onSuccess?: (newPath: string) => void;
    }) => {
      const newPath = path.join(
        path.dirname(vidPath),
        `${path.basename(
          vidPath,
          path.extname(vidPath)
        )}_OPTIMIZED${path.extname(vidPath)}`
      );
      const runner = createStep({
        ipcController: ipcVideoOptimizerController,
        args: {
          inputVideoPath: vidPath,
          outputVideoPath: newPath,
          transformations: [
            {
              type: "resize",
              args: {
                outputHeight: -1,
                outputWidth: 360,
              },
            },
            {
              type: "downsample",
              args: {
                targetFramerate: 15,
              },
            },
          ],
        },
      });

      setIsRunning(true);
      runner({
        onProgressUpdate: () => {},
      })
        .then(() => onSuccess && onSuccess(newPath))
        .catch(() => {
          console.log("ERROR");
        })
        .finally(() => {
          setIsRunning(false);
        });
    },
    []
  );

  const optimizer: VideoOptimizer = useMemo(
    () => ({
      isRunning,
      runOptimization,
    }),
    [isRunning, runOptimization]
  );

  return (
    <VideoOptimizerContext.Provider value={optimizer}>
      {children}
    </VideoOptimizerContext.Provider>
  );
};
