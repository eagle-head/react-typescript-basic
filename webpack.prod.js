const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const dotenv = require("dotenv").config({
  path: `${__dirname}/.env.production`,
});

module.exports = (function () {
  return {
    context: path.resolve(__dirname, "./"),

    mode: "production",

    entry: {
      bundle: path.resolve(__dirname, "src"),
    },

    output: {
      path: path.resolve(__dirname, "build"),
      publicPath: "/",
      filename: "static/js/[name]~[contenthash:16].js",
    },

    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      alias: {
        "react-dom$": "react-dom/profiling",
        "scheduler/tracing": "scheduler/tracing-profiling",
      },
    },

    optimization: {
      minimize: true,
      moduleIds: "deterministic",
      runtimeChunk: {
        name: "runtime",
      },
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
          },
        },
      },
      minimizer: [
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
          parallel: 4,
          extractComments: true,
          terserOptions: {
            output: {
              comments: /@license/i,
            },
          },
        }),
        new CssMinimizerPlugin(),
      ],
    },

    plugins: [
      new CleanWebpackPlugin(),
      new webpack.ProgressPlugin(),
      new CopyPlugin({
        patterns: [{ from: "./assets/robots.txt", to: "./" }],
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
      new MiniCssExtractPlugin({
        filename: "static/css/[name]~[contenthash:16].css",
        chunkFilename: "static/css/[id]~[contenthash:16].css",
        ignoreOrder: true,
      }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(dotenv.parse),
      }),
    ],

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
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: ["postcss-preset-env"],
                },
              },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name]~[contenthash:16].[ext]",
                outputPath: "static/images/",
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
  };
})();
