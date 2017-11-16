const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const config = {
  entry: {
    app: './client/scripts/main.js',
  },
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'public')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: __dirname + '/client/scripts',
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]'
              }
            },
            {
              loader: 'postcss-loader',
            },
          ],
        })),
      },
      {
        test: /\.html/,
        loader: 'html-loader',
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader',
        options: {
          hash: 'sha512',
          digest: 'hex',
          name: 'images/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'app.css',
      ignoreOrder: true,
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.css', '.js'],
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    hot: true,
    port: 3005,
  }
};

module.exports = config;
