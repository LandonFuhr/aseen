//
// Modified from ffprobe-static: https://github.com/joshwnj/ffprobe-static
//
import os from "os";
import path from "path";

const platform = os.platform();
const arch = os.arch();
const fname = platform === "win32" ? "ffprobe.exe" : "ffprobe";

const ffprobePath = path.resolve(
  __dirname,
  "..",
  "..",
  "ffprobe-bin",
  platform,
  arch,
  fname
);

export { ffprobePath };
