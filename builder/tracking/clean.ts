import path from "path";
import fse from "fs-extra";
import { tracking } from "../paths";

fse.removeSync(path.join(tracking.distPath, tracking.name));
