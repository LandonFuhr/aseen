import { useEffect, useState } from "react";
import { getAllSavedResults } from "../../../core/electron/ipc";
import { openFolder } from "../../../core/electron/shell";
import { SavedResult } from "../../../shared/ipc/SavedResults";

export function useSavedResults(): SavedResultsState {
  const [state, setState] = useState<SavedResultsState>({ isLoading: true });

  useEffect(() => {
    let cancelled = false;
    getAllSavedResults()
      .then((savedResults) => {
        if (cancelled) return;
        savedResults = [...savedResults].sort((a, b) => {
          return b.createdAtDate.getTime() - a.createdAtDate.getTime();
        });
        setState({ isLoading: false, savedResults, hasError: false });
      })
      .catch((e) => {
        console.error(e);
        if (cancelled) return;
        setState({ isLoading: false, hasError: true });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

export function useHandleOpenResults() {
  return async ({ savedResult }: { savedResult: SavedResult }) => {
    await openFolder(savedResult.resultsFolderPath);
  };
}

export type SavedResultsState =
  | {
      isLoading: true;
    }
  | { isLoading: false; hasError: false; savedResults: SavedResult[] }
  | { isLoading: false; hasError: true };
