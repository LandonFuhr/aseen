import { useEffect, useState } from "react";
import { getAllSavedResults } from "../../../core/electron/ipc";
import { SavedResult } from "../../../shared/ipc/SavedResults";

export function useSavedResults({
  show,
}: {
  show: boolean;
}): SavedResultsState {
  const [state, setState] = useState<SavedResultsState>({ isLoading: true });

  useEffect(() => {
    if (!show) return;
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
  }, [show]);

  return state;
}

export type SavedResultsState =
  | {
      isLoading: true;
    }
  | { isLoading: false; hasError: false; savedResults: SavedResult[] }
  | { isLoading: false; hasError: true };
