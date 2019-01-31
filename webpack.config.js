const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const autoprefixer = require('autoprefixer')
const { VueLoaderPlugin } = require('vue-loader')

const MODE = process.env.MODE || 'development'

const cleanWebpackPlugin = new CleanWebpackPlugin(['dist/**/*.*'])
const extractCssPlugin = new MiniCssExtractPlugin({
    filename: '[name].[chunkhash].css',
    chunkFilename: '[id].css'
  })
const vueLoaderPlugin = new VueLoaderPlugin()
const htmlPluginJs = new HtmlWebpackPlugin({
    template: './src/template.html',
    filename: 'index.html',
    chunks: ['js']
  })
const htmlPluginVanilla = new HtmlWebpackPlugin({
    template: './src/template.html',
    filename: 'hello-vanilla.html',
    chunks: ['vanilla']
  })
const htmlPluginReact = new HtmlWebpackPlugin({
    template: './src/template.html',
    filename: 'hello-react.html',
    chunks: ['react']
  })
const htmlPluginVue = new HtmlWebpackPlugin({
    template: './src/template.html',
    filename: 'hello-vue.html',
    chunks: ['vue']
  })
const htmlPluginTs = new HtmlWebpackPlugin({
    template: './src/template.html',
    filename: 'hello-ts.html',
    chunks: ['ts']
  })

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
            loader: MODE == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          'css-loader?minimize&sourceMap',
          {
            loader: 'postcss-loader',
            options: {
              autoprefixer: {
                browser: ['last 2 versions']
              },
              sourceMap: true,
              plugins: () => [autoprefixer]
            }
          },
          'resolve-url-loader',
          'sass-loader?outputStyle=compressed&sourceMap'
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
    cleanWebpackPlugin,
    extractCssPlugin,
    vueLoaderPlugin,
    htmlPluginJs,
    htmlPluginVanilla,
    htmlPluginReact,
    htmlPluginVue,
    htmlPluginTs
  ]
}
