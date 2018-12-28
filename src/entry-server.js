import React from "react";
import { StaticRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import Root from "./App";

const createApp = (context, url, store) => {
    const App = () => {
        return (
            <Provider store={store}>
                <StaticRouter context={context} location={url}>
                    <Root setHead={(head) => App.head = head}/>
                </StaticRouter>
            </Provider>
        )
    }
    return <App />;
}

module.exports = {
    createApp
};
