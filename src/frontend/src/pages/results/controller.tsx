import { BehaviourResults } from "../../shared/ipc";
import { useRouter } from "../../components/PersistentProviders/Router";
import { Page } from "../../core/types";
import { useEffect, useState } from "react";
import { useResultsPaths } from "../../components/PersistentProviders/ResultsPaths";
import { readBehaviourResultsFile } from "../../core/electron/ipc";
import { openFolder } from "../../core/electron/shell";
import { ResultsPageProps } from ".";

export function useResultsController(): ResultsPageProps {
  const resultsPaths = useResultsPaths();
  const router = useRouter();
  const [behaviourResults, setBehaviourResults] = useState<BehaviourResults>();

  useEffect(() => {
    if (resultsPaths === null) return;
    let cancelled = false;
    readBehaviourResultsFile({
      path: resultsPaths.behaviourAssayResultsJsonPath,
    }).then((behaviourResults) => {
      if (cancelled) return;
      setBehaviourResults(behaviourResults);
    });
    return () => {
      cancelled = true;
    };
  }, [resultsPaths]);

  function handleOpenResultsFolder() {
    if (resultsPaths === null) return;
    openFolder(resultsPaths.resultsFolder)
      .then((errorMessage) => {
        if (errorMessage !== "") {
          throw new Error(errorMessage);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }

  function onHomeClick() {
    router.setPage(Page.home);
  }

  return {
    handleOpenResultsFolder,
    onHomeClick,
    behaviourResults,
  };
}
