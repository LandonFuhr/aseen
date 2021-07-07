import { createContext } from "react";
import { ArenaType } from "../../../core/types";
import { useSessionState } from "../../SessionStorage";

export const ArenaTypeProvider = (props: ArenaTypeProviderProps) => {
  const [arenaType, setArenaType] = useSessionState<ArenaType | null>({
    key: "arena_type",
    defaultValue: null,
  });
  const arenaTypeState: ArenaTypeState = {
    arenaType,
    setArenaType,
  };
  return (
    <ArenaTypeContext.Provider value={arenaTypeState}>
      {props.children}
    </ArenaTypeContext.Provider>
  );
};

export const ArenaTypeContext = createContext<ArenaTypeState | null>(null);

interface ArenaTypeState {
  arenaType: ArenaType | null;
  setArenaType: (newVal: ArenaType | null) => void;
}

interface ArenaTypeProviderProps {
  children: React.ReactNode;
}
