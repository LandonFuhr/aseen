import path from "path";
import fse from "fs-extra";
import { videoCreator } from "../paths";

fse.removeSync(path.join(videoCreator.distPath, videoCreator.name));
