import path from "path";
import { BrowserWindow } from "electron";
import isDev from "electron-is-dev";
import {
  getShouldMaximize,
  getWindowBounds,
  saveMaximizedState,
  saveWindowBounds,
} from "../store";

export function createReactWindow(
  backgroundWindows?: BrowserWindow[]
): BrowserWindow {
  const reactWindow = new BrowserWindow({
    ...getWindowBounds(),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false,
    },
    show: false,
  });

  reactWindow.loadURL(getReactFilePath());

  reactWindow.on("ready-to-show", () => {
    if (getShouldMaximize()) {
      reactWindow.maximize();
    }

    if (isDev) {
      reactWindow.webContents.openDevTools();
    }
  });

  reactWindow.on("close", () => {
    saveWindowBounds(reactWindow);
    saveMaximizedState(reactWindow);
    backgroundWindows?.forEach((window) => window.close());
  });

  return reactWindow;
}

function getReactFilePath(): string {
  return isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "build-frontend", "index.html")}`;
}
