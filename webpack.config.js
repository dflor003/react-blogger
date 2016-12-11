const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsPlugin = require('favicons-webpack-plugin');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

const isDebug = true;

module.exports = {
  debug: isDebug,
  devtool: 'eval',
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
        loaders: ['react-hot', 'awesome-typescript-loader?configFileName=./app/tsconfig.json'],
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
        exclude: [root('app', 'components'), root('app', 'views')],
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
      },
      {
        test: /\.scss$/,
        include: [root('app', 'components'), root('app', 'views')],
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'sass-loader'
        ]
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
    new ExtractTextPlugin('css/[name].[hash].css'),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),
    new FaviconsPlugin(root('app', 'public', 'favicon.png')),
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    })
  ],
};
