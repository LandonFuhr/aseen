import { ipcRenderer } from "electron";
import { BEHAVIOUR_CHANNEL } from "../../frontend/src/shared/ipc";
import { runBehaviourAnalyzer } from "./behaviour";

ipcRenderer.on(BEHAVIOUR_CHANNEL, async (_event, args) => {
  try {
    await runBehaviourAnalyzer(args);
    ipcRenderer.send(BEHAVIOUR_CHANNEL, {
      type: "success_message",
    });
  } catch (e) {
    ipcRenderer.send(BEHAVIOUR_CHANNEL, {
      type: "error_message",
      data: {
        error: e,
      },
    });
  }
});
