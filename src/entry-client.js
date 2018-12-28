import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import store from './store';
import App from "./App";

const history = createBrowserHistory();
const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;


const render = Component => {
    renderMethod(
        <Provider store={store(history)}>
            <ConnectedRouter history={history}>
                <Component />
            </ConnectedRouter>
        </Provider>,
        document.getElementById('app')
    );
}

render(App);
