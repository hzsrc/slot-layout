// var path = require('path')
var utils = require('./utils')
var path = require('path')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
// var CopyWebpackPlugin = require('copy-webpack-plugin')
// var OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')

var isProd = /prod|demo/.test(process.env.ENV_CONFIG)

function getSourceMapPath() {
    // 根据安全级别，改成只有开发者知道的文件夹名或动态加密算法生成。
    // 这样既可在需要时进行手动添加源码映射方便调试，又可避免了源码泄露。
    return 'js_map'
}

var pagesPath = path.resolve(__dirname, '../src')

var entry = {
    index: pagesPath + '/slotLayout.vue',
    hzLayoutNode: pagesPath + '/hzLayoutNode.vue',
    slotLayoutDesign: pagesPath + '/design/layoutDesigner.vue',
}
var webpackConfig = merge(baseWebpackConfig, {
    entry,
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: config.build.assetsPublicPath,
        library: '[name]',
        libraryTarget: 'umd'
    },
    mode: 'production',
    module: {
        rules: utils.styleLoaders({
            sourceMap: false,
            extract: false
        })
    },
    devtool: false, // see SourceMapDevToolPlugin,
    plugins: [
    ],
    optimization: {
        runtimeChunk: false,
        minimize: !process.env.npm_config_debug,
        noEmitOnErrors: true,
        splitChunks: false
    },
})

if (config.build.bundleAnalyzerReport) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
