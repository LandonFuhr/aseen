const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const analysisModulesSrcDir = path.join(__dirname, "src", "analysis_modules");
const analysisModulesDstDir = path.join(__dirname, "dist", "analysis_modules");

const videoCreatorConfig = {
  name: "video_creator",
  entry: path.join(analysisModulesSrcDir, "video_creator/index.ts"),
  output: {
    path: path.join(analysisModulesDstDir, "video_creator"),
    filename: "video_creator.js",
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
      },
    ],
  },
  mode: "production",
  target: "electron-renderer",
  plugins: [new HtmlWebpackPlugin({ filename: "video_creator.html" })],
};

const behaviourConfig = {
  name: "behaviour",
  entry: path.join(analysisModulesSrcDir, "behaviour/index.ts"),
  output: {
    path: path.join(analysisModulesDstDir, "behaviour"),
    filename: "behaviour.js",
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
      },
    ],
  },
  mode: "production",
  target: "electron-renderer",
  plugins: [new HtmlWebpackPlugin({ filename: "behaviour.html" })],
};

const trackingConfig = {
  name: "tracking",
  entry: path.join(analysisModulesSrcDir, "tracking/index.ts"),
  output: {
    path: path.join(analysisModulesDstDir, "tracking"),
    filename: "tracking.js",
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
      },
    ],
  },
  mode: "production",
  target: "electron-renderer",
  plugins: [new HtmlWebpackPlugin({ filename: "tracking.html" })],
};

const mainConfig = {
  name: "main",
  entry: path.join(__dirname, "src/main/electron.ts"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "electron.js",
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
      },
    ],
  },
  mode: "production",
  target: "electron-main",
};

module.exports = [
  mainConfig,
  trackingConfig,
  videoCreatorConfig,
  behaviourConfig,
];
