import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './reducers'
import { createLogger } from 'redux-logger'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/*const middleware = store => next => action => {
    console.log('dispatching', action);
    return next(action);
};*/

const localState = localStorage.reduxState ? JSON.parse(localStorage.reduxState) : {};

const store = createStore(reducers(), localState, composeEnhancers(applyMiddleware(createLogger())));

store.subscribe(() => {
    localStorage.reduxState = JSON.stringify(store.getState());
});

export default store;