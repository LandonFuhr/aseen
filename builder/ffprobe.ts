import fse from "fs-extra";
import { ffprobe } from "./paths";

if (!fse.existsSync(ffprobe.dst)) {
  fse.copySync(ffprobe.src, ffprobe.dst);
}
