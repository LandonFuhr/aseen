import { ipcRenderer } from "electron";
import { TRACKING_CHANNEL } from "../../frontend/src/shared/ipc";
import { runTracker } from "./tracking";

ipcRenderer.on(TRACKING_CHANNEL, async (_event, args) => {
  try {
    await runTracker(args);
    ipcRenderer.send(TRACKING_CHANNEL, {
      type: "success_message",
    });
  } catch (e) {
    ipcRenderer.send(TRACKING_CHANNEL, {
      type: "error_message",
      data: {
        error: e,
      },
    });
  }
});
