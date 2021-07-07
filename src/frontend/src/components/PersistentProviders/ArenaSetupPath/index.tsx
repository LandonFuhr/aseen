import { createContext, FC, useContext, useState } from "react";

export function useArenaSetupPath() {
  return useContext(ArenaSetupPathContext);
}
export function useSetArenaSetupPath() {
  return useContext(SetArenaSetupPathContext);
}

const ArenaSetupPathContext = createContext<string | null>(null);
const SetArenaSetupPathContext = createContext<
  React.Dispatch<React.SetStateAction<string | null>>
>(() => {});

export const ArenaSetupPathProvider: FC = ({ children }) => {
  const [arenaSetupPath, setArenaSetupPath] = useState<string | null>(null);

  return (
    <ArenaSetupPathContext.Provider value={arenaSetupPath}>
      <SetArenaSetupPathContext.Provider value={setArenaSetupPath}>
        {children}
      </SetArenaSetupPathContext.Provider>
    </ArenaSetupPathContext.Provider>
  );
};
