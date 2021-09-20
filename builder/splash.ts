import { splash } from "./paths";
import fse from "fs-extra";

fse.copySync(splash.src, splash.dst);
