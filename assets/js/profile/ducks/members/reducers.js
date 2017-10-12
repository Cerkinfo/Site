import { combineReducers } from 'redux';
import types from './types';
import { createReducer } from '../utils';

function selfReducer (state = {}, action) {
  console.log(action, state);
  switch (action.type) {
    case 'members/FETCH_SELF_COMPLETED':
      return Object.assign({}, state, action.payload);
    default:
      return state
  }
}
//const selfReducer = createReducer({}, () => ({
//  [types.FETCH_SELF_COMPLETED]: (state, action) => {
//    return action.payload;
//  },
//}));

const membersReducer = createReducer({}, () => ({
  [types.FETCH_LIST_COMPLETED]: (state, action) => {
  },
  [types.FETCH_DETAIL_COMPLETED]: (state, action) => {
  },
}));

export default combineReducers({
  self: selfReducer,
  members: membersReducer,
});
