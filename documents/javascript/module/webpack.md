# 결코 피해갈 수 없는 WebPack

## 웹팩이란?

웹팩의 컨셉은 module을 entry로 한데 모아 하나 이상의 파일로 build 한다. 웹팩은 런타임으로 실행되지 않는다. 정적이다. 웹팩이 필요한 이유는 자바스크립트 개발자가 module을 사용해서 코드를 작성하기 때문이다. 흔히 보통 module을 통해 코드를 나누고 전역 공간을 오염시키지 않으며 종속성을 통해 코드를 재사용하고 효율적인 개발을 한다. 어찌됐든 이렇게 되면 자바스크립트 파일이 여러개로 나뉘는데 이런 수많은 자바스크립트 파일을 한데 모아 어플리케이션을 보다 효율적으로 운영할 수 있도록 하게 한다.

## 웹팩 세팅

나는 웹팩을 설치하고 나면 패키지를 마구 설치하기 바빴다. 잘 모르기 때문이다. 하지만 이전에 작성했던 웹팩 코드를 살펴보면서 웹팩 컨셉을 다시 읽어보면서 어느 부분이 어떤 역할을 하는지 이해해보려고 한다.

```javascript
const path = require("path");
const webpack = require("webpack");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const IS_DEVELOPMENT = process.env.NODE_ENV === "dev";

const dirApp = path.join(__dirname, "app");
const dirShared = path.join(__dirname, "shared");
const dirStyles = path.join(__dirname, "styles");
const dirNode = "node_modules";

module.exports = {
  entry: [path.join(dirApp, "index.js"), path.join(dirStyles, "index.scss")],

  resolve: {
    modules: [dirApp, dirShared, dirStyles, dirNode],
  },

  plugins: [
    new webpack.DefinePlugin({
      IS_DEVELOPMENT,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./shared",
          to: "",
        },
      ],
    }),

    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),

    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [
            ["gifsicle", { interlaced: true }],
            ["jpegtran", { progressive: true }],
            ["optipng", { optimizationLevel: 8 }],
          ],
        },
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        use: { loader: "babel-loader" },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "",
            },
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff2?|fnt|webp)$/,
        loader: "file-loader",
        options: {
          name(file) {
            return "[hash].[ext]";
          },
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
          },
        ],
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: "raw-loader",
        exclude: /node_modules/,
      },

      {
        test: /\.(glsl|frag|vert)$/,
        loader: "glslify-loader",
        exclude: /node_modules/,
      },
    ],
  },

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
```
