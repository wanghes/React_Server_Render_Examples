import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

const render = Component => {
    renderMethod(
        <Component />,
        document.getElementById('app')
    );
}
render(App);
