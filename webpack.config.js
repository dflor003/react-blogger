const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

const isDebug = true;

module.exports = {
  debug: isDebug,
  devtool: 'source-map',
  entry: {
    polyfills: './app/polyfills.tsx',
    vendor: './app/vendor.tsx',
    app: './app/app.tsx'
  },
  output: {
    path: root('dist'),
    publicPath: '/',
    filename: 'js/[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.tsx', '.ts', '.scss', '.html']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: ['babel', 'awesome-typescript-loader'],
        include: root('app')
      },
      {
        test: /\.(html|css)$/,
        include: root('app'),
        loader: 'raw-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.scss$/,
        exclude: root('app'),
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      },
      {
        test: /\.scss$/,
        include: root('app'),
        loaders: ['raw-loader', 'sass-loader']
      },
      {
        test: /\.png$/,
        include: root('app', 'public'),
        loader: 'url?limit=1024!file'
      }
    ]
  },
  sassLoader: {
    includePaths: [
      root('node_modules', 'bootstrap-sass', 'assets', 'stylesheets')
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(isDebug ? 'DEV' : 'PRODUCTION')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    })
  ],
};
