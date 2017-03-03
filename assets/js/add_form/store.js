import { createStore, applyMiddleware } from 'redux';
import { combineForms } from 'react-redux-form';
import thunk from 'redux-thunk';

const store = createStore(combineForms({
    transaction: {
      price: 0,
      user: null,
      quantity: 1,
      comment: "Versement sur l'ardoise",
    },
  }),
  applyMiddleware(thunk),
);

export default store;
