import { ipcRenderer } from "electron";
import { CREATE_VIDEO_CHANNEL } from "../../frontend/src/shared/ipc";
import { runVideoCreator } from "./video_creator";

ipcRenderer.on(CREATE_VIDEO_CHANNEL, async (_event, args) => {
  try {
    await runVideoCreator(args);
    ipcRenderer.send(CREATE_VIDEO_CHANNEL, {
      type: "success_message",
    });
  } catch (e) {
    ipcRenderer.send(CREATE_VIDEO_CHANNEL, {
      type: "error_message",
      data: {
        error: e,
      },
    });
  }
});
