import {
  VID_METADATA_CHANNEL,
  OPEN_DIALOG_CHANNEL,
  SAVE_ARENA_SETUP_CHANNEL,
  CREATE_VIDEO_CHANNEL,
  BEHAVIOUR_CHANNEL,
  TRACKING_CHANNEL,
  RESULTS_PATHS_CREATION_CHANNEL,
} from "../../frontend/src/shared/ipc";
import { BrowserWindow, ipcMain } from "electron";
import {
  handleOpenDialog,
  handleFileMetadataRequest,
  handleArenaSetupSave,
  handleResultsPathsCreationRequest,
} from "./handlers";
import { forwardBidirectionalMessagesBetweenWindows } from "./forwarder";

export function setupIpcListeners({
  backgroundTrackingWindow,
  backgroundBehaviourWindow,
  backgroundVideoCreatorWindow,
  reactWindow,
}: {
  backgroundTrackingWindow: BrowserWindow;
  backgroundBehaviourWindow: BrowserWindow;
  backgroundVideoCreatorWindow: BrowserWindow;
  reactWindow: BrowserWindow;
}) {
  forwardBidirectionalMessagesBetweenWindows({
    channel: TRACKING_CHANNEL,
    windows: [backgroundTrackingWindow, reactWindow],
  });
  forwardBidirectionalMessagesBetweenWindows({
    channel: BEHAVIOUR_CHANNEL,
    windows: [backgroundBehaviourWindow, reactWindow],
  });
  forwardBidirectionalMessagesBetweenWindows({
    channel: CREATE_VIDEO_CHANNEL,
    windows: [backgroundVideoCreatorWindow, reactWindow],
  });
  listenToDialogOpenIpc();
  listenToFileMetadataRequestsIpc();
  listenToArenaSetupSaveIpc(reactWindow);
  listenToResultsPathsCreationRequest();
}

function listenToArenaSetupSaveIpc(window: BrowserWindow) {
  ipcMain.handle(SAVE_ARENA_SETUP_CHANNEL, (_event, arenaSetup) =>
    handleArenaSetupSave({ arenaSetup, window })
  );
}

function listenToFileMetadataRequestsIpc() {
  ipcMain.handle(VID_METADATA_CHANNEL, handleFileMetadataRequest);
}

function listenToDialogOpenIpc() {
  ipcMain.handle(OPEN_DIALOG_CHANNEL, handleOpenDialog);
}

function listenToResultsPathsCreationRequest() {
  ipcMain.handle(
    RESULTS_PATHS_CREATION_CHANNEL,
    handleResultsPathsCreationRequest
  );
}
