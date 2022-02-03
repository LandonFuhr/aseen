import { videoOptimizer } from "../paths";
import { runPyinstaller } from "../pyinstaller";

runPyinstaller(
  videoOptimizer.main,
  "--distpath",
  videoOptimizer.distPath,
  "--name",
  videoOptimizer.name
);
