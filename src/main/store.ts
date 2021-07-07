import { BrowserWindow } from "electron";
import Store from "electron-store";

const store = new Store();

const keys = {
  windowSize: "windowSize",
  maximized: "maximized",
};

export function getWindowBounds(): WindowBounds {
  return store.get(keys.windowSize, {
    width: 800,
    height: 600,
  }) as WindowBounds;
}

export function saveWindowBounds(window: BrowserWindow) {
  store.set(keys.windowSize, window.getNormalBounds());
}

export function getShouldMaximize(): boolean {
  return Boolean(store.get(keys.maximized, false));
}

export function saveMaximizedState(window: BrowserWindow) {
  store.set(keys.maximized, window.isMaximized());
}

interface WindowBounds {
  width: number;
  height: number;
  x: number;
  y: number;
}
