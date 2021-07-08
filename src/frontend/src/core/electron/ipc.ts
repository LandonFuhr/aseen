import {
  BehaviourResults,
  CREATE_VIDEO_CHANNEL,
  FileMetadata,
  FileMetadataRequest,
  JsonFileOpenRequest,
  OPEN_DIALOG_CHANNEL,
  READ_BEHAVIOUR_RESULTS_FILE_CHANNEL,
  SAVE_ARENA_SETUP_CHANNEL,
  VideoCreatorTrigger,
  VID_METADATA_CHANNEL,
} from "../../shared/ipc";
import { ArenaSetup } from "../../shared/ipc/ArenaSetup";

declare global {
  interface Window {
    require: (
      module: "electron"
    ) => {
      ipcRenderer: Electron.IpcRenderer;
      shell: Electron.Shell;
    };
  }
}

let ipcRenderer: Electron.IpcRenderer;
try {
  ipcRenderer = window.require("electron").ipcRenderer;
} catch {
  try {
    ipcRenderer = require("electron").ipcRenderer;
  } catch {}
}

export function startVideoCreation(args: VideoCreatorTrigger) {
  ipcRenderer.send(CREATE_VIDEO_CHANNEL, args);
}

export function onVideoCreationUpdate(
  listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void
) {
  ipcRenderer.on(CREATE_VIDEO_CHANNEL, listener);
}

export async function saveArenaSetup(arenaSetup: ArenaSetup): Promise<string> {
  return ipcRenderer.invoke(SAVE_ARENA_SETUP_CHANNEL, arenaSetup);
}

export async function getFileData(
  request: FileMetadataRequest
): Promise<FileMetadata> {
  return ipcRenderer.invoke(VID_METADATA_CHANNEL, request);
}

export async function openDialog(
  options: Electron.OpenDialogOptions
): Promise<Electron.OpenDialogReturnValue> {
  return ipcRenderer.invoke(OPEN_DIALOG_CHANNEL, options);
}

export async function readBehaviourResultsFile(
  request: JsonFileOpenRequest
): Promise<BehaviourResults> {
  return ipcRenderer.invoke(READ_BEHAVIOUR_RESULTS_FILE_CHANNEL, request);
}

export { ipcRenderer };
