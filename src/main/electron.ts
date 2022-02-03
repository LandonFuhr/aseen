import { app, BrowserWindow, Menu } from "electron";
import { createReactWindow } from "./windows/react";
import { createBackgroundWindow } from "./windows/backgroundAnalyzer";
import { registerFileProtocol } from "./fileProtocol";
import { setupIpcListeners } from "./ipc";
import path from "path";
import { createSplashWindow } from "./windows/splash";

if (require("electron-squirrel-startup")) app.quit();

Menu.setApplicationMenu(null);

app.whenReady().then(() => {
  const splashWindow = createSplashWindow();
  const backgroundTrackingWindow = createBackgroundWindow(
    path.join(__dirname, "analysis_modules", "tracking", "tracking.html")
  );
  const backgroundBehaviourWindow = createBackgroundWindow(
    path.join(__dirname, "analysis_modules", "behaviour", "behaviour.html")
  );
  const backgroundVideoCreatorWindow = createBackgroundWindow(
    path.join(
      __dirname,
      "analysis_modules",
      "video_creator",
      "video_creator.html"
    )
  );
  const backgroundVideoOptimizerWindow = createBackgroundWindow(
    path.join(
      __dirname,
      "analysis_modules",
      "video_optimizer",
      "video_optimizer.html"
    )
  );
  const reactWindow = createReactWindow([
    backgroundTrackingWindow,
    backgroundBehaviourWindow,
    backgroundVideoCreatorWindow,
    backgroundVideoOptimizerWindow,
  ]);

  reactWindow.on("ready-to-show", () => {
    splashWindow.destroy();
    reactWindow.show();
  });

  setupIpcListeners({
    backgroundTrackingWindow,
    backgroundBehaviourWindow,
    backgroundVideoCreatorWindow,
    backgroundVideoOptimizerWindow,
    reactWindow,
  });

  registerFileProtocol();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createReactWindow();
  }
});
