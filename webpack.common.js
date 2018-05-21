const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const manifest = require('./config/manifest');

module.exports = {
  entry: {
    app: './src/index.js',
    polyfills: './src/polyfills.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                'transform-decorators-legacy'
                /* should always be the first plugin! */
              ],
              presets: ['react', 'env', 'stage-1']
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 5000 }
          },
          'image-webpack-loader'
        ]
      },
      {
        test: /\.json$/,
        use: ['json-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: manifest.name,
      template: './src/index.html',
      filename: 'index.html',
      files: {
        css: ['main.css']
      }
    }),
    new WebpackPwaManifest(manifest)
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common' // Specify the common bundle's name.
    //  })
  ],
  output: {
    filename: '[name].bundle.js',
    // chunkFilename: '[name].chunk.bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
