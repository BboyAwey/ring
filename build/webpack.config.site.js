
const path = require('path')
const resolve = p => path.resolve(__dirname, p)
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'
const distPath = resolve('../site')

const config = {
  entry: resolve('../src/site/index.js'),
  output: {
    filename: isProduction ? '[name].[hash].js' : '[name].js',
    path: distPath
  },
  devServer: {
    contentBase: distPath,
    hot: true
  },
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'source-map' : 'none',
  stats: {
    chunks: false,
    modules: false,
    children: false
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              'syntax-jsx',
              ['transform-react-jsx', { pragma: 'Snabbdom.createElement' }]
            ]
          }
        }
      },
      {
        test: /\.(css)|(less)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + '/'
              },
              esModule: true,
              hmr: isDevelopment,
              reloadAll: true
            }
          },
          // {
          //   loader: 'style-loader'
          // },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                strictMath: true
              }
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {}
      }
    ]
  },
  plugins: [
    isProduction && new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new MiniCssExtractPlugin({
      filename: isProduction ? '[name].[contenthash].css' : '[name].css',
      chunkFilename: isProduction ? '[id].[contenthash].css' : '[id].css'
    }),
    new HtmlWebpackPlugin({
      template: resolve('../src/site/assets/index.html')
    })
  ].filter(p => !!p)
}

module.exports = config
