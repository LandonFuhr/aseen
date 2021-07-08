import { createContext, FC, useContext, useState } from "react";
import { ResultsPaths } from "../../../shared/ipc";

export function useResultsPaths() {
  return useContext(ResultsPathsContext);
}

export function useSetResultsPaths() {
  return useContext(SetResultsPathsContext);
}

const ResultsPathsContext = createContext<ResultsPaths | null>(null);
const SetResultsPathsContext = createContext<
  React.Dispatch<React.SetStateAction<ResultsPaths | null>>
>(() => {});

export const ResultsPathProvider: FC = (props) => {
  const [resultsPaths, setResultsPaths] = useState<ResultsPaths | null>(null);
  return (
    <ResultsPathsContext.Provider value={resultsPaths}>
      <SetResultsPathsContext.Provider value={setResultsPaths}>
        {props.children}
      </SetResultsPathsContext.Provider>
    </ResultsPathsContext.Provider>
  );
};
