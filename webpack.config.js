const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    mode: isProduction ? "production" : "development",
    entry: "./web/index.web.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      publicPath: isProduction ? "./" : "/",
    },
  resolve: {
    alias: {
      "react-native$": "react-native-web",
    },
    extensions: [".web.js", ".js", ".ts", ".tsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules\/(?!(@react-native|react-native|react-native-web)\/).*/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@react-native/babel-preset",
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
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
    ],
    devServer: isProduction ? undefined : {
      static: path.join(__dirname, "dist"),
      port: 3000,
      hot: true,
    },
  };
};
