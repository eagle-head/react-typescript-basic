const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const dotenv = require("dotenv").config({
  path: `${__dirname}/.env.development`,
});

module.exports = (function () {
  return {
    context: path.resolve(__dirname, "./"),

    mode: "development",

    entry: {
      bundle: path.resolve(__dirname, "src"),
    },

    output: {
      path: path.join(__dirname, "/build"),
      publicPath: "/",
      filename: "[name].js",
    },

    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },

    devtool: "eval-source-map",

    devServer: {
      contentBase: path.join(__dirname, "build"),
      historyApiFallback: true,
      compress: true,
      port: Number(process.env.PORT),
      host: process.env.HOST,
      overlay: true,
      hot: true,
      open: true,
      watchOptions: {
        ignored: /node_modules/,
      },
    },

    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            "style-loader",
            { loader: "css-loader", options: { sourceMap: true } },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
                postcssOptions: {
                  plugins: ["postcss-preset-env"],
                },
              },
            },
            { loader: "sass-loader", options: { sourceMap: true } },
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "images/",
              },
            },
          ],
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: ["babel-loader", "@svgr/webpack", "url-loader"],
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader",
        },
      ],
    },

    plugins: [
      new webpack.ProgressPlugin(),
      new webpack.AutomaticPrefetchPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({ paths: [/node_modules/] }),
      new CopyPlugin({
        patterns: [{ from: "./assets/robots.txt", to: "build" }],
      }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(dotenv.parse),
      }),
      new ForkTsCheckerWebpackPlugin({
        eslint: {
          files: "./src/**/*.{ts,tsx,js,jsx}",
        },
      }),
      new HtmlWebpackPlugin({
        title: process.env.PAGE_TITLE,
        template: path.resolve(
          __dirname,
          "assets",
          "templates",
          "index.template.html"
        ),
        favicon: "./assets/icons/favicon.ico",
      }),
    ],

    optimization: {
      minimize: false,
    },
  };
})();
