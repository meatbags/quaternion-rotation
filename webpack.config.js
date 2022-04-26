
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserJs = require("terser-webpack-plugin");

// path
const appName = 'APP';
const pathJS = './js/app.js';
const pathSCSS = './scss/style.js';
const pathJSOutput = 'build/lib';
const pathCSSOutput = 'build/lib';

module.exports = [{
    entry: {'app.min': pathJS},
    output: {
      library: appName,
      libraryTarget: 'var',
      path: path.resolve(__dirname, pathJSOutput),
      filename: '[name].js'
    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {targets: { chrome: 53, ie: 11 }}
              ]
            ]
          }
        }
      }]
    },
    optimization: {
      minimizer: [
        new TerserJs({
          test: /\.js(\?.*)?$/i,
          terserOptions: {
            mangle: true,
          },
        }),
      ],
    },
    stats: {colors: true, warnings: false}
  }, {
    entry: {'style.min': pathSCSS},
    output: {
      path: path.resolve(__dirname, pathCSSOutput),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /.s?css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
      ],
    },
    optimization: {
      minimizer: [
        new CssMinimizerPlugin(),
      ],
      minimize: true,
    },
    plugins: [new MiniCssExtractPlugin()],
}];
