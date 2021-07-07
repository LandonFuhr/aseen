const fse = require("fs-extra");
const { buildDir } = require("./paths");

fse.removeSync(buildDir);
