import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import * as reducers from './ducks';

const root = combineReducers(reducers);

const loggerMiddleware = createLogger({
  collapsed: (getState, action, logEntry) => !logEntry.error,
});

export default createStore(root, applyMiddleware(thunk, loggerMiddleware));
