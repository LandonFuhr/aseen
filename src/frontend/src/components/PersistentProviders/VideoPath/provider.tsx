import { createContext, Dispatch, SetStateAction } from "react";
import { useSessionState } from "../../SessionStorage";

export const VideoPathProvider = (props: VideoPathProviderProps) => {
  const [path, setPath] = useSessionState<string | null>({
    key: "video_path",
    defaultValue: null,
  });
  return (
    <VideoPathContext.Provider value={{ path, setPath }}>
      {props.children}
    </VideoPathContext.Provider>
  );
};

export const VideoPathContext = createContext<VideoPathState>({
  path: null,
  setPath: () => {},
});

interface VideoPathState {
  path: string | null;
  setPath: Dispatch<SetStateAction<string | null>>;
}

interface VideoPathProviderProps {
  children: React.ReactNode;
}
