import { useEffect, useState } from "react";
import { ipcRenderer } from "../../core/electron/ipc";
import {
  ResultsPaths,
  ResultsPathsRequest,
  RESULTS_PATHS_CREATION_CHANNEL,
} from "../../shared/ipc";

export function useCreateResultsPaths({
  arenaSetupPath,
}: {
  arenaSetupPath: string | null;
}) {
  const [resultsPaths, setResultsPaths] = useState<ResultsPaths | null>(null);
  useEffect(() => {
    if (arenaSetupPath === null) return;
    let cancelled = false;
    const resultsPathsCreationRequest: ResultsPathsRequest = {
      arenaSetupPath,
    };
    ipcRenderer
      .invoke(RESULTS_PATHS_CREATION_CHANNEL, resultsPathsCreationRequest)
      .then((resultsPaths) => {
        if (cancelled) return;
        setResultsPaths(resultsPaths);
      });
    return () => {
      cancelled = true;
    };
  }, [arenaSetupPath]);

  return resultsPaths;
}
