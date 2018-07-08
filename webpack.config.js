var path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    'app': './src/App.jsx',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js'
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  plugins: []
}