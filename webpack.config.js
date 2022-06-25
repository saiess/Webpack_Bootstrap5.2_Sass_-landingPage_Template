const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');


let mode = "development";
let devtool= "source-map";
if (process.env.NODE_ENV === "production") {
  mode = "production";
  devtool = false;
}

module.exports = {
  mode: mode,
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  entry: {
    bundle: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name] [contenthash].js',
    clean: true,
    assetModuleFilename: 'images/[hash][ext][query]',
    chunkFilename: '[chunks].js',
  },
  devtool: devtool,
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 30 * 1024,
          },
        },
      },
      {
        test: /\.(svg|png|jpg?g|gif|webp)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 30 * 1024,
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      images: path.resolve(__dirname, 'src/assets/images'),
      icons: path.resolve(__dirname, 'src/assets/icons'),
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/, ///< put all used node_modules modules in this chunk
          name: 'vendor', ///< name of bundle
          chunks: 'all', ///< type of code to put in this bundle
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Ehya',
      filename: 'index.html',
      template: 'src/template.html',
    }),
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.(js|css|scss|html|webp|otf|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new BundleAnalyzerPlugin(),
    new LodashModuleReplacementPlugin(),
  ],
};
