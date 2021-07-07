const fs = require("fs");
const { splash } = require("./paths");

fs.copyFileSync(splash.src, splash.dst);
