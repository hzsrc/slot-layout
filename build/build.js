// 生成主题颜色变量，供生成过程中使用
// var rm = require('rimraf')
var fs = require('fs')
var config = require('../config')

process.env.NODE_ENV = 'production'

config.isBuild = true; // 需要生成（dist）目标文件。需放在require('webpack')之前

var ora = require('ora')
var chalk = require('chalk')
var webpack = require('webpack')
var webpackConfig = require('./webpack.build.conf')
var spinner = ora('building for ' + process.env.NODE_ENV + '...')
spinner.start()

// rm(webpackConfig.output.path, e => !e && doWebpack())
doWebpack()

function doWebpack(onEnd) {
    webpack(webpackConfig, function(err, stats) {
        spinner.stop()
        if (onEnd) onEnd(err);

        if (err) {
            throw err
        }
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')
    })
}
