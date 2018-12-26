import React from "react";
import { StaticRouter } from "react-router-dom";
import Root from "./App";

// module.exports = <App setHead={(head) => App.head = head} />;

const createApp = (context, url) => {
    const App = () => {
        return (
            <StaticRouter context={context} location={url}>
                <Root setHead={(head) => App.head = head}/>
            </StaticRouter>
        )
    }
    return <App />;
}

module.exports = {
    createApp
};
