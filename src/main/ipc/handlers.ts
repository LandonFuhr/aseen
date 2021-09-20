import {
  OpenDialogOptions,
  dialog,
  OpenDialogReturnValue,
  IpcMainInvokeEvent,
  app,
  BrowserWindow,
} from "electron";
import {
  ArenaSetupPath,
  FileMetadata,
  FileMetadataRequest,
  JsonFileOpenRequest,
  ResultsPaths,
  ResultsPathsRequest,
  SavedResult,
} from "../../frontend/src/shared/ipc";
import { ArenaSetup } from "../../frontend/src/shared/ipc/ArenaSetup";
import { ffprobePath } from "../ffprobe-static-webpack";
import ffprobe from "ffprobe";
import fs, { promises as fspromises } from "fs";
import path from "path";
import log from "electron-log";
import { ArenaType } from "../../frontend/src/core/types";

export async function handleArenaSetupSave({
  arenaSetup,
  window,
}: {
  arenaSetup: ArenaSetup;
  window: BrowserWindow;
}): Promise<ArenaSetupPath | null> {
  const { filePath } = await dialog.showSaveDialog(window, {
    title: "Select Folder for Results",
    defaultPath: path.join(app.getPath("desktop"), "Arena.json"),
  });
  log.info(`Selected file path "${filePath}" for arena setup`);
  if (filePath === undefined) {
    return null;
  }
  const prettyJsonString = JSON.stringify(arenaSetup, null, 2);
  fs.writeFileSync(filePath, prettyJsonString);
  log.info("Wrote arena setup to file");
  return filePath;
}

export function handleOpenDialog(
  _event: IpcMainInvokeEvent,
  options: OpenDialogOptions
): Promise<OpenDialogReturnValue> {
  return dialog.showOpenDialog(options);
}

export async function handleFileMetadataRequest(
  _event: IpcMainInvokeEvent,
  request: FileMetadataRequest
): Promise<FileMetadata | null> {
  const statsPromise = getFileStats(request.path);
  const ffMetadataPromise = ffprobe(request.path, {
    path: ffprobePath,
  })
    .then((result) => {
      const fileInfo = result.streams[0];
      if (fileInfo === undefined || fileInfo.duration_ts === undefined) {
        return null;
      }
      return fileInfo;
    })
    .catch((_) => null);
  const stats = await statsPromise;
  if (stats === null) {
    return null;
  }
  const ffMetadata = await ffMetadataPromise;
  if (
    ffMetadata === null ||
    ffMetadata.duration === undefined ||
    ffMetadata.height === undefined ||
    ffMetadata.width === undefined ||
    ffMetadata.avg_frame_rate === undefined
  ) {
    return null;
  }
  const durationInSeconds = Number(ffMetadata.duration);
  const averageFramerate = getFloatFromStringFraction(
    ffMetadata.avg_frame_rate
  );
  return {
    nBytes: stats.size,
    averageFramerate,
    createdAtDate: stats.createdAtDate,
    durationInMilliseconds: Math.round(durationInSeconds * 1000),
    dimensionsInPx: {
      width: ffMetadata.width,
      height: ffMetadata.height,
    },
  };
}

function getFloatFromStringFraction(fraction: string): number {
  const parts = fraction.split("/");
  return Number(parts[0]) / Number(parts[1]);
}

interface FileStats {
  size: number;
  createdAtDate: Date;
}

async function getFileStats(path: string): Promise<FileStats | null> {
  try {
    const stats = fs.statSync(path);
    return {
      size: stats.size,
      createdAtDate: new Date(stats.birthtime),
    };
  } catch {
    return null;
  }
}

export function handleResultsPathsCreationRequest(
  _event: IpcMainInvokeEvent,
  request: ResultsPathsRequest
): ResultsPaths {
  const resultsFolder = path.normalize(path.dirname(request.arenaSetupPath));
  return {
    resultsFolder,
    trackingResultsH5Path: path.join(resultsFolder, "Tracking.h5"),
    behaviourAssayResultsJsonPath: path.join(resultsFolder, "Behaviour.json"),
    outputVideoPath: path.join(resultsFolder, "Out.mp4"),
  };
}

export async function handleReadBehaviourResultsFileRequest(
  _event: IpcMainInvokeEvent,
  request: JsonFileOpenRequest
) {
  return fspromises.readFile(request.path).then((data) => {
    return JSON.parse(data.toString());
  });
}

export async function handleReadAllSavedResultsRequest(): Promise<
  SavedResult[]
> {
  // TODO
  return [];
}
