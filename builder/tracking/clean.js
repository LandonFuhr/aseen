const path = require("path");
const fse = require("fs-extra");
const { tracking } = require("../paths");

fse.removeSync(path.join(tracking.distPath, tracking.name));
