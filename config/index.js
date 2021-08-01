// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

var ret = {
    build: {
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: '',
        assetsPublicPath: '',
        productionSourceMap: false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report,
        // dist目录是否直接做为服务目录。如果是，发布过程不能中断线上服务，需要调用changeDirBuild
        distIsForServer: false,
    },
    dev: {
        port: 8222,
        autoOpenBrowser: true,
        assetsSubDirectory: '',
        assetsPublicPath: '/',
        // proxyTable: {
        //     '/api': {
        //         target: 'http://localhost:3000',
        //         changeOrigin: true,
        //         pathRewrite: {'^/api': ''}
        //     }
        // },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: true
    }
}

module.exports = ret;
