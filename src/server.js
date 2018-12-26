import express from "express";
import fs from "fs";
import path from "path";
import { renderToString, renderToNodeStream } from "react-dom/server";
import Helmet from "react-helmet";
const app = express();

let App = require("../dist/entry-server");
let template = fs.readFileSync("./dist/index.html", "utf-8");
// 静态资源映射到dist路径下
app.use("/dist", express.static(path.join(__dirname, "../dist")));

app.use("/public", express.static(path.join(__dirname, "../public")));

/* eslint-disable no-console */
const render = (req, res) => {
    console.log("======enter server======");
    console.log("visit url: " + req.url);

    let html = renderToString(App);
    let head = App.type.head.renderStatic();

    let htmlStr = template
    .replace(/<title>.*<\/title>/, `${head.title.toString()}`)
    .replace("<!--react-ssr-head-->", `${head.meta.toString()}\n${head.link.toString()}`)
    .replace("<!--react-ssr-outlet-->", html);
    // 将渲染后的html字符串发送给客户端
    res.send(htmlStr);
}

app.get("*", render);


app.listen(3001, () => {
    console.log("Your app is running at port 3001");
});
