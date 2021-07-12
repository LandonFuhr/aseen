import fse from "fs-extra";
import { buildDir } from "./paths";

fse.removeSync(buildDir);
