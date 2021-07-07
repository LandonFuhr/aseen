const { behaviour } = require("../paths");
const { runPyinstaller } = require("../pyinstaller");

runPyinstaller(
  behaviour.main,
  "--distpath",
  behaviour.distPath,
  "--name",
  behaviour.name
);
