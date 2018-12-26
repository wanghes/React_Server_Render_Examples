import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import store from './store';
import App from "./App";

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

const render = Component => {
    renderMethod(
        <Provider store={store}>
            <Component />
        </Provider>,
        document.getElementById('app')
    );
}

render(App);
