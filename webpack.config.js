var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.join(__dirname, './public/'),
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['transform-decorators-legacy']
        }
      }
    ]
  }
}