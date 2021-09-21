import {
  VID_METADATA_CHANNEL,
  OPEN_DIALOG_CHANNEL,
  SAVE_ARENA_SETUP_CHANNEL,
  CREATE_VIDEO_CHANNEL,
  BEHAVIOUR_CHANNEL,
  TRACKING_CHANNEL,
  RESULTS_PATHS_CREATION_CHANNEL,
  READ_BEHAVIOUR_RESULTS_FILE_CHANNEL,
  READ_ALL_SAVED_RESULTS,
  SAVE_RESULTS,
} from "../../frontend/src/shared/ipc";
import { BrowserWindow, ipcMain } from "electron";
import {
  handleOpenDialog,
  handleFileMetadataRequest,
  handleArenaSetupSave,
  handleResultsPathsCreationRequest,
  handleReadBehaviourResultsFileRequest,
  handleReadAllSavedResultsRequest,
  handleSaveResults,
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
  listenToReadBehaviourResultsFileRequest();
  listenToSaveResultsRequest();
  listenToReadAllSavedResultsRequest();
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

function listenToReadBehaviourResultsFileRequest() {
  ipcMain.handle(
    READ_BEHAVIOUR_RESULTS_FILE_CHANNEL,
    handleReadBehaviourResultsFileRequest
  );
}

function listenToSaveResultsRequest() {
  ipcMain.handle(SAVE_RESULTS, handleSaveResults);
}

function listenToReadAllSavedResultsRequest() {
  ipcMain.handle(READ_ALL_SAVED_RESULTS, handleReadAllSavedResultsRequest);
}
