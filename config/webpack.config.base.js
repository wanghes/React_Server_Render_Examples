const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === "production";

const baseWebpackConfig = {
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "static/js/[name].[chunkhash].js",
        publicPath: "/dist/"  // 打包后输出路径以/dist/开头
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },
    devtool: isProd ? "#source-map" : "#cheap-module-eval-source-map",
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: false }
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=8192&name=img/[name].[ext]'
            }
        ]
    },
    plugins: []
};

if (isProd) {
    baseWebpackConfig.module.rules.push({
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader'
            },
            {
                loader: "sass-loader"
            }
        ]
    });
    baseWebpackConfig.plugins.push(
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash].css',
        })
    );
} else {
    baseWebpackConfig.module.rules.push({
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
            {
                loader: "style-loader"
            },
            {
                loader: 'css-loader'
            },
            {
                loader: "sass-loader"
            }
        ]
    });

    baseWebpackConfig.output = {
        path: path.resolve(__dirname, '../dist'),
        publicPath: "/",
        filename: "static/js/[name].[chunkhash].js"
    };
    baseWebpackConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
}

module.exports = baseWebpackConfig;
