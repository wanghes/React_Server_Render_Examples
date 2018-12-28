import React from "react";
import { Helmet } from "react-helmet";
import { hot } from 'react-hot-loader';
import { renderRoutes } from 'react-router-config';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    NavLink
} from "react-router-dom";
import { StatusRoute, router } from "./router";

import Bar from "./views/Bar";
import Baz from "./views/Baz";
import Foo from "./views/Foo";
import TopList from "./views/TopList";

import "./assets/app.scss";

class Root extends React.Component {
    constructor(props) {
        super(props);
        console.log('-------------------' + process.env.REACT_ENV + '-----------------------');
        if (process.env.REACT_ENV === "server") {
            // 当前如果是服务端渲染时将Helmet设置给外层组件的head属性中
            this.props.setHead(Helmet);
        }
    }
    render() {
        return (
            <div>
                <Helmet>
                    <title>全球升温是1.5℃还是2.0℃？中国遭遇的干旱损失将是天壤之别</title>
                    <meta charSet="utf-8" />
                    <meta name="keywords" content="全球,气候,京都,巴黎,损失,哥本哈根,气候变化,变暖,苏布达,国家"></meta>
                    <meta name="description" content="我们已经目睹了很多载入史册的灾难性天气。这都和全球性的气候变暖脱不了干系"></meta>
                    { /* <link href="http://asd.com/s.css" rel="stylesheet"></link> */ }
                </Helmet>
                <div className="title">服务端渲染DEMO</div>
                <ul className="nav">
                    <li><NavLink activeClassName="selected" to="/bar">Bar</NavLink></li>
                    <li><NavLink activeClassName="selected" to="/baz">Baz</NavLink></li>
                    <li><NavLink activeClassName="selected" to="/foo">Foo</NavLink></li>
                    <li><NavLink activeClassName="selected" to="/top-list">TopList</NavLink></li>
                </ul>
                <div className="view">
                    <Switch>
                        { renderRoutes(router) }

                        {/*
                            <Route path="/bar" component={Bar} />
                            <Route path="/baz" component={Baz} />
                            <Route path="/foo" component={Foo} />
                            <Route path="/top-list" component={TopList} />
                        */}
                        <Redirect from="/" to="/bar" exact />
                        <StatusRoute code={404}>
                            <div>
                                <h1>Not Found</h1>
                            </div>
                        </StatusRoute>
                    </Switch>
                </div>
            </div>
        );
    }
};


// let App;
// if (process.env.REACT_ENV === "server") {
//     // 服务端导出Root组件
//     App = Root;
// } else {
//     App = () => {
//         return (
//             //<Router>
//                 <Root />
//             //</Router>
//         );
//     };
// }

export default hot(module)(Root)
