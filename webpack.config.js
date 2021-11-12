const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
module.exports = {
  entry: {
    main: "./src/assets/js/main.js",
    comments: "./src/assets/js/comments.js",
    vote: "./src/assets/js/vote.js",
    reservation: "./src/assets/js/reservation.js",
    editor: "./src/assets/js/editor.js",
    viewer: "./src/assets/js/viewer.js",
    selectVerse: "./src/assets/js/selectVerse.js",
    rules: "./src/assets/js/rules.js",
    selectVerse: "./src/assets/js/selectVerse.js",
    rules: "./src/assets/js/rules.js",
    join: "./src/assets/js/join.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "client"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    browsers: ["last 2 chrome versions"],
                  },
                  debug: true,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
