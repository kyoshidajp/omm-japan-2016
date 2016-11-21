var webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.js',
  },

  output: {
    path: '../app/assets/javascripts/webpack',
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
      new webpack.DefinePlugin({
        "process.env": {
          "GOOGLE_MAPS_API_KEY": JSON.stringify('aaa')
        }
      }),
      new webpack.ProvidePlugin({
        _: "underscore"
      })
    ]
  }
};

