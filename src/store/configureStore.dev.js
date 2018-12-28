import { createStore, compose, applyMiddleware } from 'redux';
import createRootReducer from '../reducers/index';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import middleWaresHandle from './middlewares';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default function configureStore(initialState, history) {
    let middlewares = middleWaresHandle(history);
    const enhancer = composeEnhancers(middlewares);
    const store = createStore(
        createRootReducer(history),
        initialState,
        enhancer
    );

    return store;
}
