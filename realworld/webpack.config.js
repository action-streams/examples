const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = (_, { mode }) => ({
  context: path.resolve('src'),
  devServer: {
    compress: true,
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
  },
  devtool: 'source-map',
  entry: 'index.ts',
  infrastructureLogging: {
    level: 'verbose',
  },
  module: {
    rules: [
      {
        exclude: [/node_modules/],
        include: path.resolve('src'),
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        exclude: [/node_modules/],
        include: path.resolve('src'),
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
  output: {
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.MODE': JSON.stringify(mode),
    }),
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
      template: path.resolve(__dirname, 'public/index.html'),
      title: 'realworld - @action-streams',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [path.resolve('src'), 'node_modules'],
  },
});
