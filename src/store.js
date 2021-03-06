import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './Reducers/index';

let logger = createLogger({
	collapsed: true
});

let store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
