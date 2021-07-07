import { IpcMainEvent } from "electron/main";

type IpcMainCallback = (event: IpcMainEvent, ...args: any[]) => void;

const browsers = [];
const callbacks: IpcMainCallback[] = [];

export class BrowserWindow {
  webContents: any;
  constructor() {
    this.webContents = {
      send: () => {},
      emit: (event: string, ...args: any[]) => {
        if (event === "ipc-message") {
          for (const callback of callbacks) {
            const event = {
              sender: this.webContents,
            } as any;
            callback(event, ...args.slice(1));
          }
        }
      },
    };
    browsers.push(this);
  }
}

export const ipcMain = {
  on: (
    _channel: string,
    callback: (event: IpcMainEvent, ...args: any[]) => {}
  ) => {
    callbacks.push(callback);
  },
};

export const ipcRenderer = {
  send: () => {},
  on: () => {},
};
