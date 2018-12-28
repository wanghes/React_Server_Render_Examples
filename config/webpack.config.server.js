const webpack = require('webpack');
const path = require('path');
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseWebpackConfig = require("./webpack.config.base");

const isProd = process.env.NODE_ENV === "production";

const webpackConfig = merge(baseWebpackConfig, {
    mode: isProd ? 'production' : 'development',
    entry: {
        app: "./src/entry-server.js"
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "entry-server.js",
        libraryTarget: "commonjs2"  // 打包成commonjs2规范
    },
    target: "node",  // 指定node运行环境
    plugins: [
        new webpack.DefinePlugin({
            "process.env.BASE_URL": JSON.stringify("http://sequelize.mntools.xyz"),
            "process.env.REACT_ENV": JSON.stringify("server")  // 指定React环境为服务端
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash].css',
        })
    ]
});

module.exports = webpackConfig;
