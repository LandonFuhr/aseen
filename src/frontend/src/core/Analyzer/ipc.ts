import { BEHAVIOUR_CHANNEL, TRACKING_CHANNEL } from "../../shared/ipc";
import {
  AnalysisIpcResponse,
  AnalysisIpcSignal,
  BehaviourArgs,
  TrackingArgs,
  VideoCreatorArgs,
} from "../../shared/ipc/analysis";
import { ipcRenderer } from "../electron/ipc";

function createIpcController<Args>({
  channel,
}: {
  channel: string;
}): IpcController<Args> {
  return {
    on: (listener: (response: AnalysisIpcResponse) => void) => {
      ipcRenderer.on(channel, (_event, response: AnalysisIpcResponse) => {
        listener(response);
      });
    },
    send: (signal: AnalysisIpcSignal<Args>) => {
      ipcRenderer.send(channel, signal);
    },
  };
}

export interface IpcController<Args> {
  on: (listener: (response: AnalysisIpcResponse) => void) => void;
  send: (signal: AnalysisIpcSignal<Args>) => void;
}

export const ipcTrackingController = createIpcController<TrackingArgs>({
  channel: TRACKING_CHANNEL,
});

export const ipcBehaviourController = createIpcController<BehaviourArgs>({
  channel: BEHAVIOUR_CHANNEL,
});

export const ipcVideoCreatorController = createIpcController<VideoCreatorArgs>({
  channel: BEHAVIOUR_CHANNEL,
});
