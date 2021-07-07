const path = require("path");

const rootDir = path.join(__dirname, "..");
const buildDir = path.join(rootDir, "dist");
const analysisModulesDir = path.join(buildDir, "analysis_modules");
const pySrc = path.join(rootDir, "src", "py");
const pyinstaller = {
  pythonPath: path.join(rootDir, "venv", "Scripts", "python.exe"),
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

module.exports = {
  analysisModulesDir,
  buildDir,
  behaviour,
  videoCreator,
  tracking,
  splash,
  pyinstaller,
};
