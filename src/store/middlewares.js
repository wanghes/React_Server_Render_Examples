import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import logger from 'redux-logger';

const midddleWareHandle = (history) => {
    let middleWare;
    if (process.env.NODE_ENV === 'production') {
        console.log('production');
        middleWare = applyMiddleware(
            routerMiddleware(history), // for dispatching history actions
            thunk
        );
    } else {
        middleWare = applyMiddleware(
            routerMiddleware(history), // for dispatching history actions
            thunk,
            logger
        );
    }
    return middleWare;
}

export default midddleWareHandle;
