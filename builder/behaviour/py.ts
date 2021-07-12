import { behaviour } from "../paths";
import { runPyinstaller } from "../pyinstaller";

runPyinstaller(
  behaviour.main,
  "--distpath",
  behaviour.distPath,
  "--name",
  behaviour.name
);
