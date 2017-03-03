import {
  createStore,
  applyMiddleware,
} from 'redux';
import { combineForms } from 'react-redux-form';


const store = createStore(combineForms({
  transaction: {
    user: null,
    price: 0,
    quantity: 1,
    comment: '',
  },
}));

export default store;
