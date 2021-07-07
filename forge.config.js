const fs = require("fs-extra");
const path = require("path");
const { tracking } = require("./builder/paths");

module.exports = {
  packagerConfig: {
    icon: path.join(__dirname, "icons", "icon"),
    name: "Aseen",
    ignore: [
      "src",
      ".vscode",
      "jest.config.js",
      "forge.config.js",
      "webpack.config.js",
      "README.md",
      ".gitignore",
      ".pytest_cache",
      "tsconfig.json",
      "venv",
      "__mocks__",
      "data_schemas",
      "pyinstaller_build",
      "builder",
      "icons",
    ],
    afterExtract: [
      (extractPath, electronVersion, platform, arch, done) => {
        const dlcPath = path.join(tracking.distPath, tracking.name);
        const outPath = path.join(
          extractPath,
          "resources",
          "app",
          "dist",
          "analysis_modules",
          tracking.name
        );
        console.log(`\nCopying\n\tFrom: ${dlcPath}\n\tTo: ${outPath}`);
        fs.copySync(dlcPath, outPath);
        done();
      },
    ],
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {},
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
      config: {},
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
};
