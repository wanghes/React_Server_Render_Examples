import React from "react";
import { Helmet } from "react-helmet";
import { hot } from 'react-hot-loader'
import "./assets/app.scss";

class Root extends React.Component {
    constructor(props) {
        super(props);
        console.log('-------------------'+process.env.REACT_ENV+'-----------------------');
        if (process.env.REACT_ENV === "server") {
            // 当前如果是服务端渲染时将Helmet设置给外层组件的head属性中
            this.props.setHead(Helmet);
        }
    }
    oncls() {
        console.log('22');
    }
    render() {
        console.log('render');
        return (
            <div>
                <Helmet>
                    <title>全球升温是1.5℃还是2.0℃？中国遭遇的干旱损失将是天壤之别</title>
                    <meta charSet="utf-8" />
                    <meta name="keywords" content="全球,气候,京都,巴黎,损失,哥本哈根,气候变化,变暖,苏布达,国家"></meta>
                    <meta name="description" content="我们已经目睹了很多载入史册的灾难性天气。这都和全球性的气候变暖脱不了干系"></meta>
                    { /* <link href="http://asd.com/s.css" rel="stylesheet"></link> */ }
                </Helmet>
                <div className="title" onClick={this.oncls}>This is a react ssr demo</div>
                <ul className="nav">
                    <li>Bar</li>
                    <li>Baz</li>
                    <li>Foo</li>
                    <li>TopList</li>
                    <li>types</li>
                    <li>TEST</li>
                </ul>
            </div>
        );
    }
};


export default hot(module)(Root)
