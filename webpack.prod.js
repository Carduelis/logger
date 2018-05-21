const merge = require('webpack-merge');
const { NamedModulesPlugin, DefinePlugin } = require('webpack');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractLess = new ExtractTextPlugin({
  filename: '[name].css?[id]_[contenthash]',
  disable: process.env.NODE_ENV === 'development'
});
module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.less$/,
        use: extractLess.extract({
          use: ['css-loader?sourceMap', 'less-loader?sourceMap']
        })
      }
    ]
  },
  plugins: [
    new NamedModulesPlugin(),
    new UglifyJSPlugin(),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    extractLess
  ]
});
