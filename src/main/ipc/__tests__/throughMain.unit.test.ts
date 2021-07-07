import { BrowserWindow } from "electron";
import { forwardBidirectionalMessagesBetweenWindows } from "../forwarder";

jest.mock("electron");

describe("Through main communication: Main Forwarder", () => {
  it("can send messages from first window to second window", () => {
    const window1 = new BrowserWindow();
    const window2 = new BrowserWindow();
    const spy2 = jest.spyOn(window2.webContents, "send");
    forwardBidirectionalMessagesBetweenWindows({
      windows: [window1, window2],
      channel: "test",
    });
    window1.webContents.emit("ipc-message", "test", "my amazing message");

    expect(spy2).toBeCalledTimes(1);
    expect(spy2).toBeCalledWith("test", "my amazing message");
  });

  it("can send messages from second window to first window", () => {
    const window1 = new BrowserWindow();
    const window2 = new BrowserWindow();
    const spy1 = jest.spyOn(window1.webContents, "send");
    forwardBidirectionalMessagesBetweenWindows({
      windows: [window1, window2],
      channel: "test",
    });
    window2.webContents.emit("ipc-message", "test", "my amazing message");

    expect(spy1).toBeCalledTimes(1);
    expect(spy1).toBeCalledWith("test", "my amazing message");
  });

  it("does not send message back to window1 when window1 sends", () => {
    const window1 = new BrowserWindow();
    const window2 = new BrowserWindow();
    const spy1 = jest.spyOn(window1.webContents, "send");
    forwardBidirectionalMessagesBetweenWindows({
      windows: [window1, window2],
      channel: "test",
    });
    window1.webContents.emit("ipc-message", "test", "my amazing message");

    expect(spy1).toBeCalledTimes(0);
  });

  it("does not send message back to window2 when window2 sends", () => {
    const window1 = new BrowserWindow();
    const window2 = new BrowserWindow();
    const spy2 = jest.spyOn(window2.webContents, "send");
    forwardBidirectionalMessagesBetweenWindows({
      windows: [window1, window2],
      channel: "test",
    });
    window2.webContents.emit("ipc-message", "test", "my amazing message");

    expect(spy2).toBeCalledTimes(0);
  });

  it("can send multiple messages between both windows", () => {
    const window1 = new BrowserWindow();
    const window2 = new BrowserWindow();
    const spy1 = jest.spyOn(window1.webContents, "send");
    const spy2 = jest.spyOn(window2.webContents, "send");
    forwardBidirectionalMessagesBetweenWindows({
      windows: [window1, window2],
      channel: "test",
    });
    window1.webContents.emit("ipc-message", "test", "message1");
    window2.webContents.emit("ipc-message", "test", "message2");
    window1.webContents.emit("ipc-message", "test", "message3");
    window2.webContents.emit("ipc-message", "test", "message4");

    expect(spy2).toBeCalledTimes(2);
    expect(spy2).toHaveBeenNthCalledWith(1, "test", "message1");
    expect(spy2).toHaveBeenNthCalledWith(2, "test", "message3");

    expect(spy1).toBeCalledTimes(2);
    expect(spy1).toHaveBeenNthCalledWith(1, "test", "message2");
    expect(spy1).toHaveBeenNthCalledWith(2, "test", "message4");
  });

  it("can independently handle multiple pairs of partners", () => {
    const window1 = new BrowserWindow();
    const window2 = new BrowserWindow();
    const window3 = new BrowserWindow();
    const window4 = new BrowserWindow();
    const spy2 = jest.spyOn(window2.webContents, "send");
    const spy4 = jest.spyOn(window4.webContents, "send");
    forwardBidirectionalMessagesBetweenWindows({
      windows: [window1, window2],
      channel: "channel_1",
    });
    forwardBidirectionalMessagesBetweenWindows({
      windows: [window3, window4],
      channel: "channel_2",
    });
    window1.webContents.emit("ipc-message", "test", "message for window 2");
    window3.webContents.emit("ipc-message", "test", "message for window 4");

    expect(spy2).toBeCalledTimes(1);
    expect(spy2).toBeCalledWith("channel_1", "message for window 2");

    expect(spy4).toBeCalledTimes(1);
    expect(spy4).toBeCalledWith("channel_2", "message for window 4");
  });
});
