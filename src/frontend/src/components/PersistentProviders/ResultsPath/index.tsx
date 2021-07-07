import { createContext, FC, useContext, useState } from "react";

export function useResultsPath() {
  return useContext(ResultsPathContext);
}

export function useSetResultsPath() {
  return useContext(SetResultsPathContext);
}

const ResultsPathContext = createContext<string | null>(null);
const SetResultsPathContext = createContext<
  React.Dispatch<React.SetStateAction<string | null>>
>(() => {});

export const ResultsPathProvider: FC = (props) => {
  const [resultsPath, setResultsPath] = useState<string | null>(null);
  return (
    <ResultsPathContext.Provider value={resultsPath}>
      <SetResultsPathContext.Provider value={setResultsPath}>
        {props.children}
      </SetResultsPathContext.Provider>
    </ResultsPathContext.Provider>
  );
};
