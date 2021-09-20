const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

function createBaseConfig({ name, filename }) {
  return {
    name,
    context: __dirname,
    target: "electron-renderer",
    entry: path.join(__dirname, `${filename}/index.ts`),
    output: {
      path: path.join(__dirname, `../../dist/analysis_modules/${filename}`),
      filename: `${filename}.js`,
    },
    resolve: {
      extensions: [".js", ".ts"],
    },
    plugins: [new HtmlWebpackPlugin({ filename: `${filename}.html` })],
  };
}

function createDevConfig({ name }) {
  const base = createBaseConfig({ name: `${name}_dev`, filename: name });
  return {
    ...base,
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
      ...base.plugins,
      new ForkTsCheckerWebpackPlugin({
        typescript: true,
      }),
    ],
  };
}

function createProdConfig({ name }) {
  const base = createBaseConfig({ name: `${name}_prod`, filename: name });
  return {
    ...base,
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
}

const analysisModuleNames = ["video_creator", "behaviour", "tracking"];
const configs = [];
for (const moduleName of analysisModuleNames) {
  configs.push(
    createDevConfig({ name: moduleName }),
    createProdConfig({ name: moduleName })
  );
}

module.exports = configs;
