import { BrowserWindow } from "electron";
import isDev from "electron-is-dev";

export function createBackgroundWindow(htmlPath: string): BrowserWindow {
  const backgroundAnalyzerWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  backgroundAnalyzerWindow.loadFile(htmlPath);

  if (isDev) {
    backgroundAnalyzerWindow.webContents.openDevTools({ mode: "detach" });
  }

  return backgroundAnalyzerWindow;
}
