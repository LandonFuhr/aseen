const path = require("path");
const fse = require("fs-extra");

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
      ".github",
    ],
    afterExtract: [
      (extractPath, electronVersion, platform, arch, done) => {
        const srcPath = path.join(
          __dirname,
          "dist",
          "analysis_modules",
          "tracking"
        );
        const outPath = path.join(
          extractPath,
          "resources",
          "app",
          "dist",
          "analysis_modules",
          "tracking"
        );
        console.log(`\nCopying\n\tFrom: ${srcPath}\n\tTo: ${outPath}`);
        fse.copySync(srcPath, outPath);
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
