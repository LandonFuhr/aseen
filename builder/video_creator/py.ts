import { videoCreator } from "../paths";
import { runPyinstaller } from "../pyinstaller";

runPyinstaller(
  videoCreator.main,
  "--distpath",
  videoCreator.distPath,
  "--name",
  videoCreator.name
);
