var path = require('path');
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./web/static/js/app.js",
  output: {
    path: "./priv/static",
    filename: "js/app.js"
  },
  resolve: {
    modulesDirectories: [ "node_modules", __dirname + "/web/static/js" ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ["es2015", "stage-0", "react"],
          plugins: ["transform-decorators-legacy"]
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{ from: "./web/static/assets" }, { from: "./web/static/css", to: 'css/' }])
  ]
};
