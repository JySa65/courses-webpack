const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const autoprefixer = require('autoprefixer')
const { VueLoaderPlugin } = require('vue-loader')

const MODE = process.env.MODE || 'development'

module.exports = {
  mode: MODE,
  entry: {
    js: './src/index.js',
    vanilla: './src/hello_vanilla.js',
    react: './src/hello_react.js',
    vue: './src/hello_vue.js',
    ts: './src/hello_ts.js'
  },
  output: {
    filename: '[name].[chunkhash].js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MODE != 'production' ? 'style-loader' : MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: MODE != 'production',
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              autoprefixer: {
                browser: ['last 2 versions']
              },
              sourceMap: MODE != 'production',
              plugins: () => [autoprefixer]
            }
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: MODE != 'production',
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        use: [
          'file-loader?name=assets/[name].[ext]',
          'image-webpack-loader?bypassOnDebug'
        ]
      },
      {
        test: /\.(ttf|eot|woff2?|mp4|mp3|txt|xml|pdf)$/i,
        use: 'file-loader?name=assets/[name].[ext]'
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: {
          loader: 'vue-loader'
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist/**/*.*']),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[id].css'
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'index.html',
      chunks: ['js']
    }),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'hello-vanilla.html',
      chunks: ['vanilla']
    }),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'hello-react.html',
      chunks: ['react']
    }),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'hello-vue.html',
      chunks: ['vue']
    }),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'hello-ts.html',
      chunks: ['ts']
    })
  ]
}
