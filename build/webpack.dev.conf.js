var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// const webpackIconfontPluginNodejs = require('./svg2font.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

process.title = 'portal-components';

var pagesPath = path.resolve(__dirname, '../src')
var entry = {
    index: ['./build/dev-client', pagesPath + '/dev/dev.js']
}
module.exports = merge(baseWebpackConfig, {
    entry,
    mode: 'development',
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: config.dev.assetsPublicPath
    },
    module: {
        rules: [
            ...utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, extract: false }),
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
    devtool: false, // see SourceMapDevToolPlugin
    plugins: [
        // https://webpack.js.org/plugins/source-map-dev-tool-plugin/
        new webpack.SourceMapDevToolPlugin(),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new FriendlyErrorsPlugin(),
        // webpackIconfontPluginNodejs,

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
            chunks: ['index'],
            inject: true,
            // minify: {
            //     removeComments: true,
            //     collapseWhitespace: true,
            //     removeAttributeQuotes: false
            //     // more options:
            //     // https://github.com/kangax/html-minifier#options-quick-reference
            // },
        })
    ],
    optimization: {
        runtimeChunk: false,
        minimize: false,
        noEmitOnErrors: true,
        splitChunks: false
    },
})
