import { BrowserWindow } from "electron";
import path from 'path'

export function createSplashWindow(): BrowserWindow {
  const splashWindow = new BrowserWindow({
      alwaysOnTop: true,
      frame: false,
      height: 400,
      width: 550
  });

  splashWindow.loadFile(path.join(__dirname, 'splash.html'));

  return splashWindow;
}
