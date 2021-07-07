const fse = require("fs-extra");
const { ffprobe } = require("./paths");

if (!fse.existsSync(ffprobe.dst)) {
  fse.copySync(ffprobe.src, ffprobe.dst);
}
