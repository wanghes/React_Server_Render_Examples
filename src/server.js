import express from "express";
import fs from "fs";
import path from "path";
import { matchRoutes, renderRoutes } from 'react-router-config';
import Helmet from "react-helmet";
import { matchPath } from 'react-router-dom';
import { renderToString, renderToNodeStream } from "react-dom/server";
import createMemoryHistory from 'history/createMemoryHistory';
import routes from '../src/router';
import configureStore from './store/configureStore';

process.env.BASE_URL = "http://sequelize.mousecloud.cn"
const app = express();

let serverEntry = require("../dist/entry-server");
let template = fs.readFileSync("./dist/index.html", "utf-8");

// 静态资源映射到dist路径下
app.use("/dist", express.static(path.join(__dirname, "../dist")));
// 静态图标映射到public 路径下
app.use("/public", express.static(path.join(__dirname, "../public")));

const createApp = serverEntry.createApp;


/**
 * 匹配当前请求url是否跟客户端路由一致 不一致则执行next 进行静态资源处理等
 * @param {*} routesArray
 * @param {*} url
 */
const getMatch=(routesArray, url)=>{
    return routesArray.some(router => matchPath(url, {
        path: router.path,
        exact: router.exact
    }));
};
//console.log(process.env.BASE_URL);

const render = async (req, res) => {
    // console.log("visit url: " + req.url);
    try{
        const history = createMemoryHistory({ initialEntries: [req.url] });
        const store = configureStore({}, history);
        const loadBranchData = (url) => {
            const branch = matchRoutes(routes, url)
            const promises = branch.map(({ route, match }) => {
                return route.component.fetch
                  ? route.component.fetch(store)
                  : Promise.resolve(null);
            });

            return Promise.all(promises);
        }

        await loadBranchData(req.url);

        let isMatch = getMatch(routes, req.url);
        // 存放组件内部路由相关属性，包括状态码，地址信息，重定向的url
        let context = {};

        let App = createApp(context, req.url, store);

        let html = renderToString(App);

        if (context.url) {  // 当发生重定向时，静态路由会设置url
            res.redirect(context.url);
            return;
        }

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
    }catch(e){
        console.log(e)
    }
}

app.get("*", render);


app.listen(3001, () => {
    console.log("Your app is running at port 3001");
});
