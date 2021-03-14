const path = require("path");
const NodemonPlugin = require('nodemon-webpack-plugin'); // Ding

module.exports = {
  entry: path.resolve(__dirname, "src/app.js"),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "public/js"),
  },
  plugins: [
    new NodemonPlugin({
        script: 'index.js'
    })
  ]
};
