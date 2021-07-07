const path = require("path");
const fse = require("fs-extra");
const { videoCreator } = require("../paths");

fse.removeSync(path.join(videoCreator.distPath, videoCreator.name));
