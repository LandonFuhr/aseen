import path from "path";
import fse from "fs-extra";
import { videoOptimizer } from "../paths";

fse.removeSync(path.join(videoOptimizer.distPath, videoOptimizer.name));
