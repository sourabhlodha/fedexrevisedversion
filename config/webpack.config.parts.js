const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


exports.devServer = ({ publicPath, host, port } = {}) => ({
  devServer: {
    historyApiFallback: true,
    publicPath,
    hot: true,
    open: true,
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    quiet: false,
    overlay: {
      errors: true,
      warnings: true,
    },
    stats: {
      // Config for minimal console.log mess.
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
    },
  },
});

exports.lintJavaScript = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include,
        exclude,
        enforce: 'pre',

        loader: 'eslint-loader',
        options,
      },
    ],
  },
});

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        include,
        exclude,

        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
});

exports.extractCSS = ({ include, exclude, use }) => {
  // Output extracted CSS to a file
  const plugin = new ExtractTextPlugin({
    filename: '[name].[contenthash:8].css',
  });

  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          include,
          exclude,

          use: plugin.extract({
            use,
            fallback: 'style-loader',
          }),
        },
      ],
    },
    plugins: [ plugin ],
  };
};

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
      require('autoprefixer')(),
    ]),
  },
});

exports.purifyCSS = ({ paths }) => ({
  plugins: [
    new PurifyCSSPlugin({ paths }),
  ],
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/,
        include,
        exclude,

        use: {
          loader: 'url-loader',
          options,
        },
      },
    ],
  },
});

exports.loadVideos = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(webm|mp4)$/,
        include,
        exclude,

        use: {
          loader: 'file-loader',
          options,
        },
      },
    ],
  },
});

exports.loadFonts = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        // Capture eot, ttf, woff, and woff2
        test: /\.(eot|ttf|woff|woff2|otf)(\?v=\d+\.\d+\.\d+)?$/,
        include,
        exclude,

        use: {
          loader: 'file-loader',
          options,
        },
      },
    ],
  },
});

exports.HotModuleReplacement = () => ({
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});

exports.NamedModulesPlugin = () => ({
  plugins: [
    new webpack.NamedModulesPlugin(),
  ],
});

exports.webpackPromise = () => ({
  plugins: [
    new webpack.ProvidePlugin({
      Promise: 'bluebird',
      'window.Promise': 'bluebird',
      'global.Promise': 'bluebird',
    }),
  ],
});


exports.clean = (path) => ({
  plugins: [
    new CleanWebpackPlugin([path], {
      root: process.cwd(),
      verbose: true,
      dry: false,
    }),
  ],
});

exports.uglifyJavaScript = () => ({
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
  ],
});

exports.minifyCSS = ({ options }) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: false,
    }),
  ],
});

exports.preloadWebpack = () => ({
  plugins: [
    new PreloadWebpackPlugin({
      rel: 'preload',
      as: 'script',
      include: 'all',
    }),
  ],
});



exports.loadJavaScript = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include,
        exclude,

        loader: 'babel-loader',
        options: {
          // Enable caching for improved performance during
          // development.
          // It uses default OS directory by default. If you need
          // something more custom, pass a path to it.
          // I.e., { cacheDirectory: '<path>' }
          cacheDirectory: true,
        },
      },
    ],
  },
});



exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});

exports.extractBundles = (bundles) => ({
  plugins: bundles.map((bundle) => (
    new webpack.optimize.CommonsChunkPlugin(bundle)
  )),
});


exports.setFreeVariable = (key, value) => {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env),
    ],
  };
};

exports.page = ({
  path = '',
  template = require.resolve(
    './index.html'
  ),
  title,
  entry,
  chunks,
  favicon,
} = {}) => ({
  entry,
  plugins: [
    new HtmlWebpackPlugin({
      chunks,
      filename: `${path && path + '/'}index.html`,
      template,
      title,
      favicon,
    }),
  ],
});