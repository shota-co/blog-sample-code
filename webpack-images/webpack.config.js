const path = require('path');
// NOTE 画像をコピーするために利用する
const CopyWebpackPlugin = require('copy-webpack-plugin');
// NOTE 圧縮するために利用するプラグイン
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const ImageminPngquant = require('imagemin-pngquant');
const ImageminGifsicle = require('imagemin-gifsicle');
const ImageminSvgo = require('imagemin-svgo');

module.exports = {
  mode: "development",
  entry: './src/index.js',
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpg|eot|wof|woff|woff2|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: './src/assets',
      to: 'assets'
    }]),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      plugins: [
        ImageminMozjpeg({ quality: 80 }),
        ImageminPngquant({ quality: '65-80' }),
        ImageminGifsicle(),
        ImageminSvgo()
      ]
    })
  ],
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "build")
    ],
    extensions: [".js"],
  },
};
