var webpack = require('webpack');

module.exports = {
  entry: {
    app: './client/src/app.js',
  },

  output: {
    path: './app/assets/javascripts/webpack',
    filename: '[name].js',
  },

  module: {
    loaders: [
      { test: /\.(js|jsx)$/,
        loader: "babel",
        exclude: /node_modules/,
        query: {
          presets: ["es2015", "react"],
        }
      },
    ],
    plugins: [
    ]
  }
};

