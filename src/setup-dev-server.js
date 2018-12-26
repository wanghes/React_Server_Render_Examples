var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var webpackConfig = require('../config/webpack.config.client');


webpackConfig.entry.app = [
    'webpack/hot/only-dev-server',
    'webpack-dev-server/client?http://localhost:3001',
    'webpack-hot-middleware/client',
    webpackConfig.entry.app
];
webpackConfig.output.filename = "static/js/[name].[hash].js";

var compiler = webpack(webpackConfig);

var server = new WebpackDevServer(compiler, {
    hot: true,
    historyApiFallback: true,
    // It suppress error shown in console, so it has to be set to false.
    quiet: false,
    // It suppress everything s error, so it has to be set to false as well
    // to see success build.
    noInfo: false,
    stats: {
        // Config for minimal console.log mess.
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
    },
    proxy: {
        "/api": {
            target: "http://0.0.0.0:8050/api",
            // 因为使用的是https，会有安全校验，所以设置secure为false
            changeOrigin: true,
            secure: false,
            pathRewrite: {'^/api' : ''}
            // ingorePath 默认即为 false, 注释掉也可以
            // ingorePath: false,
            // changeOrigin是关键，如果不加这个就无法跳转请求
        }
    }
});

// 请用热模块替换服务
server.use(require("webpack-hot-middleware")(compiler));

server.listen(3001, '0.0.0.0', function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Your app is running at port 3001");
});
