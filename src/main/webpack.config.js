const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const base = {
  context: __dirname,
  entry: path.join(__dirname, "electron.ts"),
  output: {
    path: path.join(__dirname, "../../dist"),
    filename: "electron.js",
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  target: "electron-main",
};

const prod = {
  ...base,
  name: "prod",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },
};

const dev = {
  ...base,
  name: "dev",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: true,
    }),
  ],
  target: "electron-main",
};

module.exports = [dev, prod];
