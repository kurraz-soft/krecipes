import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './reducers'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/*const middleware = store => next => action => {
    console.log('dispatching', action);
    return next(action);
};*/

const store = createStore(reducers(),composeEnhancers(applyMiddleware(promise(), thunk, createLogger())));

export default store;