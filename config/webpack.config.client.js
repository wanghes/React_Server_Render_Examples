const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.config.base");

const isProd = process.env.NODE_ENV === "production";

const webpackConfig = merge(baseWebpackConfig, {
    mode: isProd ? 'production' : 'development',
    entry: {
        app: "./src/entry-client.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
            filename: "index.html"
        })
    ],
    watchOptions: {
        // 不监听这些文件
        ignored: /node_modules/
    }
});

module.exports = webpackConfig;
