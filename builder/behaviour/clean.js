const path = require("path");
const fse = require("fs-extra");
const { behaviour } = require("../paths");

fse.removeSync(path.join(behaviour.distPath, behaviour.name));
