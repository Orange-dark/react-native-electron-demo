const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: isProduction ? "production" : "development",
    entry: "./web/index.web.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      publicPath: isProduction ? "./" : "/",
      globalObject: "self",
      environment: {
        arrowFunction: false,
        bigIntLiteral: false,
        const: false,
        destructuring: false,
        dynamicImport: false,
        forOf: false,
        module: false,
      },
    },
    resolve: {
      alias: {
        "react-native$": "react-native-web",
        "css-in-js-utils": "css-in-js-utils/lib",
        "hyphenate-style-name": "hyphenate-style-name/index.js",
        "inline-style-prefixer": "inline-style-prefixer/lib",
      },
      extensions: [".web.js", ".js", ".ts", ".tsx", ".json"],
      mainFields: ["main", "browser"],
      fallback: { 
        crypto: false, 
        stream: false, 
        buffer: false,
        fs: false,
        path: false,
        os: false,
      },
    },
    module: {
      rules: [
        // 1️⃣ 转译项目源码
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules\/(?!(@react-navigation|react-native-|@react-native-))/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                require.resolve("@react-native/babel-preset"),
                ["@babel/preset-env", {
                  targets: { browsers: ['last 2 versions'] },
                  modules: "commonjs"
                }],
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
              plugins: [
                // 添加这个插件来处理 CommonJS 模块
                "@babel/plugin-transform-modules-commonjs"
              ],
            },
          },
        },
        // 2️⃣ 转译所有 node_modules 包为 CommonJS
        {
          test: /\.[jt]sx?$/,
          include: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", {
                  targets: { browsers: ['last 2 versions'] },
                  modules: "commonjs"
                }],
              ],
              plugins: [
                "@babel/plugin-transform-modules-commonjs"
              ],
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./web/index.html"),
      }),
      new webpack.DefinePlugin({
        'global': 'globalThis',
        'exports': '{}',
        'module': '{ exports: {} }',
      }),
    ],
    devServer: isProduction
      ? undefined
      : {
          static: path.join(__dirname, "dist"),
          port: 3000,
          hot: false,
          liveReload: false,
          historyApiFallback: true,
          client: false,
        },
  };
};