const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
// 如果预先定义过环境变量，就将其赋值给`ASSET_PATH`变量，否则赋值为根目录
const ASSET_PATH = process.env.ASSET_PATH || '/';

let app = 'src';

let context = path.resolve(__dirname, app);
let entry = {
  vendor: [
    'jquery',
    'vue',
  ],
  part: [
    path.resolve(__dirname, `${app}/js/createli.js`),
    path.resolve(__dirname, `${app}/js/cloneli.js`),
    path.resolve(__dirname, `${app}/js/vue.js`),
  ]
};
let output = {
  path: path.resolve(__dirname, 'dist'),
  filename: `js/[name].js?hash=[hash]`,
  chunkFilename: `js/[chunkhash].js`,
  sourceMapFilename: `sourcemaps/[file].map?hash=[hash]`,
  publicPath: ``,
  libraryTarget: 'var',
};
let modules = {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      }
    ]
  };
let devtool = 'source-map';
let plugins = [
  //该插件帮助我们安心地使用环境变量
  new webpack.DefinePlugin({
    'process.env': {
      ASSET_PATH: JSON.stringify(ASSET_PATH),
      NODE_ENV: '"production"'
    }
  }),
  // 清空dist文件夹
  new CleanWebpackPlugin(['dist']),
  new ManifestPlugin({
    fileName: 'manifest.json',
    basePath: './'
  }),
  // 生成css
  new ExtractTextPlugin({
    filename: 'css/[name].css?hash=[chunkhash]',
  }),
  new WebpackChunkHash({algorithm: 'md5'}),
  // 生成公共文件，包含第三方依赖和重复
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest'],
    minChunks: 2,
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      // 控制台不输出
      drop_console: false,
    },
    sourceMap: true,
    except: ['$', 'Vue'],
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  }),
  new webpack.HotModuleReplacementPlugin(), // 启用 HMR
  new HtmlWebpackPlugin({
    template: `demo1.html`
  }),
];

let resolve = {
  alias: {
    'jquery': 'jquery/src/jquery',
    'vue': 'vue/dist/vue.js'
  }
};

let devServer = {
  hot: true, // 告诉 dev-server 我们在使用 HMR
  contentBase: path.resolve(__dirname, 'dist'),
  publicPath: '/'
};

let stats = 'normal';

module.exports = (env) => {
  return {
    context: context,
    entry: entry,
    output: output,
    module: modules,
    devtool: devtool,
    plugins: plugins,
    resolve: resolve,
    // devServer: devServer,
    // 启用缓存
    cache: true,
    // 启用观察
    watch: false,
    stats: stats
  };
};
