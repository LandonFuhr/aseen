import { ipcRenderer } from "electron";
import {
  BEHAVIOUR_CHANNEL,
  CREATE_VIDEO_CHANNEL,
  TRACKING_CHANNEL,
} from "../frontend/src/shared/ipc";
import {
  AnalysisIpcResponse,
  AnalysisIpcSignal,
  BehaviourArgs,
  TrackingArgs,
  VideoCreatorArgs,
} from "../frontend/src/shared/ipc/analysis";

function createIpcAnalyzer<Args>({ channel }: { channel: string }) {
  return {
    on: (listener: (signal: AnalysisIpcSignal<Args>) => void) =>
      ipcRenderer.on(channel, (_event, signal: AnalysisIpcSignal<Args>) => {
        listener(signal);
      }),
    send: (response: AnalysisIpcResponse) =>
      ipcRenderer.send(channel, response),
  };
}

export const ipcTrackingAnalyzer = createIpcAnalyzer<TrackingArgs>({
  channel: TRACKING_CHANNEL,
});

export const ipcBehaviourAnalyzer = createIpcAnalyzer<BehaviourArgs>({
  channel: BEHAVIOUR_CHANNEL,
});

export const ipcVideoCreatorAnalyzer = createIpcAnalyzer<VideoCreatorArgs>({
  channel: CREATE_VIDEO_CHANNEL,
});

export function setupAnalysisRunner<Args>({
  ipcAnalyzer,
  analysisRunner,
}: {
  ipcAnalyzer: IpcAnalyzer<Args>;
  analysisRunner: (args: Args) => Promise<AnalysisIpcResponse>;
}) {
  ipcAnalyzer.on(async (message) => {
    if (message.type !== "START") return;
    try {
      const response = await analysisRunner(message.data);
      ipcAnalyzer.send(response);
    } catch (e) {
      ipcAnalyzer.send({ type: "ERROR", data: { error: String(e) } });
    }
  });
}

export interface IpcAnalyzer<Args> {
  on: (listener: (signal: AnalysisIpcSignal<Args>) => void) => void;
  send: (response: AnalysisIpcResponse) => void;
}
