const merge = require('webpack-merge');
const { HotModuleReplacementPlugin, DefinePlugin } = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    host: '0.0.0.0',
    port: 3107,
    hot: true
  },
  module: {
    rules: [
      {
        // for the external css files
        test: /\.css$/,
        use: ['style-loader', 'css-loader?sourceMap']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader?sourceMap', 'less-loader?sourceMap']
      }
    ]
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
});
