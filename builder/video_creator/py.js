const { videoCreator } = require("../paths");
const { runPyinstaller } = require("../pyinstaller");

runPyinstaller(
  videoCreator.main,
  "--distpath",
  videoCreator.distPath,
  "--name",
  videoCreator.name
);
