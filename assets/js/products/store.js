import { createStore } from 'redux';
import { combineForms } from 'react-redux-form';

const store = createStore(combineForms({
  product: {
    name: '',
    price: 0,
  },
}));

export default store;
