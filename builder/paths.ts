import path from "path";

function getPythonBinaryPath(): string {
  switch (process.platform) {
    case "win32":
      return path.join("Scripts/python.exe");
    case "linux":
      return path.join("bin/python3.7");
    default:
      throw new Error("Cannot determine operating system");
  }
}

const rootDir = path.join(__dirname, "..");
const buildDir = path.join(rootDir, "dist");
const analysisModulesDir = path.join(buildDir, "analysis_modules");
const pySrc = path.join(rootDir, "src", "py");
const ffprobe = {
  src: path.join(rootDir, "src", "main", "ffprobe-bin"),
  dst: path.join(buildDir, "ffprobe-bin"),
};
const pyinstaller = {
  pythonPath: path.join(rootDir, "venv", getPythonBinaryPath()),
  workPath: path.join(rootDir, "pyinstaller_build"),
};
const splash = {
  src: path.join(rootDir, "src", "main", "splash.html"),
  dst: path.join(buildDir, "splash.html"),
};
const videoCreator = {
  main: path.join(pySrc, "video_creator.py"),
  distPath: analysisModulesDir,
  name: "video_creator",
};
const tracking = {
  main: path.join(pySrc, "tracking.py"),
  distPath: analysisModulesDir,
  name: "tracking",
  dlc: {
    src: path.join(pySrc, "analysis_lib", "tracking", "dlc_project"),
    dst: path.join(analysisModulesDir, "tracking", "dlc_project"),
  },
};
const behaviour = {
  main: path.join(pySrc, "behaviour.py"),
  distPath: analysisModulesDir,
  name: "behaviour",
};

export {
  analysisModulesDir,
  buildDir,
  behaviour,
  videoCreator,
  tracking,
  splash,
  pyinstaller,
  ffprobe,
};
