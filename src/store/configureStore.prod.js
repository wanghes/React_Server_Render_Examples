import { createStore } from 'redux';
import createRootReducer from '../reducers';
import midddleWareHandle from './middlewares';


export default function configureStore (initialState, history) {
    const middlewares = midddleWareHandle(history);
    return createStore(createRootReducer(history), initialState, middlewares);
}
