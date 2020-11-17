const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const dotenv = require("dotenv").config({
  path: `${__dirname}/.env.development`,
});

// eslint-disable-next-line
module.exports = (function (env, argv) {
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
      extensions: [".ts", ".tsx", ".js", ".json"],
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
          test: /\.s[ac]ss$/i,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  compileType: "module",
                  localIdentName: "rebel__[hash:base64:8]",
                  localIdentContext: path.resolve(__dirname, "src"),
                },
              },
            },
            "resolve-url-loader",
            "sass-loader",
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
          issuer: {
            test: /\.tsx?$/,
          },
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
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin([path.resolve(__dirname, "node_modules")]),
      new CopyPlugin({
        patterns: [{ from: "./public/robots.txt", to: "build" }],
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
        title: "TypeScript React",
        template: path.resolve(
          __dirname,
          "assets",
          "templates",
          "index.template.html"
        ),
      }),
      new FaviconsWebpackPlugin({
        logo: path.resolve(__dirname, "assets", "icons", "favicon.png"),
        cache: "./.cache",
        prefix: "static/images/",
        favicons: {
          appName: "",
          appShortName: "",
          appDescription: "",
          developerName: "",
          developerURL: "",
          dir: "auto",
          lang: "pt-BR",
          background: "#AAA",
          theme_color: "#BBB",
          display: "standalone",
          appleStatusBarStyle: "black-translucent",
          orientation: "portrait",
          start_url: "./?utm_source=homescreen",
          scope: ".",
          version: "0.0.1",
          logging: false,
          icons: {
            favicons: true,
            android: false,
            appleIcon: false,
            appleStartup: false,
            coast: false,
            firefox: false,
            windows: false,
            yandex: false,
          },
        },
      }),
    ],

    optimization: {
      minimize: false,
    },
  };
})();
