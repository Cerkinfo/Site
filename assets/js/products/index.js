import React from 'react';
import ReactDOM from 'react-dom';
import Products from './products.jsx';

window.onload = () => {
  ReactDOM.render(<Products/>, 
    document.getElementById('react-products-list')
  );
};
