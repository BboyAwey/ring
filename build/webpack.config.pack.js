const path = require('path')
const resolve = p => path.resolve(__dirname, p)
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: resolve('../src/site/index.js'),
  output: {
    filename: 'index.js',
    path: resolve('../site')
  },
  devServer: {
    contentBase: resolve('../site'),
    hot: true
  },
  mode: 'development',
  devtool: 'source-map',
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
        loader: 'eslint-loader',
        options: {
        }
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
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      template: resolve('../src/site/assets/index.html')
    })
  ]
}
