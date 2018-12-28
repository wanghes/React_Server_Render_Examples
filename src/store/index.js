import configureStore from './configureStore';

const store = (history) => {
    return configureStore(window.__REDUX_DATA__, history);
};

export default store;
