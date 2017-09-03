import { combineReducers } from 'redux';
import types from './types';
import { createReducer } from '../utils';

const selfReducer = createReducer({}, () => ({
  [types.FETCH_ME_COMPLETED]: (state, action) => {
    console.log(state);
    console.log(action);
    return action.payload;
  },
}));

const membersReducer = createReducer({}, () => ({
  [types.FETCH_LIST_COMPLETED]: (state, action) => {
    console.log(state);
    console.log(action);
  },
  [types.FETCH_DETAIL_COMPLETED]: (state, action) => {
    console.log(state);
    console.log(action);
  },
}));

export default combineReducers({
  self: selfReducers,
  members: membersReducers,
});
