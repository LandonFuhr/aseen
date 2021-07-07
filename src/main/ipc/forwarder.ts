import { BrowserWindow, ipcMain } from "electron";

export function forwardBidirectionalMessagesBetweenWindows({
  channel,
  windows,
}: {
  channel: string;
  windows: [BrowserWindow, BrowserWindow];
}) {
  ipcMain.on(channel, (event, args) => {
    if (event.sender === windows[0].webContents) {
      windows[1].webContents.send(channel, args);
    } else {
      windows[0].webContents.send(channel, args);
    }
  });
}
