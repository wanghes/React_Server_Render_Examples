import React from "react";
import { StaticRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Root from "./App";

// module.exports = <App setHead={(head) => App.head = head} />;

const createApp = (context, url) => {
    //init store
    let loginStore = {
        user: {
            logined: true
        }
    };
    const store = configureStore(loginStore);

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
