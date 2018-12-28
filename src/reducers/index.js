import { combineReducers } from 'redux';
import counterReducer from './counter';
import userReducer from './users';
import postReducer from './post';
import { connectRouter } from 'connected-react-router';

export default (history) => {
    console.log('-----------')
    console.log(history)
    console.log('-----------')
    return combineReducers({
        router: connectRouter(history),
        post: postReducer,
        users: userReducer,
        counter: counterReducer
    });
}
