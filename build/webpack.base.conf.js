var path = require('path')
var utils = require('./utils')
// var config = require('../config')
// var webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader');
// var appConfig = require('../config/app-config')
// var getThemeColors = require('../config/getThemeColors')
// const ThemeColorReplacer = require('webpack-theme-color-replacer')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },
    externals: {
        // 'vue': 'Vue',
        // 'element-ui': 'ELEMENT',
        'axios': 'axios',
    },
    module: {
        rules: [
            /* {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },*/
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {}
            },
            {
                test: /\.js$/,
                include: [resolve('src')],
                exclude: file => (
                    /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
                ),
                use: [
                    // step-2
                    'babel-loader?cacheDirectory',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('font/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
}
