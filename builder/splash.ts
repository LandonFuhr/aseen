import fs from "fs";
import { splash } from "./paths";

fs.copyFileSync(splash.src, splash.dst);
