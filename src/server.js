import express from "express";
import fs from "fs";
import path from "path";
import { renderToString, renderToNodeStream } from "react-dom/server";
import configureStore from './store/configureStore';
import Helmet from "react-helmet";
const app = express();

let serverEntry = require("../dist/entry-server");
let template = fs.readFileSync("./dist/index.html", "utf-8");
// 静态资源映射到dist路径下
app.use("/dist", express.static(path.join(__dirname, "../dist")));

app.use("/public", express.static(path.join(__dirname, "../public")));

const createApp = serverEntry.createApp;

/* eslint-disable no-console */
const render = (req, res) => {
    console.log("======enter server======");
    console.log("visit url: " + req.url);

    // 存放组件内部路由相关属性，包括状态码，地址信息，重定向的url
    let context = {};
    let App = createApp(context, req.url);


    let html = renderToString(App);

    //init store
    let loginStore = {
        counter: {
            count: 12
        }
    };
    const store = configureStore(loginStore);

    if (context.url) {  // 当发生重定向时，静态路由会设置url
        res.redirect(context.url);
        return;
    }
    console.log(JSON.stringify(store.getState()));

    if (!context.status) {
        let head = App.type.head.renderStatic();

        let htmlStr = template
        .replace(/<title>.*<\/title>/, `${head.title.toString()}`)
        .replace("<!--react-ssr-head-->", `${head.meta.toString()}\n${head.link.toString()}`)
        .replace("<!--react-redux-data-->", `window.__REDUX_DATA__ = ${JSON.stringify(store.getState())}`)
        .replace("<!--react-ssr-outlet-->", html);
        // 将渲染后的html字符串发送给客户端
        res.send(htmlStr);
    } else {
        res.status(context.status).send("error code：" + context.status);
    }

}

app.get("*", render);


app.listen(3001, () => {
    console.log("Your app is running at port 3001");
});
