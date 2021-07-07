import React from "react";
import { RouterProvider } from "./Router";
import { ArenaTypeProvider } from "./ArenaType";
import { VideoPathProvider } from "./VideoPath";
import { ResultsPathProvider } from "./ResultsPath";
import { ArenaSetupPathProvider } from "./ArenaSetupPath";

const PersistentProviders = (props: PersistentProvidersProps) => {
  return (
    <RouterProvider>
      <ArenaTypeProvider>
        <VideoPathProvider>
          <ResultsPathProvider>
            <ArenaSetupPathProvider>{props.children}</ArenaSetupPathProvider>
          </ResultsPathProvider>
        </VideoPathProvider>
      </ArenaTypeProvider>
    </RouterProvider>
  );
};

interface PersistentProvidersProps {
  children: React.ReactNode;
}

export default PersistentProviders;
