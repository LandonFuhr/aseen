import path from "path";
import fse from "fs-extra";
import { behaviour } from "../paths";

fse.removeSync(path.join(behaviour.distPath, behaviour.name));
