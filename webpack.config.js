const path = require("path");
const NodemonPlugin = require('nodemon-webpack-plugin'); // Ding

module.exports = {
  entry: path.resolve(__dirname, "src/app.js"),
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  target: ['web', 'es5'],
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "public/js"),
  },
  plugins: [
    new NodemonPlugin({
        script: 'index.js',
        watch: path.resolve(__dirname, 'periods'),
        ext: 'js,json'
    })
  ]
};
